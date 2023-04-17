const responsivaGenerate = (payload) => {

  const { nombre, equipoId, obra, descripcion, marca, modelo } = payload

  const html = `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat@1&display=swap');
          @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

          :root{
            font-family: 'Montserrat', sans-serif;
          }

          body{
            background-image: url('https://res.cloudinary.com/dlvyxzwjd/image/upload/v1681717068/membrete_ita_vom5mb.png');                                
            background-size: 100vw 100%;
            height: 100vh;
            width: 100vw;        
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 10px;
          }

          .header {
            margin-left: 30px;
            padding: 10px;            
            /* position: absolute;
            top: 0; */
            display: flex;
            flex-direction: column;
          }

          .header img {
            height: 60px;
            width: 320px;
          }

          .header small {
            width: 320px;
            font-size: 8px;
            color: #c8c8c8
          }

          .content {
            display: flex;
            flex-direction: column;
            justify-content: center;      
            padding: 10px 30px;  
          }

          .content p {
            margin: 0;
          }

          .content p span {
            font-weight: bold;
          }

          table {
            margin: 20px;
          }

          hr {
            width: 100%;
            border: 1px solid #7a7a7a;
          }

          .foo {
            display: flex;        
            justify-content: space-between;
            align-items: center;        
          }

          .foo img {
            height: 80px;
            width: 80px;
          }

          .foo p {
            margin-left: 120px;
          }

          .signature {
            text-align: center;
            margin: 0 auto;
          }

      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://res.cloudinary.com/dlvyxzwjd/image/upload/v1681638049/Logo_Instalaciones_GM_pu4glk.png"> 
        <small>
          La Montaña 28 Int A Col. Los Pastores CP 53340 
          Naucalpan de Juárez Estado de México Tel. 55 70 11 97 
        </small>
      
      </div>
      
      <div class="content">
        <p>Resguardo a nombre de: <span>${nombre}</span></p>
        <p>Para el siguiente Equipo:</p>
        <table>
            <thead>
                <tr>
                    <th>Equipo</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
            <tr>
              <td>${marca } ${modelo}</td>
              <td>
              <p>Control de inventario: ${equipoId}</p>
              ${Object.entries(descripcion).map(([key, value]) => {
                return `<small>${key}: ${value}</small>`
              })}
              <p>Obra: ${obra}</p>
              </td>
              </tr>
            </tbody>
        </table>
        <hr />
        <small>
          Por medio de la presente el que suscribe declara recibir como herramienta de trabajo mismo que firma de conformidad, comprometiéndose a mantenerlo en el estado en el que lo recibe, cuidando de dicho material como si el mismo fuera de su propiedad, en el entendido de que en caso de que el mismo sufra cualquier daño ocasionado por su dolo o negligencia se hará responsable de la reparación del mismo. 
        En caso de que, por causas inherentes al uso y desgaste normales del equipo, el mismo requiera cualquier reparación, el que suscribe notificará tal circunstancia a la empresa para que la misma le indique las condiciones en las que las reparaciones o trabajo de mantenimiento sobre el mismo habrán de realizarse.
        Asimismo, se compromete a emplear el equipo únicamente de acuerdo con las condiciones y especificaciones que para dichos efectos haga de su conocimiento la empresa, obligándose a no modificarlo ni en el hardware ni en el software, es decir no agregar ni suprimir ningún programa de los que se encuentren cargados originalmente sin el expreso consentimiento por escrito de la empresa
        </small>
      
      </div>
      <div class="signature">
        <table>
          <thead>
              <tr>
                  <th colspan="2">________________________________________</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Nombre y firma del responsable</td>            
              </tr>
          </tbody>
        </table>
      </div>
      
      <div class="foo">
        <p>
          www.grupointecsa.com
        </p>
        <img src="https://res.cloudinary.com/dlvyxzwjd/image/upload/v1681639016/INTECSA_ewg7iu.jpg" />
      </div>
      
    </body>
    </html>    
  `

  return html
}


module.exports = {
  responsivaGenerate
}