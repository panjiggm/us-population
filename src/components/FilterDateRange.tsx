import { Dispatch, SetStateAction } from "react";

interface PopulationData {
  [k: string]: number | string;
}

type FilterDateRangeProps = {
  startYear: number;
  endYear: number;
  data: Array<PopulationData>;
  onYearRange: Dispatch<SetStateAction<{ startYear: number; endYear: number }>>;
};

const FilterDateRange = ({
  startYear,
  endYear,
  data,
  onYearRange,
}: FilterDateRangeProps) => {
  const handleStartRange = (value: string) => {
    onYearRange({ startYear: Number(value), endYear });
  };

  const handleEndRange = (value: string) => {
    onYearRange({ startYear, endYear: Number(value) });
  };

  return (
    <div className="bg-white mt-4 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-gray-600">Filter Year Range</h1>
        <div className="flex flex-row gap-4">
          <select
            value={startYear}
            onChange={(e) => handleStartRange(e.target.value)}
          >
            {data?.map((item) => (
              <option
                key={item["ID Year"]}
                value={item["ID Year"]}
                disabled={item["ID Year"] === endYear}
              >
                {item["ID Year"]}
              </option>
            ))}
          </select>

          <span>-</span>

          <select
            value={endYear}
            onChange={(e) => handleEndRange(e.target.value)}
          >
            {data?.map((item) => (
              <option
                key={item["ID Year"]}
                value={item["ID Year"]}
                disabled={item["ID Year"] === startYear}
              >
                {item["ID Year"]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterDateRange;
