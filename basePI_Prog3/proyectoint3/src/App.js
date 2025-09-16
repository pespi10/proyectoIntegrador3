import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './screens/Home/Home';

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/peliculas"/>
        <Route path="/series" exact={true} component={Personajes} />
        <Route path="/favoritos" exact={true} component={PersonajesRick} />
        <Route component={Error} />
      </Switch>
      
      <Footer/>
    </React.Fragment>
  );
}

export default App;




