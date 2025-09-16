import React, { Component } from 'react';
import Search from '../../components/Search/Search';
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom';
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
      nowPlaying: [],
      popular: [],
      cargandoPlaying: true,
      cargandoPopular: true
    }
  }

  componentDidMount() {
    this.NowPlaying();
    this.Popular();
  }

  NowPlaying = () => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          nowPlaying: data.results.slice(0, 4), 
          cargandoPlaying: false
        });
      })
      .catch(error => {
        console.log('Error al cargar películas en cartel:', error);
        this.setState({ cargandoPlaying: false });
      });
  }

  Popular = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          popular: data.results.slice(0, 4), 
          cargandoPopular: false
        });
      })
      .catch(error => {
        console.log('Error al cargar películas populares:', error);
        this.setState({ cargandoPopular: false });
      });
  }

  render() {
    const { nowPlaying, popular, cargandoPlaying, cargandoPopular } = this.state;

    return (
      <React.Fragment>
        <h1>Gero Movies</h1>
        <main>
          <Search />
          <section>
            <div>
              <h2>Movies now playing</h2>
              <Link to="/peliculas/nowplaying">Ver todas</Link>
            </div>
            
            {cargandoPlaying ? (
              <p>Loading movies...</p>
            ) : (
              <section className="card-container">
                {nowPlaying.map(movie => (
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
            )}
          </section>
          <section>
            <div>
              <h2>Popular movies this week</h2>
              <Link to="/peliculas/popular">Ver todas</Link>
            </div>
            
            {cargandoPopular ? (
              <p>Loading movies...</p>
            ) : (
              <section className="card-container">
                {popular.map(movie => (
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
            )}
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Home;