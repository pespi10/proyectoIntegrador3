import React from 'react';
import Search from '../../components/Search/Search';
  function Home() {
    return (
      <React.Fragment>
        <h1>Gero Movies</h1>
        <main>
        <Search/>
          <h2>Movies now playing</h2>
          {/* <section className="card-conteiner">
            {categoriesData.map(category => (
              <Categories 
                key={category.id} 
                cat={category.cat} 
              />
            ))}
          </section> */}
  
          
          
          <h2>Popular movies this week</h2>
          {/* <section className="card-container">
            {personajes.map(card => (
              <CharacterCard/>
            ))}
          </section> */}
        </main>
      </React.Fragment>
    );
  }
  export default Home;
  