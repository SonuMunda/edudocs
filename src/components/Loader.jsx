import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-white">
      <ThreeDots color="#3b82f6" />
    </div>
  );
};

export default Loader;
