import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-blue-100 p-8 rounded-3xl shadow-lg max-w-md w-full text-center">
        <p className="text-xl font-medium text-gray-700">
          We are sorry, books are not available right now.
        </p>
        <button
          className=" bg-blue-500 text-white px-4 py-2 rounded-full mt-10  "
          onClick={() => {
            navigate("/document-search");
          }}
        >
          Search for other documents instead.
        </button>
      </div>
    </section>
  );
};

export default Books;
