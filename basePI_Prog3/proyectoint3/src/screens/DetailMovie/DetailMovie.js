import React, { Component } from "react";
import DetailCard from "../../components/DetailCard/DetailCard";
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
      pelis: [],
      cargandoPelis: true,
      error: []
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
            <DetailCard
              key={this.state.pelis.id}
              id={this.state.pelis.id}
              name={this.state.pelis.title}
              img={`https://image.tmdb.org/t/p/w342${this.state.pelis.poster_path}`}
              desc={this.state.pelis.overview}
              link={`/detalle/movie/id/${this.state.pelis.id}`}
              extraInfo={[
                { nombre: "Clasificación", valor: `${this.state.pelis.vote_average}/10` },
                { nombre: "Fecha de estreno", valor: this.state.pelis.release_date },
                { nombre: "Duración", valor: `${this.state.pelis.runtime} minutos` },
                { nombre: "Géneros", valor: this.state.pelis.genres && this.state.pelis.genres.map(g => g.name).join(", ") }
              ]} />
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