import "./Chart2.css";
import { useEffect, useState } from "react";

const Chart2 = () => {
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("전체");
  const [selectedYear, setSelectedYear] = useState("전체");

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

  useEffect(() => {
    if (rawData.length === 0) return;

    const processed = rawData
      .map((item) => {
        let visitors = 0;

        if (selectedYear === "전체") {
          visitors =
            parseNumber(item["2016년"]) +
            parseNumber(item["2017년"]) +
            parseNumber(item["2018년"]) +
            parseNumber(item["2019년"]) +
            parseNumber(item["2020년"]);
        } else {
          visitors = parseNumber(item[`${selectedYear}년`]);
        }

        return {
          region: item.방문지역,
          district: item.자치구 || "기타",
          visitors: visitors,
        };
      })
      .filter((item) =>
        selectedDistrict === "전체" ? true : item.district === selectedDistrict,
      )
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 5);

    setData(processed);
  }, [rawData, selectedDistrict, selectedYear]);

  return (
    <div className="chart2-container">
      <h2>TOP5 방문 지역</h2>

      <div className="filter-container">
        <div className="filter-group">
          <label>자치구</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
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
          <label>년도</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>지역</th>
            <th>방문자 수</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.region}</td>
              <td>{item.visitors.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Chart2;
