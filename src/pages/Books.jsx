import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-200 p-8 rounded border shadow shadow-xl max-w-md w-full text-center">
        <p className="text-xl font-medium text-gray-700">
          We are sorry, books are not available right now.
        </p>
        <button
          className=" bg-gray-500 text-white px-4 py-2 rounded mt-10  hover:bg-gray-600"
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
