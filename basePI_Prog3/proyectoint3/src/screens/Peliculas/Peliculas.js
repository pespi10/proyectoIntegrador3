import React from 'react';
import AllMovies from '../../components/AllMovies/AllMovies';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Card from '../../components/Card/Card';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU'
    }
  };

  class Peliculas extends Component {

    constructor(props) {
    super(props);
    this.state = {
      peliculasTotal: [],
      limite: 6
    };

  }

  componentDidMount(){
    this.peliculasTotal()
  }

  peliculasTotal = () => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculasTotal: data.results
        });
      })
      .catch(error => {
        console.log('Error al cargar películas en cartel:', error)
      });
  }

  cargarMas= () => {

    this.setState(prev=>({
      limite: prev.limite + 6
    }))


  }

  render(){
    const peliculasTotal=this.state ;
 <React.Fragment>
  <Header />
  <main>
    <h2>Movies</h2>

    <section className="card-container">
                {peliculasTotal.map(movie => (
                  <Card 
                    key={movie.id}
                    id={movie.id}
                    name={movie.title}
                    img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    desc={movie.overview}
                    link={`/peliculas/detalle/${movie.id}`}
                  />
                ))}
              </section>
              </main>
              <Footer/>
</React.Fragment>
  }


}

  
  export default Peliculas;