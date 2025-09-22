import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import './DetailCard.css'

class DetailCard extends Component {
  constructor (props){
    super(props)
    this.state={
    fav:false
    }
  }

  componentDidMount(){
    let type = this.props.link && this.props.link.includes("/detalle/serie/") ? "serie" : "movie";
    let favsString = localStorage.getItem('Favs');
    let favsArray = favsString ? JSON.parse(favsString) : [];
    let esFavorito = favsArray.some(fav => fav.id === this.props.id && fav.type === type);

    this.setState({
      fav: esFavorito
    });
  }

  agregarFavoritos(){
  let type = this.props.link && this.props.link.includes("/detalle/tv/") ? "tv" : "movie";
  let favsString = localStorage.getItem('Favs');
  let favsArray = favsString ? JSON.parse(favsString) : [];
  let esFavorito = favsArray.some(fav => fav.id === this.props.id && fav.type === type);

  if (!esFavorito) {
      favsArray.push({
        id: this.props.id,
        type: type,
        name: this.props.name,
        overview: this.props.desc,
        poster_path: this.props.img});
      localStorage.setItem('Favs', JSON.stringify(favsArray));
      this.setState({fav: true});
  } else {
      favsArray = favsArray.filter(fav => !(fav.id === this.props.id && fav.type === type));
      localStorage.setItem('Favs', JSON.stringify(favsArray));
      this.setState({ fav: false }, () => {
        if (this.props.sacarFav) {
        this.props.sacarFav(this.props.id, type);
    }});
  }
}

  render(){
    return (
        <article className='detail-card'>
            <div className="movie-image">
              <img src={this.props.img} alt=""/>
            </div>
          <div className="movie-content">
              <h2 className="movie-title">{this.props.name}</h2>
              <section className="movie-description">
                <p>{this.props.desc}</p>
              </section>
        
            <div className="extra-info">
              <h3>Información Adicional</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Clasificación:</strong> {this.props.Clasificación}
                </div>
                <div className="info-item">
                  <strong>Fecha de Estreno:</strong> {this.props.FechaEstreno}
                </div>
                <div className="info-item">
                  <strong>Duración:</strong> {this.props.Duración}
                </div>
                <div className="info-item">
                  <strong>Géneros:</strong> {this.props.Géneros}
                </div>
            </div>
          </div>
            </div>
        
        <button onClick={() => this.agregarFavoritos()} className="star">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
            fill={this.state.fav ? "gold" : "none"} 
            stroke={this.state.fav ? "gold" : "currentColor"} 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          {this.state.fav}
        </button>
        
        </article>
    );
  }
}

export default DetailCard;
