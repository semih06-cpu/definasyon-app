import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const plan = {
  "Pazartesi": {
    sabah: "Cream of rice pankek (40g cream of rice + 2 yumurta + 100ml süt)",
    ogle: "200g tavuk + 150g pişmiş pirinç",
    ara: "200g yoğurt",
    aksam: "200g tavuk + 100g pirinç"
  },
  "Salı": {
    sabah: "3 yumurta + 20g yulaf + 30g peynir",
    ogle: "200g tavuk + 150g pirinç",
    ara: "300ml ayran + 1 meyve",
    aksam: "120g ton balığı + 100g pirinç"
  },
  "Çarşamba": {
    sabah: "Cream of rice pankek",
    ogle: "220g tavuk + 150g pirinç",
    ara: "250ml süt + muz",
    aksam: "200g hindi + 100g pirinç + yoğurt"
  },
  "Perşembe": {
    sabah: "3 yumurta + peynir",
    ogle: "200g tavuk + 150g pirinç",
    ara: "ayran",
    aksam: "ton balığı + yoğurt + salata"
  },
  "Cuma": {
    sabah: "Cream of rice pankek",
    ogle: "200g tavuk + 150g pirinç",
    ara: "yoğurt",
    aksam: "200g tavuk + 100g pirinç"
  },
  "Cumartesi": {
    sabah: "3 yumurta",
    ogle: "200g tavuk + 120g pirinç",
    ara: "ayran",
    aksam: "180g somon + salata + yoğurt"
  },
  "Pazar": {
    sabah: "yumurta + yoğurt",
    ogle: "serbest öğün",
    ara: "hafif",
    aksam: "200g tavuk + yoğurt"
  }
};

const calories = {
  chicken: 1.65,
  rice: 1.3,
  egg: 70,
  oats: 3.8,
  milk: 0.5,
  yogurt: 0.6,
  tuna: 1.16,
  salmon: 2.08
};

const TARGET_WEIGHT = 85;

export default function DefinasyonApp() {
  const [day, setDay] = useState("Pazartesi");

  const [chicken, setChicken] = useState(0);
  const [rice, setRice] = useState(0);
  const [eggs, setEggs] = useState(0);
  const [oats, setOats] = useState(0);
  const [milk, setMilk] = useState(0);
  const [yogurt, setYogurt] = useState(0);
  const [tuna, setTuna] = useState(0);
  const [salmon, setSalmon] = useState(0);

  const [weight, setWeight] = useState(92);
  const [weightLog, setWeightLog] = useState([{ day: 1, kg: 92 }]);

  const addWeight = () => {
    setWeightLog([...weightLog, { day: weightLog.length + 1, kg: weight }]);
  };

  const totalCalories =
    chicken * calories.chicken +
    rice * calories.rice +
    eggs * calories.egg +
    oats * calories.oats +
    milk * calories.milk +
    yogurt * calories.yogurt +
    tuna * calories.tuna +
    salmon * calories.salmon;

  return (
    <div className="p-4 max-w-xl mx-auto font-sans">
      <h1 className="text-xl font-bold mb-4">Definasyon App</h1>

      <select className="w-full p-2 border rounded" value={day} onChange={(e)=>setDay(e.target.value)}>
        {Object.keys(plan).map(d => <option key={d}>{d}</option>)}
      </select>

      <div className="mt-4 space-y-3">
        <div className="p-3 border"><strong>Sabah:</strong> {plan[day].sabah}</div>
        <div className="p-3 border"><strong>Öğle:</strong> {plan[day].ogle}</div>
        <div className="p-3 border"><strong>Ara:</strong> {plan[day].ara}</div>
        <div className="p-3 border"><strong>Akşam:</strong> {plan[day].aksam}</div>
      </div>

      <hr className="my-6" />

      <h2 className="text-lg font-bold">Kalori Hesaplayıcı</h2>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <input placeholder="Tavuk (g)" type="number" onChange={(e)=>setChicken(+e.target.value)} className="border p-1" />
        <input placeholder="Pirinç (g)" type="number" onChange={(e)=>setRice(+e.target.value)} className="border p-1" />
        <input placeholder="Yumurta" type="number" onChange={(e)=>setEggs(+e.target.value)} className="border p-1" />
        <input placeholder="Yulaf (g)" type="number" onChange={(e)=>setOats(+e.target.value)} className="border p-1" />
        <input placeholder="Süt" type="number" onChange={(e)=>setMilk(+e.target.value)} className="border p-1" />
        <input placeholder="Yoğurt" type="number" onChange={(e)=>setYogurt(+e.target.value)} className="border p-1" />
        <input placeholder="Ton balığı" type="number" onChange={(e)=>setTuna(+e.target.value)} className="border p-1" />
        <input placeholder="Somon" type="number" onChange={(e)=>setSalmon(+e.target.value)} className="border p-1" />
      </div>

      <div className="mt-3 p-3 border bg-gray-100">
        Toplam Kalori: {Math.round(totalCalories)} kcal
      </div>

      <hr className="my-6" />

      <h2 className="text-lg font-bold">Kilo Takibi</h2>

      <div className="flex gap-2 mt-2">
        <input
          type="number"
          value={weight}
          onChange={(e)=>setWeight(+e.target.value)}
          className="border p-1 w-full"
          placeholder="Kilo (kg)"
        />
        <button onClick={addWeight} className="border px-3">
          Ekle
        </button>
      </div>

      <div className="mt-4" style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={weightLog}>
            <XAxis dataKey="day" />
            <YAxis domain={[80, 95]} />
            <Tooltip />

            {/* Actual weight line */}
            <Line type="monotone" dataKey="kg" stroke="#8884d8" />

            {/* Target weight line */}
            <ReferenceLine y={TARGET_WEIGHT} stroke="red" strokeDasharray="5 5" label="Hedef 85 kg" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
