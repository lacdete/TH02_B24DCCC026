import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Country {
  name: { common: string; official: string };
  flags: { png: string };
  population: number;
  region: string;
  capital?: string[];
}

export default function CountryDetailPage() {
  const { code } = useParams();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (!code) return;
    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => setCountry(res.data[0]))
      .catch(() => console.log("Lỗi tải chi tiết"));
  }, [code]);

  if (!country) return <p>Đang tải...</p>;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={country.name.common} width={150} />
      <p>Tên chính thức: {country.name.official}</p>
      <p>Khu vực: {country.region}</p>
      <p>Dân số: {country.population}</p>
      <p>Thủ đô: {country.capital ? country.capital.join(", ") : "Không có"}</p>
      <Link to="/bai1">Quay lại</Link>
    </div>
  );
}
