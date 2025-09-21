import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU'
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
    const tipo = this.props.match.params.tipo;
    const input = this.props.match.params.query;    
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
      console.log(this.state.datos)


  }


  render() {
    return (
      <React.Fragment>
        <section className="card-container">
          {this.state.loading ? (
            <Loader />
          ) : (
            this.state.datos.map(movie => (
              <Card
                key={movie.id}
                id={movie.id}
                name={movie.title || movie.name}  
                img={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                desc={movie.overview}
                link={`/detalle/${this.props.match.params.tipo}/id/${movie.id}`}
              />
            ))
          )}
        </section>
      </React.Fragment>
    );
  }
}

export default SearchResults;
