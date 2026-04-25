import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

export default function App() {
  const [kg, setKg] = useState(92);
  const [data, setData] = useState([{ day: 1, kilo: 92 }]);

  const ekle = () => {
    setData([...data, { day: data.length + 1, kilo: Number(kg) }]);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>💪 Definasyon App</h1>
      <p>Hedef Kilo: 85 kg</p>

      <input
        type="number"
        value={kg}
        onChange={(e) => setKg(e.target.value)}
      />

      <button onClick={ekle} style={{ marginLeft: 10 }}>
        Kilo Ekle
      </button>

      <div style={{ width: "100%", height: 320, marginTop: 30 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis domain={[80, 95]} />
            <Tooltip />
            <Line type="monotone" dataKey="kilo" stroke="#2563eb" strokeWidth={3} />
            <ReferenceLine
              y={85}
              stroke="red"
              strokeDasharray="5 5"
              label="Hedef 85 kg"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
