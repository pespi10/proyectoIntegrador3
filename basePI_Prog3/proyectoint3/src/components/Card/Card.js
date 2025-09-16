import { Link } from "react-router-dom/cjs/react-router-dom";
import React, { Component } from "react";
import './card.css'


class MovieCard extends Component {
  constructor (props){
    super(props)
    this.state={
    vermas:false,
    fav:false,
    textoboton:"Ver descipción",
    }

  }

boton(){
    if (this.state.vermas===false){
      this.setState({
        vermas:true,
        textoboton:"Ocultar descripción"
      });
    }
    else{
      this.setState({
        vermas:false,
        textoboton:"Ver descripción"
      });

    }
}
componentDidMount(){
  let favsString = localStorage.getItem('Favs');
  let favsArray = favsString ? JSON.parse(favsString) : [];
  let esFavorito = favsArray.some(fav => fav.id === this.props.id);

  this.setState({
    fav: esFavorito
  });
}
agregarFavoritos = () => {
  let favsString = localStorage.getItem('Favs');
  let favsArray = favsString ? JSON.parse(favsString) : [];

  if (this.state.fav === false) {
    if (!favsArray.find(fav => fav.id === this.props.id)) {
      favsArray.push(this.props);
      localStorage.setItem('Favs', JSON.stringify(favsArray));
    }
    
    this.setState({
      fav: true
    });
  } else {
    favsArray = favsArray.filter(fav => fav.id !== this.props.id);
    localStorage.setItem('Favs', JSON.stringify(favsArray));
  
    this.setState({
      fav: false
    });
  }
  console.log(favsArray);
  
}
render(){
    return (
        <article className='movie-card'>
          <div className="movie-image">
          <img src={this.props.img} alt=""/>
          </div>
          <div className="movie-content">
        <h2 className="movie-title">{this.props.name}</h2>
        <button onClick={ ()=> this.boton() } className='more'> {this.state.textoboton} </button> 
        {this.state.vermas===true ? <section className="movie-description"><p>{this.props.desc}</p></section> : ""}
        <Link to={this.props.link} className='delete'>Ir a Detalle</Link>
        <button onClick={() => this.agregarFavoritos()} className="star">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
            fill={this.state.fav ? "gold" : "none"} 
            stroke={this.state.fav ? "gold" : "currentColor"} 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
        </div>
        </article>
    );
}}

export default MovieCard;

