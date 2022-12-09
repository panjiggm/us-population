import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

interface PopulationData {
  [k: string]: number | string;
}

type PieChartprops = {
  data: Array<PopulationData>;
  loading: boolean;
};

const PieChart = ({ data, loading }: PieChartprops) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Pie Chart",
      },
    },
  };

  const labels = data?.map((item) => item["Year"]);

  const pieData = {
    labels,
    datasets: [
      {
        label: "Population",
        data: data.map((item) => item["Population"]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(89, 98, 117, 0.2)",
          "rgba(0, 148, 50, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(89, 98, 117, 1)",
          "rgba(0, 148, 50, 1)",
        ],
        borderWidth: 1,
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
        <Pie data={pieData} options={options} />
      )}
    </div>
  );
};

export default PieChart;
