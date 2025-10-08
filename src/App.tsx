import { Routes, Route, Link } from "react-router-dom";
import Bai1 from "./pages/Bai1";
import CountryDetailPage from "./pages/Bai1/CountryDetail";
import Bai2 from "./pages/Bai2";
import Bai3 from "./pages/Bai3";
import MovieDetailPage from "./pages/Bai3/MovieDetail";

export default function App() {
  return (
    <div>
      <h1>Thực hành </h1>
      <nav>
        <Link to="/bai1">Bài 1</Link> |{" "}
        <Link to="/bai2">Bài 2</Link> |{" "}
        <Link to="/bai3">Bài 3</Link>
      </nav>
      <hr />

      <Routes>
        <Route path="/bai1" element={<Bai1 />} />
        <Route path="/bai1/:code" element={<CountryDetailPage />} />
        <Route path="/bai2" element={<Bai2 />} />
        <Route path="/bai3" element={<Bai3 />} />
        <Route path="/bai3/:imdbID" element={<MovieDetailPage />} />
      </Routes>
    </div>
  );
}
