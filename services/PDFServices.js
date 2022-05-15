const { InvoiceStorage } = require('../models')

module.exports = {
  createInvoice: (body, query) => {

    const { name, razonsocial, codigopostalRcf, phone, email, cotizar, carrito, total, date, rfc } = body
    const { folio } = query

    const cantidadString = (precio) => new Intl.NumberFormat('es-MX', { style:"currency", currency: "MXN"}).format(precio)
    const dateFormat = (date) => new Intl.DateTimeFormat('es-MX', { dateStyle: 'full'}).format(new Date(date))
    const direccionCompleta = `${body.direccionRfc}, ${body.alcaldiaRfc}, ${body.estadoRfc}, ${body.ciudadRfc}`

    
    const carritoMap = carrito.map(item => {
      return( 
        `<tr>
          <td>${item.cantidad}</td>
          <td>${item.title}</td>
          <td>${cantidadString(item.precio)}</td>
          <td>${item?.foto && `<img src="${item.foto}" class="fotoMini"}></img>`}</td>
        </tr>  
        `
        )
    })

    const envioCotizar = `
    <tr>
      <td>1</td>
      <td>Cotizar servicio de envio al codigo postal: ${codigopostalRcf}</td>
      <td>*Por Cotizar</td>
      <td></td>
    </tr>  
      `
    const cotizacionNull = `<tr class="d-none"></tr>`

    let cotizacion
    if(cotizar){
      cotizacion = envioCotizar
    }else if(!cotizar) {
      cotizacion = cotizacionNull
    }
    

    const web = `
    <!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
    
        <style>
          
          .fotoMini{
            height: 50px;
            width: auto;
    
          }
    
    
          .back{
            width: 100%;
          }
    
          .invoice-wrapper{
            margin: 20px auto;
            width: 100%;
            
          }
          .invoice-top{
            background-color: #fafafa;
            padding: 40px 60px;
          }
    
          .invoice-top-left{
            margin-top: 10px;
            
          }
          .invoice-top-left h2 , .invoice-top-left h6{
            line-height: 1.5;
            font-family: 'Montserrat', sans-serif;
          }
          .invoice-top-left h4{
            margin-top: 30px;
            font-size: 12px;
            font-family: 'Montserrat', sans-serif;
          }
          .invoice-top-left h5{
            line-height: 1.4;
            font-size: 12px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
          }
          .client-company-name{
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 0;
          }
          .client-address{
            font-size: 14px;
            margin-top: 5px;
            color: rgba(0,0,0,0.75);
          }
    
    
          .invoice-top-right h2 , .invoice-top-right h6{
            text-align: right;
            line-height: 1.5;
            font-family: 'Montserrat', sans-serif;
          }
          .invoice-top-right h5{
            line-height: 1.4;
              font-family: 'Montserrat', sans-serif;
              font-weight: 400;
              text-align: right;
              margin-top: 0;
          }
          .our-company-name{
            font-size: 16px;
              font-weight: 600;
              margin-bottom: 0;
          }
          .our-address{
            font-size: 13px;
            margin-top: 0;
            color: rgba(0,0,0,0.75);
          }
    
          .logo-wrapper{ 
            overflow: auto;
            display: flex;
            justify-content: flex-end;
            
          }
    
          .invoice-bottom{
            background-color: #ffffff;
            padding: 40px 60px;
            position: relative;
          }
          .invoice-title{
            font-size: x-large;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            
          }
    
          .invoice-bottom-left{
            width: 100%;
            display: flex;
            flex-direction: row;
            
          }
    
          .invoice-bottom-left > h5{
            font-family: 'Montserrat', sans-serif;
            width: 100px;
          }
          
          .invoice-bottom-left > h4{
            font-family: 'Montserrat', sans-serif;
            width: 100%;
          }
          .invoice-bottom-left h4{
            font-weight: 400;
            font-size: large;
          }
          .terms{
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            margin-top: 40px;
          }
          .divider{
            margin-top: 50px;
              margin-bottom: 5px;
          }
    
          
          .invoice-bottom-bar{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 26px;
            background-color: #3B5998;
          }
    
          .invoice-datos-cliente{
            font-size: medium;
          }
    
          .invoice-button-send {
            
              border: none;
              border-radius: 4px;
              font-weight: bold;
              width: 12rem;
              padding: 0.86rem;
              color: #ffffff;
              border: 1px solid slategrey;
              background-color: rgb(223, 80, 80);  
          }
    
          .invoice-button-send:hover{
            color: rgb(223, 80, 80);
            border: 1px solid rgb(223, 80, 80);;
            background-color: white;  
          }
    
          .invoice-date{
            text-align: right;
            text-transform: uppercase;
            font-size: small;
            font-weight: bold;
          }
          
        </style>
    
    
    
      </head>
      <body>
        
        <section class="back">
          
          <div class="container-xl">
            <div>
              <div >
                <div class="invoice-wrapper">
                  <div class="invoice-top">
                    <div class="row">
                      <div class="col-6">
                        <div class="invoice-top-left">
                          <!-- <h2 class="client-company-name">Instalaciónes Tecnólogicas Aplicadas <br/> S.A. de C.V.</h2>
                          <h6 class="client-address">La Montaña, 28 A, CP: 53340 <br/>México</h6> -->
                          <h3 class="font-weight-bold">Datos del Cliente</h3>
                          <h5>${razonsocial}</h5> 
                          <h5>${rfc}</h5>
                          <h6>Atención: ${name}</h6>
                          <span class="invoice-datos-cliente">${email}<br/>${direccionCompleta} C.P.: ${codigopostalRcf}<br />${phone}</span>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="invoice-top-right">
                          <h2 class="our-company-name">Grupo Intecsa</h2>
                          <h6 class="our-address">grupointeca.com, <br/>contacto@grupointecsa.com<br/>CDMX - México</h6>
                            <h6 class="text-right">+52 55701197</h6>
                          <div class="logo-wrapper">
                            <img src="https://grupointecsa.com/web-logo.webp" class="img-responsive pull-right logo" alt="Logo del invoice"/>
                            
                          </div>
                            <div>
                              <p class="mt-3 w-100 invoice-date">${dateFormat(date)}</p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="invoice-bottom">
                    <div class="row">
                      <div class="col-12">
                        <h5 class="invoice-title">Cotización</h5>
                      </div>
                      <div class="clearfix"></div>
        
                      <div class="col-12">
                          <h5>Folio: <p>${folio}</p></h5>
                          
                      </div>
                      <div class="col-offset-1 col-12 col-9 w-100">
                        <div class="invoice-bottom-right tabla--content">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Cantidad</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Imagen</th>
                              </tr>
                            </thead>
                            <tbody>                                
                              <tr>
                              ${carritoMap}
                              </tr>
                              <tr>
                              ${cotizacion}
                              </tr>
                            </tbody>
                            <thead>
                              <tr>
                                <th>Total</th>
                                <th></th>
                                <th></th>
                                <th>${cantidadString(total)}</th>
                                
                              </tr>
                            </thead>
                          </table>
                          <h4 class="terms">Terminos</h4>
                          <ul>
                            <li>El total de está cotización puede tener partidas pendientes de cotizar o los precios pueden cambiar sin previo aviso</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            </div>
            </div>
      
        <!-- Optional JavaScript; choose one of the two! -->
    
        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>
    
        <!-- Option 2: Separate Popper and Bootstrap JS -->
        
        <!--
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.min.js" integrity="sha384-lpyLfhYuitXl2zRZ5Bn2fqnhNAKOAaM/0Kr9laMspuaMiZfGmfwRNFh8HlMy49eQ" crossorigin="anonymous"></script>
        -->
      </body>
    </html>
    `

    return web
  },
  saveInvoice: async (payload) => {

    const genFolioIncremental = await new Promise((resolve) => {
      resolve(InvoiceStorage.countDocuments())
    })
    .then(res => {
       const data = {
         ...payload,
         folio: `W-${Math.floor(Math.random() * 1000)}-${res + 1}`
       }
       return data
    })

    const saveInfoInvoiceData = (data) => new Promise((resolve) => {
      resolve(InvoiceStorage(data).save())
    })
    .then(res => res)


    const query = await Promise.all([genFolioIncremental])
      .then(res => {
        return saveInfoInvoiceData(res[0])
      })
      .then(res => res)

      return query
  },

  getInvoiceId: (id) => InvoiceStorage.findById(id),
  flotillaInvoice: (data, flotillasData) => {  
    // destructuring data
    const dateFormat = (date) => new Intl.DateTimeFormat('es-MX', { dateStyle: 'full'}).format(new Date(date))
    const {
      type,
      email_sent,
      client,
      _id,
      request_date,
      delivery_date,
      driver,
      route,
      kilometer_out,
      kilometer_in,
      fuel_level,
      document_id,
      project_id,
      fuel_card,
      folio,
      description,
      vehicle,      
      bussiness_cost,
      createdAt,
      updatedAt,
      // 
      fuel_amount,
      recorrido_km = '0',
      subject,
      link_googlemaps
    } = data

    const {
      modelo,
      placas,
      planes,
    } = flotillasData[0]    

    const empresaLogos = [
      {
        "_id": "626e223ffe9887654db63c37",
        "name": "Instalaciones Tecnologicas Aplicadas",
        "slug": "ita"
      },
      {
        "_id": "626e22ebfe9887654db63c38",
        "name": "Inmobiliaria Eguel",
        "slug": "eguel"
      },
      {
        "_id": "626e2305fe9887654db63c39",
        "name": "Instalaciones y Tecnica",
        "slug": "ite"
      },
      {
        "_id": "626e2324fe9887654db63c3a",
        "name": "Canalizacion y Soporteria",
        "slug": "csm"
      }
    ]

    const currentEmpresa = empresaLogos.find(empresa => empresa._id === bussiness_cost.toString()).name
    const currentClient = empresaLogos.find(empresa => empresa._id.toString() === client.toString()).name
    const cantidadString = (precio) => new Intl.NumberFormat('es-MX', { style:"currency", currency: "MXN"}).format(precio)
    console.log(currentEmpresa)
    
    const invoicePDF = `
    <!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
    
        <style>
          
          .fotoMini{
            height: 50px;
            width: auto;
    
          }
          .back{
            width: 100%;
          }
    
          .invoice-wrapper{
            margin: 20px auto;
            width: 100%;
            
          }
          .invoice-top{
            background-color: #fafafa;
            padding: 40px 60px;
          }
    
          .invoice-top-left{
            margin-top: 10px;
            
          }
          .invoice-top-left h2 , .invoice-top-left h6{
            line-height: 1.5;
            font-family: 'Montserrat', sans-serif;
          }
          .invoice-top-left h4{
            margin-top: 30px;
            font-size: 12px;
            font-family: 'Montserrat', sans-serif;
          }
          .invoice-top-left h5{
            line-height: 1.4;
            font-size: 12px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
          }
          .client-company-name{
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 0;
          }
          .client-address{
            font-size: 14px;
            margin-top: 5px;
            color: rgba(0,0,0,0.75);
          }
    
    
          .invoice-top-right h2 , .invoice-top-right h6{
            text-align: right;
            line-height: 1.5;
            font-family: 'Montserrat', sans-serif;
          }
          .invoice-top-right h5{
            line-height: 1.4;
              font-family: 'Montserrat', sans-serif;
              font-weight: 400;
              text-align: right;
              margin-top: 0;
          }
          .our-company-name{
            font-size: 16px;
              font-weight: 600;
              margin-bottom: 0;
          }
          .our-address{
            font-size: 13px;
            margin-top: 0;
            color: rgba(0,0,0,0.75);
          }
    
          .logo-wrapper{ 
            overflow: auto;
            display: flex;
            justify-content: flex-end;
            
          }
    
          .invoice-bottom{
            background-color: #ffffff;
            padding: 40px 60px;
            position: relative;
          }
          .invoice-title{
            font-size: x-large;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            
          }
    
          .invoice-bottom-left{
            width: 100%;
            display: flex;
            flex-direction: row;
            
          }
    
          .invoice-bottom-left > h5{
            font-family: 'Montserrat', sans-serif;
            width: 100px;
          }
          
          .invoice-bottom-left > h4{
            font-family: 'Montserrat', sans-serif;
            width: 100%;
          }
          .invoice-bottom-left h4{
            font-weight: 400;
            font-size: large;
          }
          .terms{
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            margin-top: 40px;
          }
          .divider{
            margin-top: 50px;
              margin-bottom: 5px;
          }
    
          
          .invoice-bottom-bar{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 26px;
            background-color: #3B5998;
          }
    
          .invoice-datos-cliente{
            font-size: medium;
          }
    
          .invoice-button-send {
            
              border: none;
              border-radius: 4px;
              font-weight: bold;
              width: 12rem;
              padding: 0.86rem;
              color: #ffffff;
              border: 1px solid slategrey;
              background-color: rgb(223, 80, 80);  
          }
    
          .invoice-button-send:hover{
            color: rgb(223, 80, 80);
            border: 1px solid rgb(223, 80, 80);;
            background-color: white;  
          }
    
          .invoice-date{
            text-align: right;
            text-transform: uppercase;
            font-size: small;
            font-weight: bold;
          }
          
        </style>
    
    
    
      </head>
      <body>
        
        <section class="back">
          
          <div class="container-xl">
            <div>
              <div >
                <div class="invoice-wrapper">
                  <div class="invoice-top">
                    <div class="row">
                      <div class="col-6">
                        <div class="invoice-top-left">
                          <h3>RECURSOS LOGÍSTICA</h3>
                          <h3 class="invoice-title">${type.toUpperCase()}</h3>
                          <h3>${currentEmpresa || ''}</h3>                   
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="invoice-top-right">
                          <h2 class="our-company-name">Grupo Intecsa</h2>
                          <div class="logo-wrapper">                        
                          </div>
                          <div>
                              <h2>Folio: ${folio}</h2>
                              <p class="mt-3 w-100 invoice-date">${dateFormat(createdAt)}</p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="invoice-bottom">                  
                    <div class="row">
                      <div class="col-12">                        
                      </div>
                      <div class="clearfix"></div>

                      <br/>
                      <div>
                          <h4>Cliente: ${currentClient || ''}</h4>
                          <h5>${subject || ''}</h5>
                      </div>

                      <br/>
                      <div class="col-offset-1 col-12 col-9 w-100">

                        <div class="invoice-bottom-right tabla--content">
                        <hr />
                          <h5>
                            Datos Vehiculo
                          </h5>
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Vehiculo</th>
                                <th>Placas</th>
                                <th>Chofer</th>
                                <th>Tarjeta Gas</th>
                                <th>Carga de Gas</th>
                              </tr>
                            </thead>
                            <tbody>                              
                              <td>${modelo}</td>
                              <td>${placas}</td>
                              <td>${driver}</td>
                              <td>${fuel_card}</td>
                              <td>${(cantidadString(parseFloat(fuel_amount)))}</td>
                            </tbody>
                          </table> 
                        <hr />
                          <h5>
                             Datos de Ruta
                          </h5>
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Recorrido</th>
                                <th>Km Salida</th>
                                <th>Gas Salida</th>
                                <th>Distancia Recorrido</th>
                              </tr>
                            </thead>
                            <tbody>
                              <td>${route}</td>
                              <td>${kilometer_out}</td>
                              <td>${fuel_level}%</td>
                              <td>${recorrido_km} KM aprox</td>
                            </tbody>
                          </table>    
                        <br/>                       
                        <hr />
                          <h5>
                             Plan del Vehiculo
                          </h5>
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Nombre del plan</th>                                
                                <th>Costo unitario</th>
                                <th>Subtotal del recorrido</th>
                              </tr>
                            </thead>
                            <tbody>
                              <td>${planes?.planDescription}</td>                              
                              <td>$ ${planes?.planPrice}</td>                              
                              <td>${cantidadString(parseFloat(planes?.planPrice) * parseFloat(recorrido_km))}</td>
                            </tbody>
                          </table>    
                        <br/>                        
                        <hr />
                          <h5>
                             Observaciones
                          </h5>
                          <table class="table">
                            <thead>
                              <tr>                                
                                <th>Google maps</th>
                                <th>Salida de almacén <br/> (ADMIN/COMERCIAL)</th>
                                <th>Proyecto</th>
                              </tr>
                            </thead>
                            <tbody>
                              <td>
                                <a target="_blank" href="${link_googlemaps || '#'}">Ver recorrido</a>
                              </td>
                              <td>${document_id || ''}</td>
                              <td>${project_id || ''}</td>
                            </tbody>
                          </table>    
                        <br/>
                                                    
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            </div>
            </div>
      
        <!-- Optional JavaScript; choose one of the two! -->
    
        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>
    
        <!-- Option 2: Separate Popper and Bootstrap JS -->
        
        <!--
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.min.js" integrity="sha384-lpyLfhYuitXl2zRZ5Bn2fqnhNAKOAaM/0Kr9laMspuaMiZfGmfwRNFh8HlMy49eQ" crossorigin="anonymous"></script>
        -->
      </body>
    </html>    
    `
      return invoicePDF
    }  
}