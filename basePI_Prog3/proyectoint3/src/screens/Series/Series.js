import Card from '../../components/Card/Card';
import React, { Component } from 'react';


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU'
    }
  };

  class Series extends Component {

    constructor(props) {
    super(props);
    this.state = {
      seriesTodas: [],
      limite: 6,
      input:'',
      popularesTodas: [],
      limitePopular: 6,
      inputPopular: '',
      seriesBuscador:[]
    };

  }

  componentDidMount(){
    this.seriesTotal();
    this.seriesPopulares()
  }

  seriesTotal = () => {
    fetch('https://api.themoviedb.org/3/tv/airing_today', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          seriesTodas: data.results
        });
      })
      .catch(error => {
        console.log('Error al cargar películas en cartel:', error)
      });
  }
  seriesPopulares = () => {
    fetch('https://api.themoviedb.org/3/tv/popular', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          popularesTodas: data.results
        });
      })
      .catch(error => {
        console.log('Error al cargar películas en cartel:', error)
      });
  }

  cargarMas= () => {

    this.setState(mas=>({
      limite: mas.limite + 6
    }))


  }

  cargarMasPopular = () => {
    this.setState(mas => ({
      limitePopular: mas.limitePopular + 6
    }));
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


  controlarCambiosPopular = (event) => {
    this.setState({inputPopular: event.target.value}, ()=>console.log(this.state.inputPopular))
  }
  evitarSubmitPop(event){
  event.preventDefault();
  if (this.state.inputPopular.trim() !== '') {
    this.props.history.push('/busqueda/' + this.state.inputPopular);
  }

  }

  render(){
     let seriesBusqueda = this.state.input === '' ? this.state.seriesTodas : this.state.seriesTodas.filter(pelicula => pelicula.name.toLowerCase().includes(this.state.input.toLowerCase()))
    let seriesBusquedaPopular = this.state.input === '' ? this.state.popularesTodas : this.state.popularesTodas.filter(pelicula => pelicula.name.toLowerCase().includes(this.state.input.toLowerCase()))
     return(
        <React.Fragment>
        


  <main>
    <h2>Series airing today</h2>

    <form className="buscador" onSubmit={(event)=>this.evitarSubmit(event)}>
          <input type='text' placeholder="Buscar una pelicula..." onChange={(event)=>this.controlarCambios(event)} value={this.state.input}></input>
          <input type="submit" value="Buscar"/>
        </form>

    <section className="card-container">
                {seriesBusqueda.slice(0, this.state.limite).map(movie => (
                  <Card 
                    key={movie.id}
                    id={movie.id}
                    name={movie.name}
                    img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    desc={movie.overview}
                    link={`/detalle/serie/id/${movie.id}`}
                  />
                ))}
              </section>
              <button onClick={() => this.cargarMas()}>Cargar más</button>

     <h2>Series most popular</h2>

    

     <section className="card-container">
                {seriesBusquedaPopular.slice(0, this.state.limitePopular).map(movie => (
                  <Card 
                    key={movie.id}
                    id={movie.id}
                    name={movie.name}
                    img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    desc={movie.overview}
                    link={`/detalle/serie/id/${movie.id}`}
                  />
                ))}
              </section>
              <button onClick={() => this.cargarMasPopular()}>Cargar más</button>

              </main>
             
</React.Fragment>
  )}


}

  
  export default Series;