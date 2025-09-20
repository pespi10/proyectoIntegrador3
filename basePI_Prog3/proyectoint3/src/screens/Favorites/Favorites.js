import React, { Component } from "react";
import Card from "../../components/Card/Card";

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
    
  };

  componentDidMount() {
    let favs = JSON.parse(localStorage.getItem("Favs") || "[]");
    if (favs.length === 0) {
      this.setState();
      return;
    }

    let movies = [];
    let series = [];
    

    favs.map((f) =>
      fetch(`https://api.themoviedb.org/3/${f.type === "movie" ? "movie" : "tv"}/${f.id}`, options)
        .then(response => response.json())
        .then((item) => {
          if (!item || !item.id) return;
          if (f.type === "movie") {
            movies.push(item);
            this.setState({ movies });
          } else {
            series.push(item);
            this.setState({ series });
          }
        })
        .catch(error => console.log('El error fue: '+ error))
        
    );
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
    let { movies, series } = this.state;
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


