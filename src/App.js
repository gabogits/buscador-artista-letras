import React, {Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';
import axios from 'axios';

function App() {

  //definir el state
  const [busquedaLetra, guardarBusquedaletra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0) return;
    const consultarApiLetra = async () => {
      const {artista, cancion } = busquedaLetra;
      const url  = `https://private-anon-7700093351-lyricsovh.apiary-proxy.com/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
     
         //const resultado = await axios(url); para consultar dos apis en lugar de esto ocuparemos una promesa
      const [letra, informacion] = await Promise.all([ //con este codigo se mejora el performance ya que no requiere que una consulta a la api no tenga que esperar para empezar hasta que termine la otra
        axios(url),
        axios(url2)
      ])
      guardarLetra(letra.data.lyrics)
      guardarInfo(informacion.data.artists[0])
      // guardarLetra(resultado.data.lyrics);
    }
    consultarApiLetra();
  }, [busquedaLetra, info])
  return (
    <Fragment>
      <Formulario guardarBusquedaletra={guardarBusquedaletra} />
      <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <Info 
               info={info}
                />
              </div>
              <div className="col-md-6">
                  <Cancion letra={letra}
                   
                  />
              </div>
            </div>
          </div>

          
    </Fragment>
    
  );
}

export default App;
