const { RHService } = require("../services");
const { jsonToSheet } = require("../util/jsonToSheet");

module.exports = {
  createEmployeeChecaApp: async (req, res) => {
    try {
      await RHService.createEmployeeChecaApp(req.body);
      return res.status(200).json({ message: "Employee created" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(400).json({ message: error });
    }
  },
  registerEmployeeChecaApp: async (req, res) => {
    try {
      const employee = await RHService.getEmployee(req.body.qrCode);
      if (!employee?._id) {
        return res.status(400).json({ message: "Employee not found" });
      }

      const payload = {
        employeeId: employee._id,
        ...req.body,
      };

      await RHService.registerEmployeeChecaApp(payload);
      return res
        .status(200)
        .json({ message: "Employee registered", data: employee.name });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  getLastRegisters: async (_req, res) => {
    try {
      const registers = await RHService.getLastRegisters();
      return res.status(200).json({ data: registers });
    } catch (error) {
      console.log("Error: ", error);
      res.status(400).json({ message: error });
    }
  },
  getAllEmployees: async (_req, res) => {
    try {
      const employees = await RHService.getAllEmployees();
      return res.status(200).json({ data: employees });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  addAllowedSite: async (req, res) => {
    try {
      await RHService.addAllowedSite(req.body);
      return res.status(200).json({ message: "Site added" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  reporter: async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const registers = await RHService.getRegistersByDateRange(startDate, endDate);
      const buff = jsonToSheet(registers);
      res.setHeader("Content-Type", "application/vnd.openxmlformats");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Report.xlsx",
      );
      return res.status(200).send(buff)
      //return res.status(200).json({ data: registers });
    } catch (error) {
      console.log("Error: ", error);
      res.status(400).json({ message: error });
    }
  },
};
