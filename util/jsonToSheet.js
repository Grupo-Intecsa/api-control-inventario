const XLSX = require("xlsx");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone"); // Extender dayjs con los plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const jsonToSheet = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }

  const formattedData = data
    .map((day) =>
      day.registers.map((register) => ({
        Date: day.date,
        EmployeeName: register.employeeName,
        PrimerAcceso: dayjs(register.records.firstEntry.timestamp)
          .tz("America/Mexico_City")
          .format("YYYY-MM-DD HH:mm:ss"),
        UltimoAcceso: dayjs(register.records.lastEntry.timestamp)
          .tz("America/Mexico_City")
          .format("YYYY-MM-DD HH:mm:ss"),
      })),
    )
    .flat();
  // Crear un libro de trabajo y una hoja de cálculo
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formattedData);
  XLSX.utils.book_append_sheet(wb, ws, "Report");

  // Escribe el libro en un buffer
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  return buffer;
};

module.exports = {
  jsonToSheet,
};
