import React, { Component } from 'react';
import Search from '../../components/Search/Search';
import Card from '../../components/Card/Card'
import Loader from '../../components/Loader/Loader';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU'
    }
  };
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying:[],
      limite: 6
    }
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
      this.setState({
        nowPlaying: data.results, 
      });
    })
    .catch(error => {
      console.log('Error al cargar películas now playing:', error);
    });
  }
  cargarMas= () => {
    this.setState(mas=>({
      limite: mas.limite + 6
    }))
  }
  render() {
    return (
      <React.Fragment>
        <h1>Gero Movies</h1>
        <main>
          <Search />
          <section>
            <div>
            <h2>Movies Now Playing</h2>
            </div>
            {this.state.nowPlaying.length === 0 ? (
              <Loader />
            ) : (
              <section className="card-container">
                {this.state.nowPlaying.slice(0, this.state.limite).map(movie => (
                  <Card 
                    key={movie.id}
                    id={movie.id}
                    name={movie.title}
                    img={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    desc={movie.overview}
                    link={`/detalle/pelicula/id/${movie.id}`}
                  />
                ))}
              </section>
            )}
            <button onClick={() => this.cargarMas()}>Cargar más</button>
          </section>
          
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
