const {
  EmpleadosRH,
  RegistrosRH,
  DeptosRH,
  ChecaEmployees,
  AttendanceEmployee,
  ChecaSites,
} = require("../models/");

module.exports = {
  createEmpealdo: async (body) => {
    return EmpleadosRH(body).save();
  },
  createDepto: async (body) => {
    return DeptosRH(body).save();
  },
  getDeptos: async () => {
    return await DeptosRH.find();
  },
  getEmployees: async () => {
    return await EmpleadosRH.find();
  },
  postSalidaCheck: async (body) => {
    return RegistrosRH(body).save();
  },
  getActiveRegistros: async () => {
    return await RegistrosRH.find({ isActive: true });
  },
  patchRemoveRegistro: async (body, id) => {
    return await RegistrosRH.findByIdAndUpdate(id, body);
  },
  createEmployeeChecaApp: async (body) => {
    return ChecaEmployees(body).save();
  },
  registerEmployeeChecaApp: async (body) => {
    return AttendanceEmployee(body).save();
  },
  getEmployee: async (id) => {
    return await ChecaEmployees.findOne({ qrCode: id });
  },
  getLastRegisters: async () => {
    const agg = [
      {
        $lookup: {
          from: "employees",
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $unwind: "$employee",
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 100,
      },
      {
        $project: {
          _id: 1,
          employee: "$employee.name",
          location: 1,
          timestamp: 1,
        },
      },
    ];

    return await AttendanceEmployee.aggregate(agg);
  },
  getAllEmployees: async () => {
    return await ChecaEmployees.find();
  },
  addAllowedSite: async (body) => {
    return ChecaSites(body).save();
  },
  getRegistersByDateRange: async (startDate, endDate) => {
    const start = new Date(startDate + "T00:00:00"); // Inicio del día
    const end = new Date(endDate + "T23:59:59.999"); // Final del día
    const aggregation = [
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
        },
      },
      {
        $addFields: {
          dateOnly: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
        },
      },
      {
        $sort: { timestamp: 1 },
      },
      {
        $lookup: {
          from: "employees",
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $unwind: {
          path: "$employee",
          preserveNullAndEmptyArrays: true, // Esto asegura que documentos sin empleados coincidentes no se descarten
        },
      },
      {
        $group: {
          _id: {
            employeeId: "$employeeId",
            date: "$dateOnly",
          },
          firstEntry: { $first: "$$ROOT" },
          lastEntry: { $last: "$$ROOT" },
          employeeName: { $first: "$employee.name" }, // Mantener el nombre del empleado
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          employeeId: "$_id.employeeId",
          employeeName: 1, // Incluir el nombre en la proyección
          firstEntry: {
            timestamp: "$firstEntry.timestamp",
          },
          lastEntry: {
            timestamp: "$lastEntry.timestamp",
          },
        },
      },
      {
        $group: {
          _id: "$date",
          registers: {
            $push: {
              employeeId: "$employeeId",
              employeeName: "$employeeName",
              records: {
                firstEntry: "$firstEntry",
                lastEntry: "$lastEntry",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          registers: "$registers",
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ];
    return await AttendanceEmployee.aggregate(aggregation);
  },
};
