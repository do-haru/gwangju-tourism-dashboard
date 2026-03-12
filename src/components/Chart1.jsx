import "./Chart1.css";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Chart1 = () => {
  const [data, setData] = useState([]);

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

      <PieChart width={500} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Chart1;
