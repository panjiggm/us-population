import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import FilterDateRange from "./components/FilterDateRange";

function App() {
  const [populationList, setPopulationList] = useState([]);
  const [originalList, setoriginalList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [censusBureau, setCencusBureau] = useState({
    source_name: "",
    source_description: "",
    dataset_name: "",
    dataset_link: "",
    topic: "",
    subtopic: "",
  });
  const [yearRange, setYearRange] = useState({ startYear: 0, endYear: 0 });

  useEffect(() => {
    const fetchPopulation = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://datausa.io/api/data?drilldowns=Nation&measures=Population`
        );
        const data = await response.json();

        setPopulationList(data?.data);
        setoriginalList(data?.data);
        setCencusBureau(data?.source[0]?.annotations);

        const getYears = data?.data?.map((item: any) => item["ID Year"]);
        const startYear = Math.min(...getYears);
        const endYear = Math.max(...getYears);

        // assign initial start year and end year
        setYearRange({ startYear, endYear });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchPopulation();
  }, []);

  useEffect(() => {
    // sorting selected start year with end year
    const ranges = [yearRange.startYear, yearRange.endYear].sort(
      (a, b) => a - b
    );
    const startRange = ranges[0]; // get start year
    const endRange = ranges[1]; // get end year
    // then cut the head and tail of the array
    const newPopulationList = originalList.filter((item) => {
      return item["ID Year"] >= startRange && item["ID Year"] <= endRange;
    });

    setPopulationList(newPopulationList);
  }, [yearRange]);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Hero {...censusBureau} loading={loading} />
      <FilterDateRange
        startYear={yearRange.startYear}
        endYear={yearRange.endYear}
        data={originalList}
        onYearRange={setYearRange}
      />
      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <LineChart data={populationList} loading={loading} />
        <PieChart data={populationList} loading={loading} />
      </div>
    </div>
  );
}

export default App;
