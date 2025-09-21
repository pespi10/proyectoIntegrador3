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

class AiringToday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      limite: 6,
      input: '',
      loading: true
    };
  }

  componentDidMount() {
    this.cargarSeries();
  }

  cargarSeries = () => {
    fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          series: data.results,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error al cargar series:', error);
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
      this.props.history.push('/results/tv/' + this.state.input);
    }
  }

  render() {
    let seriesFiltradas = this.state.input === '' 
      ? this.state.series 
      : this.state.series.filter(serie => 
          serie.name.toLowerCase().includes(this.state.input.toLowerCase())
        );

    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <main>
        <h1>TV Series airing today</h1>

        <form className="buscador" onSubmit={this.evitarSubmit}>
          <input 
            type='text' 
            placeholder="Buscar una serie..." 
            onChange={this.controlarCambios} 
            value={this.state.input}
          />
          <input type="submit" value="Buscar"/>
        </form>

        <section className="card-container">
          {seriesFiltradas.slice(0, this.state.limite).map(serie => (
            <Card 
              key={serie.id}
              id={serie.id}
              name={serie.name}
              img={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              desc={serie.overview}
              link={`/detalle/serie/id/${serie.id}`}
            />
          ))}
        </section>
        
        {seriesFiltradas.length > this.state.limite && (
          <button onClick={this.cargarMas} className="cargar-mas">
            Cargar más
          </button>
        )}
      </main>
    );
  }
}

export default AiringToday;
