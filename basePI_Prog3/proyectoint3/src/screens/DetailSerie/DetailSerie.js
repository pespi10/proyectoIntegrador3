import React, { Component } from "react";
import Card from "../../components/Card/Card";
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU'
    }
};
class DetailSerie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      series: null,
      cargandoSeries:true,
      error: null
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`https://api.themoviedb.org/3/tv/${id}`, options)      
      .then(response => response.json())
      .then(data => this.setState({
        series: data,
        cargandoSeries: false
      }))
      .catch(error => {
        console.log('El error fue: ' + error)
        this.setState({ cargandoSeries: false, error: 'Serie no encontrada' })
    })
  }

  render() {
    return (
      <React.Fragment>
        <section className="card-container">
        
         {this.state.cargandoSeries ? (
            <p>Cargando...</p>
          ) : this.state.series && this.state.series.id ? (
            <>
              <Card
                key={this.state.series.id}
                id={this.state.series.id}
                name={this.state.series.name}
                img={`https://image.tmdb.org/t/p/w500${this.state.series.poster_path}`}
                desc={this.state.series.overview}
                link={`/detalle/serie/id/${this.state.series.id}`} />
                
                <ul>
                  <li>Clasificacion: {this.state.series.vote_average}</li>
                  <li>Fecha de estreno: {this.state.series.first_air_date}</li>
                  <li>Generos: {this.state.series.genres && this.state.series.genres.map(g => g.name).join(", ")}</li>
                </ul>
              </>

          ) : (
            <p>Serie no encontrada</p>
          )}
        </section>
      </React.Fragment>
    )
  }
}

export default DetailSerie;