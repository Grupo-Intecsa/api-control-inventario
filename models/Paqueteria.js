const mongoose = require("mongoose");
const { Schema } = mongoose;

//const schemaForm = z.object({
//  proyecto: z.string().min(3),
//  paqueteria: z.string().min(3),
//  direccion: z.string().min(3),
//  contacto: z.string().min(3),
//  numeroContacto: z.string().min(3),
//  empresaEnvio: z.string().min(3)
//})

const PaqueteriaSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    proyecto: {
      type: String,
      required: true,
    },
    paqueteria: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    contacto: {
      type: String,
      required: true,
    },
    numeroContacto: {
      type: String,
      required: true,
    },
    empresaEnvio: {
      type: String,
      required: true,
    },
    shipping_status: {
      type: String,
      default: "Solicitado",
    },
    shipping_date: {
      type: Date,
    },
    shipping_code: {
      type: String,
    },
    shipping_cost: {
      type: Number,
    },
    shipping_arrival_date: {
      type: Date,
    },
    lastUpdate: {
      type: String,
    },

  },
  { timestamps: true },
);

const Paqueteria = mongoose.model("Paqueteria", PaqueteriaSchema);
module.exports = {
  Paqueteria,
};
