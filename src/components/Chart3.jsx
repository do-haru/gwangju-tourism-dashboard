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
  const [chartData, setChartData] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("전체");
  const [selectedRegion, setSelectedRegion] = useState("전체");

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
      });
  }, []);

  // 자치구에 따라 관광지 목록 생성
  const regionList = [
    "전체",
    ...rawData
      .filter((item) =>
        selectedDistrict === "전체" ? true : item.자치구 === selectedDistrict,
      )
      .map((item) => item.방문지역),
  ];

  // 그래프 데이터 생성
  useEffect(() => {
    if (rawData.length === 0) return;

    // 전체 선택
    if (selectedRegion === "전체") {
      const filtered = rawData.filter((item) =>
        selectedDistrict === "전체" ? true : item.자치구 === selectedDistrict,
      );

      const data = [
        {
          year: "2016",
          visitors: filtered.reduce(
            (sum, item) => sum + parseNumber(item["2016년"]),
            0,
          ),
        },
        {
          year: "2017",
          visitors: filtered.reduce(
            (sum, item) => sum + parseNumber(item["2017년"]),
            0,
          ),
        },
        {
          year: "2018",
          visitors: filtered.reduce(
            (sum, item) => sum + parseNumber(item["2018년"]),
            0,
          ),
        },
        {
          year: "2019",
          visitors: filtered.reduce(
            (sum, item) => sum + parseNumber(item["2019년"]),
            0,
          ),
        },
        {
          year: "2020",
          visitors: filtered.reduce(
            (sum, item) => sum + parseNumber(item["2020년"]),
            0,
          ),
        },
      ];

      setChartData(data);
      return;
    }

    // 특정 관광지 선택
    const regionData = rawData.find((item) => item.방문지역 === selectedRegion);

    if (!regionData) return;

    const data = [
      { year: "2016", visitors: parseNumber(regionData["2016년"]) },
      { year: "2017", visitors: parseNumber(regionData["2017년"]) },
      { year: "2018", visitors: parseNumber(regionData["2018년"]) },
      { year: "2019", visitors: parseNumber(regionData["2019년"]) },
      { year: "2020", visitors: parseNumber(regionData["2020년"]) },
    ];

    setChartData(data);
  }, [selectedRegion, selectedDistrict, rawData]);

  return (
    <div className="chart3-container">
      <h2>지역별 방문자 변화</h2>

      <div className="filter-container">
        <div className="filter-group">
          <label>자치구</label>
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedRegion("전체");
            }}
          >
            <option value="전체">전체</option>
            <option value="동구">동구</option>
            <option value="서구">서구</option>
            <option value="남구">남구</option>
            <option value="북구">북구</option>
            <option value="광산구">광산구</option>
          </select>
        </div>

        <div className="filter-group">
          <label>방문지역</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regionList.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <LineChart width={500} height={350} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="year" />

        <YAxis tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`} />

        <Tooltip formatter={(value) => `${value.toLocaleString()}명`} />

        <Line
          type="linear"
          dataKey="visitors"
          stroke="#ff7300"
          strokeWidth={3}
          dot={{ r: 5 }}
        />
      </LineChart>
    </div>
  );
};

export default Chart3;
