import Card from '../../components/Card/Card';
import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU'
    }
  };

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      limite: 6,
      input: '',
      loading: true
    };
  }

  componentDidMount() {
    this.cargarPeliculas();
  }

  cargarPeliculas = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculas: data.results,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error al cargar películas:', error);
        this.setState({ loading: false });
      });
  }

  cargarMas = () => {
    this.setState(prev => ({
      limite: prev.limite + 6
    }));
  }

  controlarCambios = (event) => {
    this.setState({ input: event.target.value });
  }

  evitarSubmit = (event) => {
    event.preventDefault();
    if (this.state.input.trim() !== '') {
      this.props.history.push('/results/movie/' + this.state.input);
    }
  }

  render() {
    let peliculasFiltradas = this.state.input === '' 
      ? this.state.peliculas 
      : this.state.peliculas.filter(pelicula => 
          pelicula.title.toLowerCase().includes(this.state.input.toLowerCase())
        );

    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <main>
        <h1>Popular movies this week</h1>

        <form className="buscador" onSubmit={this.evitarSubmit}>
          <input 
            type='text' 
            placeholder="Buscar una película..." 
            onChange={this.controlarCambios} 
            value={this.state.input}
          />
          <input type="submit" value="Buscar"/>
        </form>

        <section className="card-container">
          {peliculasFiltradas.slice(0, this.state.limite).map(movie => (
            <Card 
              key={movie.id}
              id={movie.id}
              name={movie.title}
              img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              desc={movie.overview}
              link={`/detalle/pelicula/id/${movie.id}`}
            />
          ))}
        </section>
        
        {peliculasFiltradas.length > this.state.limite && (
          <button onClick={this.cargarMas} className="cargar-mas">
            Cargar más
          </button>
        )}
      </main>
    );
  }
}

export default Popular;
