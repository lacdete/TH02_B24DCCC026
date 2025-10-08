import { useEffect, useState } from "react";
import axios from "axios";

export default function Bai2() {
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("VND");
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://open.er-api.com/v6/latest/${base}`)
      .then((res) => {
        if (res.data && res.data.rates) {
          setRate(res.data.rates[target]);
          setError("");
        } else {
          setError("Không lấy được dữ liệu.");
        }
      })
      .catch(() => setError("Lỗi khi tải dữ liệu."));
  }, [base, target]);

  const handleConvert = () => {
    if (!rate) {
      setError("Không có tỷ giá cho đơn vị này.");
      return;
    }
    setError("");
  };

  const list = ["USD", "VND", "EUR", "JPY", "GBP", "AUD"];

  return (
    <div style={{ padding: 20 }}>
      <h3>Quy đổi tiền tệ</h3>

      <div>
        <label>Đơn vị gốc: </label>
        <select value={base} onChange={(e) => setBase(e.target.value)}>
          {list.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label style={{ marginLeft: 10 }}>Đơn vị đích: </label>
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          {list.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label style={{ marginLeft: 10 }}>Số tiền: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          style={{ width: 80 }}
        />

        <button onClick={handleConvert} style={{ marginLeft: 8 }}>
          Quy đổi
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {rate && !error && (
        <p style={{ marginTop: 10 }}>
          {amount} {base} = {(amount * rate).toFixed(2)} {target}
        </p>
      )}
    </div>
  );
}
