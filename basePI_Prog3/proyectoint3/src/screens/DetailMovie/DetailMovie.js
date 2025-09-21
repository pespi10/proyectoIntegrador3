import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU'
    }
};
class DetailMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pelis: null,
      cargandoPelis: true,
      error: null
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then(response => response.json())
      .then(data => this.setState({
        pelis: data,
        cargandoPelis: false
      }))
      .catch(error => {
        console.log('El error fue: ' + error)
        this.setState({ cargandoPelis: false, error: 'Pelicula no encontrada' })
    });    
  }

  render() {
    return (
      <React.Fragment>
        <section className="card-container">
        
          {this.state.cargandoPelis ? (
            <Loader />
          ) : this.state.pelis ? (
            <>
            <Card
              key={this.state.pelis.id}
              id={this.state.pelis.id}
              name={this.state.pelis.title}
              img={`https://image.tmdb.org/t/p/w500${this.state.pelis.poster_path}`}
              desc={this.state.pelis.overview}
              link={`/detalle/pelicula/id/${this.state.pelis.id}`} />
              
              <ul>
                <li>Clasificacion: {this.state.pelis.vote_average}</li>
                <li>Fecha de estreno: {this.state.pelis.release_date}</li>
                <li>Duracion: {this.state.pelis.runtime} minutos</li>
                <li>Generos: {this.state.pelis.genres && this.state.pelis.genres.map(g=> g.name).join(", ")}</li>
              </ul>
                
            
            </>
            
          ) : (
            <p>Pelicula no encontrada</p>
          )}
        </section>
      </React.Fragment>
    )
  }
}

export default DetailMovie;