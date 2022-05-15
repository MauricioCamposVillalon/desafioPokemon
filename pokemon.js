/*fetch('http://localhost:3001/pokemon')
  .then(response => response.json())
  .then(data => console.log(data));*/




    const obtenerDatos = async () => {
        const arregloDatos = [];
          const datos = await fetch(`http://localhost:3001/pokemon`);
          try{
            const json =  await datos.json();
            arregloDatos.push(json);
            i = i+1;
          }catch(error){
            console.log('error al encontrar promesa');
          }
          console.log(arregloDatos)
      }


      obtenerDatos();