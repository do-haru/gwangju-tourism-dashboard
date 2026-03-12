import "./Chart3.css";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Chart3 = () => {
  const [rawData, setRawData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [chartData, setChartData] = useState([]);

  const serviceKey =
    "11d2d450fb2f979bfed1f79e7ad67305fde4391088eb536fe233524be8220191";

  const parseNumber = (value) => Number((value || "0").replace(/,/g, ""));

  useEffect(() => {
    fetch(
      `https://api.odcloud.kr/api/15098091/v1/uddi:d33bd433-54c1-4a2e-a37c-836554d8c3be?page=1&perPage=500&serviceKey=${serviceKey}`,
    )
      .then((res) => res.json())
      .then((result) => {
        setRawData(result.data);

        if (result.data.length > 0) {
          setSelectedRegion(result.data[0].방문지역);
        }
      });
  }, []);

  useEffect(() => {
    const regionData = rawData.find((item) => item.방문지역 === selectedRegion);

    if (!regionData) return;

    const data = [
      {
        year: "2016",
        visitors: parseNumber(regionData["2016년"]),
      },
      {
        year: "2017",
        visitors: parseNumber(regionData["2017년"]),
      },
      {
        year: "2018",
        visitors: parseNumber(regionData["2018년"]),
      },
      {
        year: "2019",
        visitors: parseNumber(regionData["2019년"]),
      },
      {
        year: "2020",
        visitors: parseNumber(regionData["2020년"]),
      },
    ];

    setChartData(data);
  }, [selectedRegion, rawData]);

  return (
    <div>
      <h2>지역별 방문자 변화</h2>

      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        {rawData.map((item) => (
          <option key={item.방문지역} value={item.방문지역}>
            {item.방문지역}
          </option>
        ))}
      </select>

      <LineChart width={400} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line
          type="linear"
          dataKey="visitors"
          stroke="#ff7300"
          strokeWidth={3}
        />
      </LineChart>
    </div>
  );
};

export default Chart3;
