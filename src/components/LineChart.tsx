import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface PopulationData {
  [k: string]: number | string;
}

type LineChartprops = {
  data: Array<PopulationData>;
  loading: boolean;
};

const LineChart = ({ data, loading }: LineChartprops) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
  };

  const labels = data?.map((item) => item["Year"]);

  const barData = {
    labels,
    datasets: [
      {
        label: "Population",
        data: data.map((item) => item["Population"]),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      {loading ? (
        <div className="text-center text-lg font-bold text-gray-700">
          Loading...
        </div>
      ) : (
        <Line options={options} data={barData} />
      )}
    </div>
  );
};

export default LineChart;
