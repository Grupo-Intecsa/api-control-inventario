const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const PaqueteriaSchema = new Schema(
  {
    codigo: {
      type: String,
    },
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
    emailContacto: {
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
    numeroContacto_recibe: {
      type: String,
      required: true,
    },
    contacto_recibe: {
      type: String,
      required: true,
    },
    contacto_recibe_email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// pre save
PaqueteriaSchema.pre("save", function (next) {
  if (!this.codigo) {
    const shortid = uuidv4();
    const [cutCode] = shortid.split('-');
    this.codigo = cutCode;
  }
  next();
});

const Paqueteria = mongoose.model("Paqueteria", PaqueteriaSchema);
module.exports = {
  Paqueteria,
};
