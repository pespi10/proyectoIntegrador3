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
      limite: 4,
      input:'',
      topRatedTodas: [],
      limiteTopRated: 4,
      inputTopRated: '',
      seriesBuscador:[]
    };

  }

  componentDidMount(){
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

  fetch('https://api.themoviedb.org/3/tv/top_rated', options)
    .then(response => response.json())
    .then(data => {
      this.setState({
        topRatedTodas: data.results
      });
    })
    .catch(error => {
      console.log('Error al cargar películas en cartel:', error)
    });
   
  }

  

  cargarMas(){

    this.setState(mas=>({
      limite: mas.limite + 4
    }))


  }

  cargarMasTopRated(){
    this.setState(mas => ({
      limiteTopRated: mas.limiteTopRated + 4
    }));
  }

   controlarCambios(event){
    this.setState({input: event.target.value}, ()=>console.log(this.state.input))
  }
  evitarSubmit(event){
  event.preventDefault();
  if (this.state.input !== '') {
    this.props.history.push('/busqueda/' + this.state.input);
  }

  }


  controlarCambiosTopRated(event){
    this.setState({inputTopRated: event.target.value}, ()=>console.log(this.state.inputTopRated))
  }
  evitarSubmitPop(event){
  event.preventDefault();
  if (this.state.inputTopRated !== '') {
    this.props.history.push('/busqueda/' + this.state.inputTopRated);
  }

  }

  render(){
     let seriesBusqueda = this.state.input === '' ? this.state.seriesTodas : this.state.seriesTodas.filter(pelicula => pelicula.name.toLowerCase().includes(this.state.input.toLowerCase()))
    let seriesBusquedatopRated = this.state.input === '' ? this.state.topRatedTodas : this.state.topRatedTodas.filter(pelicula => pelicula.name.toLowerCase().includes(this.state.input.toLowerCase()))
     return(
        <React.Fragment>
        


  <main>
    <h2>Series Airing Today</h2>

    <form className="buscador" onSubmit={(event)=>this.evitarSubmit(event)}>
          <input type='text' placeholder="Buscar una pelicula..." onChange={(event)=>this.controlarCambios(event)} value={this.state.input}></input>
          <input type="submit" value="Buscar"/>
        </form>

    <section className="card-container">
                {seriesBusqueda.filter((item,index)=> index < this.state.limite).map(movie => (
                  <Card 
                    key={movie.id}
                    id={movie.id}
                    name={movie.name}
                    img={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    desc={movie.overview}
                    link={`/detalle/tv/id/${movie.id}`}
                  />
                ))}
              </section>
              <button onClick={() => this.cargarMas()}>Cargar más</button>

     <h2>Series Top Rated</h2>

    

     <section className="card-container">
                {seriesBusquedatopRated.filter((item,index)=> index < this.state.limite).map(movie => (
                  <Card 
                    key={movie.id}
                    id={movie.id}
                    name={movie.name}
                    img={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    desc={movie.overview}
                    link={`/detalle/tv/id/${movie.id}`}
                  />
                ))}
              </section>
              <button onClick={() => this.cargarMasTopRated()}>Cargar más</button>

              </main>
             
</React.Fragment>
  )}


}

  
  export default Series;