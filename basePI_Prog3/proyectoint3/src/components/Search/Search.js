import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Search extends Component {
  constructor (props){
    super(props)
    this.state={
    name:''
    }

  }

controlarCambios = (event) => {
    this.setState({name: event.target.value})
}
evitarSubmit = (event)=>{
  event.preventDefault();
  if (this.state.name.trim() !== '') {
    this.props.history.push('/busqueda/' + this.state.name);
  }

}

render (){
    return(
        
        <form className="buscador" onSubmit={this.evitarSubmit}>
          <input type='text' placeholder="Buscar un personaje..." onChange={this.controlarCambios} value={this.state.name}></input>
          <input type="submit" value="Buscar"/>
        </form>    
        )
}}

export default withRouter(Search)
