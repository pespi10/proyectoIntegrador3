import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjQ4YmQ2OWRmY2EzOTBlYmRkNTNlOTczZGRhYWMzMiIsIm5iZiI6MTc1ODA1MTMzMi42MzYsInN1YiI6IjY4YzliYzA0MTM2YmMyMjlkMWRjZDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HgWZMujxiAIHAmksJ25td32MauANC1o3_q6e1DfvChU",
  },
};

class Favorites extends Component {
  state = {
    movies: [],
    series: [],
    loading: true,
  };

  componentDidMount() {
    let favs = JSON.parse(localStorage.getItem("Favs") || "[]");
    if (favs.length === 0) {this.setState({ loading: false });
      return;
    }

    let movies = [];
    let series = [];
 
  
   

    favs.map((f) => {
      let ruta = "movie";
      if (f.type !== "movie") 
        ruta = "tv";
      
    
      fetch(`https://api.themoviedb.org/3/${ruta}/${f.id}`, options)
        .then(response => response.json())
        .then((item) => {
          if (f.type === "movie") {
            movies.push(item);
            this.setState({ movies });
            this.setState({loading: false})
          } else {
            series.push(item);
            this.setState({ series });
            this.setState({loading: false})
          }
        })
        .catch(error => {
          console.log('El error fue: '+ error);
          this.setState({loading: false})
        })
  });
  }


  remove = (id, type) => {
    let favs = JSON.parse(localStorage.getItem("Favs") || "[]").filter(
      (x) => !(x.id === id && x.type === type)
    );
    localStorage.setItem("Favs", JSON.stringify(favs));

    if (type === "movie") {
      this.setState((prev) => ({ movies: prev.movies.filter((m) => m.id !== id) }));
    } else {
      this.setState((prev) => ({ series: prev.series.filter((s) => s.id !== id) }));
    }
  };

  render() {
    let { movies, series, loading } = this.state;
    if (loading) return <Loader />;
    return (
      <main>
        <h1>Favoritos</h1>

        <h2>Películas</h2>
        <section className="card-container">
          {movies.length === 0 ? (
            <p>No hay películas favoritas.</p>
          ) : (
            movies.map((m) => (
                <Card
                key={m.id}
                  id={m.id}
                  name={m.title}
                  img={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  desc={m.overview}
                  link={`/detalle/pelicula/id/${m.id}`}
                  onUnFavorite={this.remove}
                />
            ))
          )}
        </section>

        <h2>Series</h2>
        <section className="card-container">
          {series.length === 0 ? (
            <p>No hay series favoritas.</p>
          ) : (
            series.map((s) => (
                <Card
                key={s.id}
                  id={s.id}
                  name={s.name}
                  img={`https://image.tmdb.org/t/p/w500${s.poster_path}`}
                  desc={s.overview}
                  link={`/detalle/serie/id/${s.id}`}
                  onUnFavorite={this.remove}
                />
            ))
          )}
        </section>
      </main>
    );
  }
}

export default Favorites;


