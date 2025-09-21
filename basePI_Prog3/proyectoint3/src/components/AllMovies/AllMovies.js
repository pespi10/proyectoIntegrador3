import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import './allmovies.css'

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU'
    }
};
class AllMovies extends Component {
  constructor (props){
    super(props)
    this.state={
    datos: [],
    }

  }
componentDidMount (){
    fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US', options)
      .then(response => response.json())
      .then(data => this.setState({
        datos: data.results
        }))

      .catch(error => console.log('El error fue: '+ error))
  }

cargarMas(){
    fetch(this.state.next)
    .then(response => response.json())
    .then(data => this.setState({datos: this.state.datos.concat(data.results),next: data.info.next}))
    .catch(error => console.log('El error fue: '+ error))

  }

render (){
    console.log(this.props.datos)
    return(
        <React.Fragment>
        <section className="card-container">
        
        {this.state.datos.length === 0 ? < Loader/> :
        this.state.datos.map(card => (
          <Card 
            key={card.id}
            id={card.id}
            name={card.title}
            img={'https://image.tmdb.org/t/p/w500'+ card.backdrop_path}
            desc={card.overview}
            link={'/detalle/pelicula/id/'+card.id}
          />
        ))}    
        
        
      </section>
      <button className='extra' onClick={()=>this.cargarMas()}>Cargar más</button>
      
       
      </React.Fragment>
    )
}}

export default withRouter(AllMovies)
