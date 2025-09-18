import AllMovies from '../../components/AllMovies/AllMovies';
import Card from '../../components/Card/Card';
import React, { Component } from 'react';


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU'
    }
  };

  class Peliculas extends Component {

    constructor(props) {
    super(props);
    this.state = {
      peliculasTodas: [],
      limite: 6
    };

  }

  componentDidMount(){
    this.peliculasTotal()
  }

  peliculasTotal = () => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculasTodas: data.results
        });
      })
      .catch(error => {
        console.log('Error al cargar películas en cartel:', error)
      });
  }

  cargarMas= () => {

    this.setState(prev=>({
      limite: prev.limite + 6
    }))


  }

   controlarCambios = (event) => {
    this.setState({input: event.target.value}, ()=>console.log(this.state.input))
  }
  evitarSubmit(event){
  event.preventDefault();
  if (this.state.input.trim() !== '') {
    this.props.history.push('/busqueda/' + this.state.input);
  }

  }

  render(){
     let peliculasBusqueda = this.state.input === '' ? this.state.datos : this.state.datos.filter(personaje => personaje.name.toLowerCase().includes(this.state.input.toLocaleLowerCase()))
    return(
        <React.Fragment>
        <form className="buscador" onSubmit={(event)=>this.evitarSubmit(event)}>
          <input type='text' placeholder="Buscar un personaje..." onChange={(event)=>this.controlarCambios(event)} value={this.state.input}></input>
          <input type="submit" value="Buscar"/>
        </form>


  <main>
    <h2>Movies</h2>

    <section className="card-container">
                {this.state.peliculasTodas.slice(0, this.state.limite).map(movie => (
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
              <button onClick={() => this.cargarMas()}>Cargar más</button>
              </main>
             
</React.Fragment>
  )}


}

  
  export default Peliculas;