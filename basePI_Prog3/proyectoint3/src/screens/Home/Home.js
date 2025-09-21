import React, { Component } from 'react';
import Search from '../../components/Search/Search';
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom';
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
      nowPlaying: [],
      popular: [],
      airing:[],
      topRated:[],
    }
  }

  componentDidMount() {
    this.NowPlaying();
    this.Popular();
    this.AiringToday();
    this.TopRated();
  }

  NowPlaying = () => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          nowPlaying: data.results.slice(0, 4), 
        });
      })
      .catch(error => {
        console.log('Error al cargar películas en cartel:', error);
      });
  }

  Popular = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          popular: data.results.slice(0, 4), 
        });
      })
      .catch(error => {
        console.log('Error al cargar películas populares:', error);
      });
  }
  AiringToday = () => {
    fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          airing: data.results.slice(0, 4), 
        });
      })
      .catch(error => {
        console.log('Error al cargar series airing today:', error);
      });
  }
  TopRated = () => {
    fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          topRated: data.results.slice(0, 4), 
        });
      })
      .catch(error => {
        console.log('Error al cargar series top rated:', error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Gero Movies</h1>
        <main>
          <Search />
          <section>
            <div>
            <Link to="/peliculas/nowplaying"><h2>Movies now playing</h2></Link>
            </div>
            
            {this.state.nowPlaying.length === 0 ? (
              <Loader />
            ) : (
              <section className="card-container">
                {this.state.nowPlaying.map(movie => (
                  <Card 
                    key={movie.id}
                    id={movie.id}
                    name={movie.title}
                    img={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    desc={movie.overview}
                    link={`/detalle/movie/id/${movie.id}`}
                  />
                ))}
              </section>
            )}
          </section>
          <section>
            <div>
            <Link to="/peliculas/popular"><h2>Popular movies this week</h2></Link>
            </div>
            
            {this.state.popular.length === 0 ? (
              <Loader />
            ) : (
              <section className="card-container">
                {this.state.popular.map(movie => (
                  <Card 
                    key={movie.id}
                    id={movie.id}
                    name={movie.title}
                    img={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    desc={movie.overview}
                    link={`/detalle/movie/id/${movie.id}`}
                  />
                ))}
              </section>
            )}
          </section>
          <section>
            <div>
            <Link to="/series/airing"><h2>TV Series Airing Today</h2></Link>
            </div>
            
            {this.state.airing.length === 0 ? (
              <Loader />
            ) : (
              <section className="card-container">
                {this.state.airing.map(series => (
                  <Card 
                    key={series.id}
                    id={series.id}
                    name={series.name}
                    img={`https://image.tmdb.org/t/p/w342${series.poster_path}`}
                    desc={series.overview}
                    link={`/detalle/tv/id/${series.id}`}
                  />
                ))}
              </section>
            )}
          </section>
          <section>
            <div>
            <Link to="/series/toprated"><h2>TV Series Top Rated</h2></Link>
            </div>
            
            {this.state.topRated.length === 0 ? (
              <Loader />
            ) : (
              <section className="card-container">
                {this.state.topRated.map(series => (
                  <Card 
                    key={series.id}
                    id={series.id}
                    name={series.name}
                    img={`https://image.tmdb.org/t/p/w342${series.poster_path}`}
                    desc={series.overview}
                    link={`/detalle/tv/id/${series.id}`}
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