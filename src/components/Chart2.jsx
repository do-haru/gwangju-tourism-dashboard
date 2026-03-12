import "./Chart2.css";

import { useEffect, useState } from "react";

const Chart2 = () => {
  const [data, setData] = useState([]);

  const serviceKey =
    "11d2d450fb2f979bfed1f79e7ad67305fde4391088eb536fe233524be8220191";

  useEffect(() => {
    fetch(
      `https://api.odcloud.kr/api/15098091/v1/uddi:d33bd433-54c1-4a2e-a37c-836554d8c3be?page=1&perPage=500&serviceKey=${serviceKey}`,
    )
      .then((res) => res.json())
      .then((result) => {
        const rawData = result.data;

        const processed = rawData
          .map((item) => {
            const total =
              Number((item["2016년"] || "0").replace(/,/g, "")) +
              Number((item["2017년"] || "0").replace(/,/g, "")) +
              Number((item["2018년"] || "0").replace(/,/g, "")) +
              Number((item["2019년"] || "0").replace(/,/g, "")) +
              Number((item["2020년"] || "0").replace(/,/g, ""));

            return {
              region: item.방문지역,
              total: total,
            };
          })
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);

        setData(processed);
      });
  }, []);

  return (
    <div>
      <h2>TOP5 방문 지역</h2>

      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>지역</th>
            <th>누적 방문자 수</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.region}</td>
              <td>{item.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Chart2;
