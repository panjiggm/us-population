import logo from "../assets/bereau-cencus-logo.png";

type HeroProps = {
  source_name: string;
  source_description: string;
  dataset_name: string;
  dataset_link: string;
  topic: string;
  subtopic: string;
  loading: boolean;
};

const Hero = ({
  source_name,
  source_description,
  dataset_name,
  dataset_link,
  topic,
  subtopic,
  loading,
}: HeroProps) => {
  return (
    <div className="bg-white mt-4 p-4 rounded-lg shadow">
      <div className="flex flex-col items-center sm:flex-row sm:space-x-4">
        <img
          src={logo}
          className="w-32 h-32 sm:w-24 sm:h-24"
          alt="logo-bureau"
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="mt-4 sm:mt-0">
            <h1 className="font-bold text-gray-700 text-4xl">{source_name}</h1>
            <h5 className="mt-1 text-gray-500 text-sm ">
              {source_description}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
