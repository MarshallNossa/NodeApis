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
            let plantilla = /* html */ `
                <h1 style="display: flex; justify-content: center;">Asteroids near to the earth</h1>
                <div class="searcherPadre">
                    <input id="searcher" type="date">
                    <input class="btn" type="submit" value="Ver">
                </div>
                <div class="padre" style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center;">
            `;
            let objJson = JSON.parse(data);
            let asteroids = objJson.near_earth_objects;
            //Obtengo los valores del objeto en cuestión para convertirlo en un array y poder iterarlo
            Object.values(asteroids).forEach((array)=>{
                array.forEach((element)=>{
                    plantilla += /* html */ `
                        <div class="cards" style="">
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
            plantilla += /* html */ `
            </div>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                }
                h1 {
                    height: 100px;
                    font-family: "Helvetica";
                    align-items: center;
                }
                .searcherPadre {
                    width: 100%;
                    height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                #searcher {
                    font-family: "Helvetica";
                    width: 50%;
                    height: 50%;
                    border-radius: 10px;
                }
                .btn {
                    font-family: "Helvetica";
                    background-color: white;
                    margin-left: 20px;
                    width: 10%;
                    height: 50%;
                    border-radius: 10px;
                }
                .cards {
                    font-family: "Helvetica";
                    width: 400px;
                    height: 400px;
                    background: rgb( 100, 0, 176);
                    margin: 25px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    border-radius: 30px;
                    color: white;
                }
            </style>
            `;
            
            res.end(`${plantilla}`);
        })
    })
})
//CONSULTA POR FECHA A LA API
/* https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=HGeXiToRtPqmcuMgzClrGSYThNMDNGgrq6fb8ej0 */

//Creamos una variable con la configuración del server
const config = {
    hostname: "127.9.0.128",
    port: 1208
}

//Levantamos el servidor
myServer.listen(config, ()=>{
    /* console.log(`http://${config.hostname}:${config.port}/`); */
})