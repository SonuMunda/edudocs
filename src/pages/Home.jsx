import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllDocuments } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DocumentCard from "../components/DocumentCard";

const Home = () => {
  const [documents, setDocuments] = useState([]);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllDocuments()).then((data) => {
      setDocuments(data.payload);
    });
  }, [dispatch]);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/document-search?${query}`);
  };

  return (
    <main>
      <section
        id="hero"
        className="center flex-col h-96 bg-gradient-to-l from-red-900 to-blue-900"
      >
        <div className="container center flex-col p-4">
          <h2 className="text-5xl font-semibold mb-4 text-blue-100 text-center">
            Welcome to EduDocs
          </h2>
          <p className="text-lg mt-4 mb-4 text-blue-50 text-md text-center">
            Your ultimate platform for sharing notes and assignments.
          </p>
          <div className="search w-full relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full py-2 px-4 outline-none  rounded-full hover:shadow hover:shadow-white"
                placeholder="Type to search for documents"
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="icon absolute top-1/2 -translate-y-1/2 right-4 text-xl">
                <FaMagnifyingGlass />
              </div>
            </form>
          </div>
        </div>
      </section>

      <section
        id="recently-uploaded"
        className="p-10 bg-gradient-to-l from-red-100 to-blue-100"
      >
        <div className="recently-uploaded-container">
          <h3 className="text-3xl font-bold mb-2 text-blue-600">
            Recently Uploaded
          </h3>
          <div className="border-4 border-blue-600 w-40 rounded-full mb-10"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {documents
              ?.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
              .map((document) => (
                <DocumentCard document={document} key={document._id} />
              ))}
          </div>
        </div>
      </section>
      <section
        id="assignments"
        className="p-10 bg-gradient-to-l from-red-100 to-blue-100"
      >
        <div className="assignments-container">
          <h3 className="text-3xl font-bold mb-4 text-blue-600">Assignments</h3>
          <div className="border-4 border-blue-600 w-40 rounded-full mb-10"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {documents.filter((doc) => doc.category === "assignment").length >
            0 ? (
              documents
                .filter((doc) => doc.category === "assignment")
                .map((document) => (
                  <DocumentCard document={document} key={document._id} />
                ))
            ) : (
              <p className="text-gray-600">
                No assignments available at the moment. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        id="notes"
        className="p-10 bg-gradient-to-l from-red-100 to-blue-100"
      >
        <div className="notes-container">
          <h3 className="text-3xl font-bold mb-4 text-blue-600">Notes</h3>
          <div className="border-4 border-blue-600 w-40 rounded-full mb-10"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {documents.filter((doc) => doc.category === "notes").length > 0 ? (
              documents
                .filter((doc) => doc.category === "notes")
                .map((document) => (
                  <DocumentCard document={document} key={document._id} />
                ))
            ) : (
              <p className="text-gray-600">
                No notes available at the moment. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
