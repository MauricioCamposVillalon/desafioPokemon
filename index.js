const http = require('http');
const axios = require('axios');
const fs = require('fs');

http.createServer(function(req, res){

    if(req.url == "/" && req.method == "GET"){
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;
        res.end(fs.readFileSync("index.html"));
    }
    if(req.url.startsWith('/pokemones')){


        let pokemones = [];
        //funcion encarga de llamar a los endpoint interiores de la api anterior
        async function getData(url){
            const {data} = await axios.get(url)
            return data
        }
        async function getPokemones(){
            let urlCompleta = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';

            const {data} = await axios.get(urlCompleta)

            data.results.forEach(pokemon => {
                 
                pokemones.push(getData(pokemon.url))              
            });
            //'applicaction/json'
            Promise.all(pokemones).then(resultados => {
                res.writeHead(200, {'Content-Type': 'applicaction/json'});
                let arrayPokemones = [];
                resultados.forEach(pokemon => {
                    console.log(`${pokemon.name} - Imagen:  ${pokemon.sprites.front_default}`)
                    let objPokemon = {
                        img: pokemon.sprites.front_default,
                        nombre: pokemon.name
                        
                    }
                    arrayPokemones.push(objPokemon)
                })
               // console.log(arrayPokemones);
                res.end(JSON.stringify(arrayPokemones))

            }).catch(error => {
                console.log("Ha ocurrido un error al traer la data")
            })
        }

        getPokemones();

    }
}).listen(3001, console.log("Servidor corriendo en http://localhost:3001"))