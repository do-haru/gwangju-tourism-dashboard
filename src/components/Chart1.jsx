import "./Chart1.css";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Chart1 = () => {
  const [rawData, setRawData] = useState([]); // API에서 불러온 원본 데이터
  const [pieData, setPieData] = useState([]); // 파이차트에 사용할 데이터
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 대분류 카테고리
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // 선택된 세부 카테고리

  // 공공데이터 API 인증키
  const serviceKey =
    "11d2d450fb2f979bfed1f79e7ad67305fde4391088eb536fe233524be8220191";
  // 파이 차트 색상 배열
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

  // 컴포넌트가 처음 렌더링될 때 실행
  useEffect(() => {
    fetch(
      `https://api.odcloud.kr/api/15133527/v1/uddi:f2427b4c-386e-42bd-ab03-a067cbde14c9?page=1&perPage=500&serviceKey=${serviceKey}`,
    )
      .then((res) => res.json())
      .then((result) => {
        const data = result.data;
        setRawData(data); // 원본 데이터 상태 저장

        updatePie(data, null); // 초기 Pie Chart 데이터 생성 (전체 카테고리 기준)
      });
  }, []);

  // 파이차트 데이터를 계산하는 함수
  const updatePie = (data, category) => {
    const count = {}; // 카테고리 개수 저장 객체

    data.forEach((item) => {
      const key = category ? item.세부구분 : item.구분;

      if (category && item.구분 !== category) return;

      count[key] = (count[key] || 0) + 1;
    });

    // PieChart 형식으로 데이터 변환
    const chartData = Object.keys(count).map((key) => ({
      name: key,
      value: count[key],
    }));

    // 파이차트 데이터 업데이트
    setPieData(chartData);
  };

  // 파이차트 클릭 이벤트
  const handlePieClick = (entry) => {
    // 1단계 → 카테고리 선택
    if (!selectedCategory) {
      setSelectedCategory(entry.name);
      setSelectedSubCategory(null);

      updatePie(rawData, entry.name);
    }

    // 2단계 이후 → 세부 카테고리 선택 (항상 변경 가능)
    else {
      setSelectedSubCategory(entry.name);
    }
  };

  // 테이블에 보여줄 데이터 필터링
  const tableData = rawData.filter((item) => {
    if (!selectedCategory) return true;
    if (!selectedSubCategory) return item.구분 === selectedCategory;

    return (
      item.구분 === selectedCategory && item.세부구분 === selectedSubCategory
    );
  });

  return (
    <div>
      <h2>광주 관광명소 유형별 비율</h2>
      <div className="breadcrumb">
        <span
          onClick={() => {
            setSelectedCategory(null);
            setSelectedSubCategory(null);
            updatePie(rawData, null);
          }}
        >
          전체
        </span>

        {selectedCategory && (
          <>
            {" > "}
            <span
              onClick={() => {
                setSelectedSubCategory(null);
                updatePie(rawData, selectedCategory);
              }}
            >
              {selectedCategory}
            </span>
          </>
        )}

        {selectedSubCategory && (
          <>
            {" > "}
            <span>{selectedSubCategory}</span>
          </>
        )}
      </div>
      <PieChart width={500} height={400}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="60%"
          cy="50%"
          outerRadius={150}
          onClick={handlePieClick}
        >
          {pieData.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend layout="vertical" align="left" verticalAlign="middle" />
      </PieChart>

      <div className="detail-list">
        <table>
          <thead>
            <tr>
              <th>세부구분</th>
              <th>시설명</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.세부구분}</td>
                <td>{item.시설명}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chart1;
