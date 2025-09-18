import React from 'react';
import AllMovies from '../../components/AllMovies/AllMovies';
  function Peliculas() {
    return (
      <React.Fragment>
        
        <main>
          <h2>Personajes de películas</h2>
          <AllMovies/>
        </main>
      </React.Fragment>
    );
  }
  
  export default Peliculas;