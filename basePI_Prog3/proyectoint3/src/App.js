import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './screens/Home/Home';
import Favorites from './screens/Favorites/Favorites';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';



function App() {
  return (
    <React.Fragment>
      <Header/>
      
      <Switch>
        <Route path="/" exact={true} component={Home} />
        {/* <Route path="/peliculas" component={Peliculas}/>
        <Route path="/series" exact={true} component={Series} />
        <Route path="/favoritos" exact={true} component={Favorites} /> */}
        <Route component={Error} />
      </Switch>
      
      <Footer/>
    </React.Fragment>
  );
}

export default App;




