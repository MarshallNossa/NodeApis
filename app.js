import {createServer} from "http";
import https from "https";

//Creamos el servidor, lo metemos en una variable y le mandamos un mensaje
let myServer = createServer((req, res)=>{
    //Hacemos la consulta a la api con https
    https.get("https://pokeapi.co/api/v2/pokemon/ditto", (req)=>{
        //Esperamos la respuesta de la api
        let data = "";
        req.on("data", (chunk)=>{
            data += chunk;
        })
        //Obtenemos la respuesta y la mostramos en consola
        req.on("end", ()=>{
            console.log(JSON.parse(data));
        })
    })
    res.end("hola");




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