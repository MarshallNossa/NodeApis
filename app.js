import {createServer} from "http";
import https from "https";

//Creamos el servidor, lo metemos en una variable y le mandamos un mensaje
let myServer = createServer((req, res)=>{  
    let data = "";
    //Hacemos la consulta a la api con https
    https.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=HGeXiToRtPqmcuMgzClrGSYThNMDNGgrq6fb8ej0", (req)=>{
        //Le decimos al request que renderice todo lo que entre y cuando finaliza manda la promesa y la muestra
        req.on("data", (chunk)=>{
            data += chunk;
        })
        req.on("end", ()=>{
            //Parseo el objeto json a objeto javascrip´t para poder acceder a sus propiedades con el sistems de puntuación
            let plantilla = `
                <h1 style="display: flex; justify-content: center;">Asteroids near to the earth</h1>
                <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center;">
            `;
            let objJson = JSON.parse(data);
            let asteroids = objJson.near_earth_objects;
            //Obtengo los valores del objeto en cuestión para convertirlo en un array y poder iterarlo
            Object.values(asteroids).forEach((array)=>{
                array.forEach((element)=>{
                    plantilla += /* html */ `
                        <div style="width: 400px; height: 600px; background: red; margin: 25px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
                            <h2>Name: ${element.name}</h2>
                            <h3>Size:</h3>
                                <p>Min size: ${element.estimated_diameter.meters.estimated_diameter_min} Meters</p>
                                <p>Max size: ${element.estimated_diameter.meters.estimated_diameter_max} Meters</p>
                            <h3>Is potencially hazardous?:</h3>
                                <p>${element.is_potentially_hazardous_asteroid}</p>
                                <h3>Close approach data</h3>
                                    <p>Close approach date</p>
                                    <p>${element.close_approach_data[0].close_approach_date_full}</p>
                        </div>
                    `
                })
            })
            plantilla += `</div>`;
            res.end(`${plantilla}`);
        })
    })
})

//Creamos una variable con la configuración del server
const config = {
    hostname: "127.9.0.128",
    port: 1208
}

//Levantamos el servidor
myServer.listen(config, ()=>{
    /* console.log(`http://${config.hostname}:${config.port}/`); */
})