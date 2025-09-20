import React, { Component } from 'react';
import Card from '../../components/Card/Card';


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer TU_TOKEN_AQUI'
  }
};

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      loading: true
    };
  }

  componentDidMount() {
    let tipo = this.props.match.params.tipo;
    let input = this.props.match.params.input;

    fetch(`https://api.themoviedb.org/3/search/${tipo}?language=en-US&page=1&query=${input}`, options)
      .then(response => response.json())
      .then(data => this.setState({
        datos: data.results,
        loading: false
      }))
      .catch(error => {
        console.log('El error fue: ' + error);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <React.Fragment>
        <section className="card-container">
          {this.state.loading ? (
            <p>Cargando...</p>
          ) : (
            this.state.datos.map(movie => (
              <Card
                key={movie.id}
                id={movie.id}
                name={movie.title || movie.name}  
                img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                desc={movie.overview}
                link={`/${this.props.match.params.tipo}/detalle/${movie.id}`}
              />
            ))
          )}
        </section>
      </React.Fragment>
    );
  }
}

export default SearchResults;
