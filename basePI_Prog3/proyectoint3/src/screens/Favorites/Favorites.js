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
    let movies = favs.filter((f) => f.type === "movie");
    let series = favs.filter((f) => f.type === "tv");

    this.setState({ movies, series, loading: false });
  }

  remove = (id, type) => {
    let favs = JSON.parse(localStorage.getItem("Favs") || "[]").filter(
      (x) => !(x.id === id && x.type === type)
    );
    localStorage.setItem("Favs", JSON.stringify(favs));

    if (type === "movie") {
      this.setState((p) => ({ movies: p.movies.filter((m) => m.id !== id) }));
    } else {
      this.setState((p) => ({ series: p.series.filter((s) => s.id !== id) }));
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    return (
      <main>
        <h1>Favoritos</h1>

        <h2>Películas</h2>
        <section className="card-container">
          {this.state.movies.length === 0 ? (
            <p>No hay películas favoritas.</p>
          ) : (
            this.state.movies.map((m) => (
                <Card
                key={m.id}
                  id={m.id}
                  name={m.name}
                  img={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                  desc={m.overview}
                  link={`/detalle/movie/id/${m.id}`}
                  sacarFav={this.remove}
                />
            ))
          )}
        </section>

        <h2>Series</h2>
        <section className="card-container">
          {this.state.series.length === 0 ? (
            <p>No hay series favoritas.</p>
          ) : (
            this.state.series.map((s) => (
                <Card
                key={s.id}
                  id={s.id}
                  name={s.name}
                  img={`https://image.tmdb.org/t/p/w342/${s.poster_path}`}
                  desc={s.overview}
                  link={`/detalle/tv/id/${s.id}`}
                  sacarFav={this.remove}
                />
            ))
          )}
        </section>
      </main>
    );
  }
}

export default Favorites;


