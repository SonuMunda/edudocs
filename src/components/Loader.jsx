import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gray-800 backdrop-blur-3xl">
      <ThreeDots color="#3b82f6"/>
    </div>
  );
};

export default Loader;
