import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './screens/Home/Home';
import Favorites from './screens/Favorites/Favorites';
import NowPlaying from './screens/NowPlaying/NowPlaying';
import Popular from './screens/Popular/Popular';
import Peliculas from './screens/Peliculas/Peliculas';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Series from './screens/Series/Series';



function App() {
  return (
    <React.Fragment>
      <Header/>
      
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/peliculas" component={Peliculas}/>
        <Route path="/series" exact={true} component={Series} />
        <Route path="/peliculas/nowplaying" exact={true} component={NowPlaying}/>
        <Route path="/peliculas/popular" exact={true} component={Popular}/>
        <Route path="/favoritos" exact={true} component={Favorites} />
        {/* <Route path="detalle/id/:id" /> */}
        <Route component={Error} />
      </Switch>
      
      <Footer/>
    </React.Fragment>
  );
}

export default App;




