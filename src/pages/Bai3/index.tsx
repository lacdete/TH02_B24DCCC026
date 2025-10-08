import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Bai3() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");

  const getMovies = (name: string) => {
    if (!name) return;
    axios
      .get(`https://www.omdbapi.com/?apikey=thewdb&s=${name}`)
      .then((res) => {
        if (res.data.Response === "True") setMovies(res.data.Search);
        else setMovies([]);
      })
      .catch(() => console.log("Lỗi tải phim"));
  };

  useEffect(() => {
    getMovies("batman");
  }, []);

  return (
    <div>
      <h2>Tìm kiếm phim</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nhập tên phim..."
      />
      <button onClick={() => getMovies(query)}>Tìm</button>

      {movies.map((m) => (
        <div key={m.imdbID}>
          <img
            src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/80"}
            alt={m.Title}
            width={80}
          />
          <p>{m.Title}</p>
          <p>{m.Year}</p>
          <Link to={`/bai3/${m.imdbID}`}>Chi tiết</Link>
          <hr />
        </div>
      ))}
    </div>
  );
}
