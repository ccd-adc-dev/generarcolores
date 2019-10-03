const fs = require('fs')





function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}
  




const generarPaleta = (colorInicial, colorFinal, numGrados) => {

    /*

    > recibe
    colorInicial: color HEX
    colorFinal: color HEX
    numGrados: Int

    < devuelve

    Arreglo de colores HEX 
    ["#fa0",...]
    
    
    */

    if( typeof colorInicial == "string" && typeof colorFinal == "string" ) {
        colorInicial = hexToRGB(colorInicial)
        colorFinal = hexToRGB(colorFinal)

            
        let rangos = {
            r: colorFinal.r-colorInicial.r,
            g: colorFinal.g-colorInicial.g,
            b: colorFinal.b-colorInicial.b
        }
        
        
        let nuevoColor = {
            r: colorInicial.r,
            g: colorInicial.g,
            b: colorInicial.b,
        }
        
        let nuevosColores = []

        for( let i=0; i<numGrados; i++){
            nuevoColor.r += Math.ceil(rangos.r / numGrados)
            nuevoColor.g += Math.ceil(rangos.g / numGrados)
            nuevoColor.b += Math.ceil(rangos.b / numGrados)

            nuevoColor.r = Math.max(Math.min(nuevoColor.r,255),0)
            nuevoColor.g = Math.max(Math.min(nuevoColor.g,255),0)
            nuevoColor.b = Math.max(Math.min(nuevoColor.b,255),0)

            nuevosColores.push({ ...nuevoColor })
        }

        const coloresHex = nuevosColores.map(c=>`rgba(${c.r},${c.g},${c.b})`)
        return coloresHex


    } else {
        console.warn("Colores deben ser HEX")
    }
    
    return []

}










// const colores = generarPaleta("#f0a030","#f3faf9",10)

// console.log(
//     hexToRGB('#fa0')

// );

const generarHtml = (colores) => {

    
    const cajas = colores.map(c=>(
        `<div style="background-color: ${c}; width: 100px; height: 100px; display: block;">
        <h3>${c}</h3>
        </div>`
    ))
        
        
    const html = `<!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            </head>
            <body>
            ${cajas}
            </body>
        </html>
    `


    return html

}


fs.writeFileSync("./colores.html",generarHtml(generarPaleta('#0bc1ed','#5bf10d',7)))