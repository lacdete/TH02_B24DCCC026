import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Movie {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Plot: string;
  Poster: string;
}

export default function MovieDetailPage() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!imdbID) return;
    axios
      .get(`https://www.omdbapi.com/?apikey=thewdb&i=${imdbID}&plot=full`)
      .then((res) => {
        if (res.data.Response === "True") setMovie(res.data);
      })
      .catch(() => console.log("Lỗi tải chi tiết phim"));
  }, [imdbID]);

  if (!movie) return <p>Đang tải...</p>;

  return (
    <div>
      <h2>{movie.Title}</h2>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100"}
        alt={movie.Title}
        width={150}
      />
      <p>Năm: {movie.Year}</p>
      <p>Thể loại: {movie.Genre}</p>
      <p>Đạo diễn: {movie.Director}</p>
      <p>{movie.Plot}</p>
      <Link to="/bai3">Quay lại</Link>
    </div>
  );
}
