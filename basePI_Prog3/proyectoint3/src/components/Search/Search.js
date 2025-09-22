import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Search extends Component {
  constructor (props){
    super(props)
    this.state={
    name:'',
    tipo: "movie"
    }

  }

controlarCambios(event){
    this.setState({name: event.target.value})}

controlarTipo(event){
    this.setState({ tipo: event.target.value });
  }


 evitarSubmit(event){
    event.preventDefault();
    if (this.state.name.trim() !== "") {
      this.props.history.push(
        '/results/' + this.state.tipo + '/' + (this.state.name)
      );
    }
  }

render (){
    return(
        
        <form className="buscador" onSubmit={this.evitarSubmit}>

          
        <select value={this.state.tipo} onChange={this.controlarTipo}>
          <option value="movie">Películas</option>
          <option value="tv">Series</option>
        </select>


          <input type='text' placeholder="Buscar una pelicula o serie..." onChange={this.controlarCambios} value={this.state.name}></input>
          <input type="submit" value="Buscar"/>
        </form>    
        )
}}

export default withRouter(Search)
