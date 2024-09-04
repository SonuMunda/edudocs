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
          <h1 className="text-4xl font-bold mb-4">Welcome, {user?.firstName}</h1>
          <p className="text-gray-200">
            Manage and upload your documents efficiently.
          </p>
        </div>
      </section>

      <FileUpload />

      <section id="uploads" className="p-10">
        <div className="container">
          <h3 className="text-3xl font-bold mb-4 text-indigo-600">Uploads</h3>
          <p className="text-gray-600">View all your uploads here.</p>
        </div>
      </section>
    </main>
  );
};

export default Uploads;
