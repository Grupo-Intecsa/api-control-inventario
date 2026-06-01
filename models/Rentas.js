const mongoose = require('mongoose');
const { Schema } = mongoose

const CostBreakdownSchema = new Schema({
    casetas_amount:   { type: Number, default: 0 },
    casetas_unit:     { type: String, default: 'fijo' },
    casetas_notes:    { type: String, default: '' },
    operator_rate:    { type: Number, default: 0 },
    operator_unit:    { type: String, default: 'dia' },
    operator_days:    { type: Number, default: 0 },
    per_diem_rate:    { type: Number, default: 0 },
    per_diem_unit:    { type: String, default: 'dia' },
    per_diem_days:    { type: Number, default: 0 },
    gasoline_rate:    { type: Number, default: 0 },
    gasoline_unit:    { type: String, default: 'km' },
    gasoline_km:      { type: Number, default: 0 },
    unit_rent_amount: { type: Number, default: 0 },
    unit_rent_period: { type: String, enum: ['dia', 'semana', 'mes'], default: 'dia' },
    unit_rent_unit:   { type: String, default: 'dia' },
    unit_rent_qty:    { type: Number, default: 0 },
    profit_amount:    { type: Number, default: 0 },
    indirect_amount:  { type: Number, default: 0 }
}, { _id: false })

const PreFlightSchema = new Schema({
    fuel_level:        { type: Number, min: 0, max: 100, default: 50 },
    cargo_description: { type: String, default: '' },
    items: {
        extintor:         { type: Boolean, default: true },
        llanta_refaccion: { type: Boolean, default: true },
        herramientas:     { type: Boolean, default: true },
        gato:             { type: Boolean, default: true },
        cinturon:         { type: Boolean, default: true },
        documentos:       { type: Boolean, default: true },
        tarjetas:         { type: Boolean, default: true }
    },
    observaciones: { type: String, default: '' }
}, { _id: false })

const RentasSchema = new Schema({
    is_active: {
        type: Boolean,
    },
    type: {
        type: String,
        default: 'renta',
    },
    folio: {
        type: Number,
        default: 0,
    }, 
    request_date: {
        type: Date,        
    },
    delivery_date: {
        type: Date,
    }, 
    vehicle: {
        type: String,
    }, 
    driver: {
        type: String,
    },
    subject: {
        type: String,
    },
    document_id: {
        type: String,
    }, 
    project_id: {
        type: String,
    }, 
    kilometer_out: {
        type: Number,
    }, 
    kilometer_in: {
        type: Number,
    },
    subtotal_travel: {
        type: Number,
        default: 0,
    },
    fuel_level: {
        type: Number,
        default: 50,
    },
    fuel_card: {
        type: String,
    },
    fuel_amount: {
        type: String,
    },
    recorrido_km: {
        type: String,
    },
    email_sent: {
        type: Array,
    }, 
    bussiness_cost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bussinesses',
    },
    route: {
        type: JSON,
    },
    description: {
        type: JSON,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businesses',
    },
    link_googlemaps: {
        type: String,
    },
    casetas: {
        type: String,
    },
    tarjeta_deposito: {
        type: String,
    },    
    isCancel_status: {
        type: String,
        default: null,
    },
    cost_breakdown: {
        type: CostBreakdownSchema,
        default: () => ({})
    },
    pre_flight: {
        type: PreFlightSchema,
        default: () => ({})
    },
    profit_pct: {
        type: Number,
        default: 8,
    },
    indirect_pct: {
        type: Number,
        default: 12,
    },
    cargo_description: {
        type: String,
        default: '',
    },
    origin: {
        type: String,
        default: '',
    },
    destination: {
        type: String,
        default: '',
    },
    stops: {
        type: [String],
        default: [],
    },
    cost_center: {
        type: String,
        default: '',
    },
    notes: {
        type: String,
        default: '',
    }
}, { timestamps: true })

RentasSchema.pre('save', async function (next) {
    // count the number of traslado
    this.folio = await Rentas.find({
        bussiness_cost: this.bussiness_cost,
    }).countDocuments() + 1
    next()
})

// prev folio consecutive
const Rentas = mongoose.model('Rentas', RentasSchema)

module.exports = {
    Rentas
}