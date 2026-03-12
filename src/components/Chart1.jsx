import "./Chart1.css";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Chart1 = () => {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const serviceKey =
    "11d2d450fb2f979bfed1f79e7ad67305fde4391088eb536fe233524be8220191";

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA66CC",
    "#FF4444",
    "#33B5E5",
    "#2BBBAD",
    "#FF8800",
    "#9933CC",
  ];

  useEffect(() => {
    fetch(
      `https://api.odcloud.kr/api/15133527/v1/uddi:f2427b4c-386e-42bd-ab03-a067cbde14c9?page=1&perPage=500&serviceKey=${serviceKey}`,
    )
      .then((res) => res.json())
      .then((result) => {
        const data = result.data;
        setRawData(data);

        const categoryCount = {};

        data.forEach((item) => {
          const category = item.구분;

          if (categoryCount[category]) {
            categoryCount[category] += 1;
          } else {
            categoryCount[category] = 1;
          }
        });

        console.log(categoryCount); // 확인용 -> 나중에 삭제

        const chartData = Object.keys(categoryCount).map((key) => ({
          name: key,
          value: categoryCount[key],
        }));

        setData(chartData);
      });
  }, []);

  return (
    <div>
      <h2>광주 관광명소 유형별 비율</h2>

      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          onClick={(entry) => {
            setSelectedCategory(entry.name);
            setSelectedSubCategory(null);
          }}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>

      {selectedCategory && (
        <div className="subcategory-list">
          <h3>{selectedCategory} 세부 카테고리</h3>

          {[
            ...new Set(
              rawData
                .filter((item) => item.구분 === selectedCategory)
                .map((item) => item.세부구분),
            ),
          ].map((sub) => (
            <button key={sub} onClick={() => setSelectedSubCategory(sub)}>
              {sub}
            </button>
          ))}
        </div>
      )}

      {selectedSubCategory && (
        <div className="detail-list">
          <h3>{selectedSubCategory} 시설 목록</h3>

          <ul>
            {rawData
              .filter(
                (item) =>
                  item.구분 === selectedCategory &&
                  item.세부구분 === selectedSubCategory,
              )
              .map((item, index) => (
                <li key={index}>{item.시설명}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Chart1;
