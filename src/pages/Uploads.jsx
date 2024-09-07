import { useSelector } from "react-redux";
import FileUpload from "../components/FileUpload";

const Uploads = () => {
  const { user } = useSelector((state) => state?.user);

  return (
    <main>
      <section
        id="hero"
        className="bg-indigo-900 text-white h-96 flex items-center justify-center"
      >
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome, {user?.firstName}
          </h1>
          <p className="text-gray-200">
            Manage and upload your documents efficiently.
          </p>
        </div>
      </section>

      <FileUpload />
    </main>
  );
};

export default Uploads;
