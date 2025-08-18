import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader w-screen h-screen bg-white flex items-center justify-center ">
      <ThreeDots width={48} color="#2563eb" />
    </div>
  );
};

export default Loader;
