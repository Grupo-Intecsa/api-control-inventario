const FlotillasService = require('../../services/FlotillasService')

describe('FlotillasService.mapDocumentBody', () => {
  it('gasolina fija debe guardar gasoline_km=1 aunque venga recorrido_km', () => {
    const payload = FlotillasService.mapDocumentBody('renta', {
      gasoline_rate: 2500,
      gasoline_unit: 'fijo',
      recorrido_km: 420
    })

    expect(payload.cost_breakdown.gasoline_km).toBe(1)
    expect(payload.cost_breakdown.gasoline_unit).toBe('fijo')
  })

  it('gasolina por km puede fallback a recorrido_km cuando no hay gasoline_km', () => {
    const payload = FlotillasService.mapDocumentBody('renta', {
      gasoline_rate: 5,
      gasoline_unit: 'km',
      recorrido_km: 420
    })

    expect(payload.cost_breakdown.gasoline_km).toBe(420)
    expect(payload.cost_breakdown.gasoline_unit).toBe('km')
  })

  it('gasolina por km respeta gasoline_km explicito', () => {
    const payload = FlotillasService.mapDocumentBody('renta', {
      gasoline_rate: 5,
      gasoline_unit: 'km',
      gasoline_km: 100,
      recorrido_km: 420
    })

    expect(payload.cost_breakdown.gasoline_km).toBe(100)
  })

  it('valores vacíos o no numéricos se normalizan a 0', () => {
    const payload = FlotillasService.mapDocumentBody('flete', {
      casetas_amount: '',
      operator_rate: null,
      gasoline_rate: 'no-numero'
    })

    expect(payload.cost_breakdown.casetas_amount).toBe(0)
    expect(payload.cost_breakdown.operator_rate).toBe(0)
    expect(payload.cost_breakdown.gasoline_rate).toBe(0)
  })
})
