import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Country {
  name: { common: string };
  flags: { png: string };
  population: number;
  region: string;
  cca3: string;
}

export default function Bai1() {
  const [data, setData] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3")
      .then((res) => setData(res.data))
      .catch(() => console.log("Lỗi khi tải dữ liệu"));
  }, []);

  const filtered = data.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Tra cứu quốc gia</h2>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm quốc gia..."
      />
      <div>
        {filtered.map((c) => (
          <div key={c.cca3}>
            <img src={c.flags.png} alt={c.name.common} width={80} />
            <p>{c.name.common}</p>
            <Link to={`/bai1/${c.cca3}`}>Chi tiết</Link>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
