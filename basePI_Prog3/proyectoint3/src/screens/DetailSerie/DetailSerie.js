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
      series:[],
      cargandoSeries:true
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
        this.setState({ cargandoSeries: false })
    })
  }

  render() {
    return (
      <React.Fragment>
        <section className="card-container">
        
          {this.state.cargandoSeries ? (
            <p>Cargando...</p>
          ) : this.state.series.length > 0 ? (
            <Card 
            key={this.state.series.id}
            id={this.state.series.id}
            name={this.state.series.name}
            img={`https://image.tmdb.org/t/p/w500${this.state.series.poster_path}`}
            desc={this.state.series.overview}
            link={`/peliculas/detalle/${this.state.series.id}`}
            />
          ) : (
            <p>Serie no encontrada</p>
          )}
        </section>
      </React.Fragment>
    )
  }
}

export default DetailSerie;