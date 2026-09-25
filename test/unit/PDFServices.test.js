const PDFServices = require('../../services/PDFServices')

describe('PDFServices.vehicleData', () => {
  const baseDocument = {
    type: 'renta',
    client: '626e223ffe9887654db63c37',
    bussiness_cost: '626e22ebfe9887654db63c38',
    createdAt: new Date('2026-09-24'),
    request_date: new Date('2026-09-24'),
    delivery_date: new Date('2026-09-25'),
    driver: 'Juan Pérez',
    vehicle: 'ABC123',
    route: 'CDMX - Querétaro',
    kilometer_out: 10000,
    fuel_level: 80,
    recorrido_km: '200',
    folio: 42,
    subtotal_travel: 20000,
    profit_pct: 8,
    indirect_pct: 12,
    description: {
      planDescription: 'Renta de unidad',
      planPrice: 20000
    },
    cost_breakdown: {
      casetas_amount: 0,
      operator_rate: 800,
      operator_days: 2,
      per_diem_rate: 500,
      per_diem_days: 2,
      gasoline_rate: 5,
      gasoline_unit: 'km',
      gasoline_km: 200,
      unit_rent_amount: 17000
    }
  }

  const flotillasData = [{
    modelo: 'Toyota Hilux',
    placas: 'ABC123',
    planes: []
  }]

  it('respeta gasoline_unit "km" y envía gasoline_km al PDF', () => {
    const result = PDFServices.vehicleData(baseDocument, flotillasData)

    expect(result.cost_breakdown.gasoline_unit).toBe('km')
    expect(result.cost_breakdown.gasoline_km).toBe(200)
  })

  it('mantiene gasoline_unit "fijo" si el documento fue guardado así', () => {
    const doc = {
      ...baseDocument,
      subtotal_travel: 2500,
      cost_breakdown: {
        ...baseDocument.cost_breakdown,
        gasoline_rate: 2500,
        gasoline_unit: 'fijo',
        gasoline_km: 1
      }
    }

    const result = PDFServices.vehicleData(doc, flotillasData)

    expect(result.cost_breakdown.gasoline_unit).toBe('fijo')
    expect(result.cost_breakdown.gasoline_km).toBe(1)
  })

  it('calcula utilidad e indirectos sobre subtotal_travel redondeados a 2 decimales', () => {
    const result = PDFServices.vehicleData(baseDocument, flotillasData)

    // utilidad = 20000 * 0.08 = 1600
    expect(result.cost_breakdown.profit_amount).toBe(1600)
    // indirectos = 20000 * 0.12 = 2400
    expect(result.cost_breakdown.indirect_amount).toBe(2400)
  })

  it('respeta utilidad e indirectos persistidos si ya existen', () => {
    const doc = {
      ...baseDocument,
      cost_breakdown: {
        ...baseDocument.cost_breakdown,
        profit_amount: 999,
        indirect_amount: 111
      }
    }

    const result = PDFServices.vehicleData(doc, flotillasData)

    expect(result.cost_breakdown.profit_amount).toBe(999)
    expect(result.cost_breakdown.indirect_amount).toBe(111)
  })

  it('formatea subtotal_travel como string de moneda', () => {
    const result = PDFServices.vehicleData(baseDocument, flotillasData)

    expect(result.subtotal_travel).toBe('$20,000.00')
  })
})
