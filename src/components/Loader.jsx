import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed top-14 left-0 z-1 w-screen h-screen flex items-center justify-center bg-white backdrop-blur-3xl">
      <ColorRing colors={[]} height={64} />
    </div>
  );
};

export default Loader;
