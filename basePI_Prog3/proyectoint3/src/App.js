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
import AiringToday from './screens/AiringToday/AiringToday'
import TopRated from './screens/TopRated/TopRated'
import SearchResults from './screens/SearchResults/SearchResults'
import DetailMovie from './screens/DetailMovie/DetailMovie';
import DetailSerie from './screens/DetailSerie/DetailSerie';
import Error from './screens/Error/Error';

function App() {
  return (
    <React.Fragment>
      <Header/>
      
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/peliculas" component={Peliculas}/>
        <Route path="/peliculas/nowplaying" exact={true} component={NowPlaying}/>
        <Route path="/peliculas/popular" exact={true} component={Popular}/>
        <Route path="/detalle/pelicula/id/:id" component={DetailMovie}/>
        <Route path="/series" exact={true} component={Series} />
        <Route path="/series/airing" exact={true} component={AiringToday}/>
        <Route path="/series/toprated" exact={true} component={TopRated}/>
        <Route path="/detalle/serie/id/:id" component={DetailSerie}/>
        <Route path="/favoritos" exact={true} component={Favorites} />
        <Route path="/results/:tipo/:query" component={SearchResults} />
        <Route component={Error} />
      </Switch>
      
      <Footer/>
    </React.Fragment>
  );
}

export default App;




