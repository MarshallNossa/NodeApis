import {createServer} from "http";
import https from "https";

//Creamos el servidor, lo metemos en una variable y le mandamos un mensaje
let myServer = createServer((req, res)=>{
    
    let data = "";
    https.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=HGeXiToRtPqmcuMgzClrGSYThNMDNGgrq6fb8ej0", (req)=>{
        req.on("data", (chunk)=>{
            
            data += chunk;
        })
        req.on("end", ()=>{
            //Parseo el objeto json a objeto javascrip´t para poder acceder a sus propiedades con el sistems de puntuación
            let objJson = JSON.parse(data);
            let asteroids = objJson.near_earth_objects;
            //Obtengo los valores del objeto en cuestión para convertirlo en un array y poder iterarlo
            Object.values(asteroids).forEach((array)=>{
                array.forEach((element)=>{
                    console.log(element);
                })
            })
            res.end(data);
        })
    })
    
    
    
    
    
    
    
    
    
    /* //Hacemos la consulta a la api con https
    let data = "";
    https.get("https://pokeapi.co/api/v2/pokemon/ditto", (req)=>{
        //Esperamos la respuesta de la api
        req.on("data", (chunk)=>{
            data += chunk;
        })
        //Obtenemos la respuesta y la mostramos en consola
        req.on("end", ()=>{
            res.end(data);
        })
    }) */




    /* let datos = "";
    //Le decimos al request que renderice todo lo que entre y cuando finaliza manda la promesa y la muestra
    req.on("data", (chunk)=>{
        datos += chunk;
    })
    req.on("end", ()=>{
        res.end(datos);
    }) */
})

//Creamos una variable con la configuración del server
const config = {
    hostname: "127.9.0.128",
    port: 5687
}

//Levantamos el servidor
myServer.listen(config, ()=>{
    /* console.log(`http://${config.hostname}:${config.port}/`); */
})