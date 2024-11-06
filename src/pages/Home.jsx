import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllDocuments } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import DocumentCard from "../components/DocumentCard"; // Import DocumentCard component

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
        className="center flex-col h-96 bg-gradient-to-l from-red-800 to-indigo-600"
      >
        <div className="container center flex-col p-10">
          <h2 className="text-5xl font-semibold mb-4 text-indigo-100">
            Welcome to EduDocs
          </h2>
          <p className="text-lg mt-4 mb-1 text-indigo-50 text-md">
            Your ultimate platform for sharing notes and assignments.
          </p>
          <div className="search w-full relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full py-2 px-4 border border-2 rounded-full"
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
      <hr />
      <section
        id="recently-uploaded"
        className="p-10 bg-gradient-to-l from-red-100 to-indigo-100"
      >
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-4 text-indigo-600">
            Recently Uploaded
          </h3>
          <p className="text-gray-700 mb-4">
            Browse and share notes with your classmates.
          </p>
          <div className="grid xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {documents
              ?.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
              .map((document) => (
                <DocumentCard document={document} key={document._id} />
              ))}
          </div>
        </div>
      </section>
      <hr />
      <section
        id="assignments"
        className="p-10 bg-gradient-to-l from-red-100 to-indigo-100"
      >
        <div className="container">
          <h3 className="text-3xl font-bold mb-4 text-indigo-600">
            Assignments
          </h3>
          <p className="text-gray-700 mb-4">
            Upload and download assignments with ease.
          </p>
          <div className="grid xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {documents.filter((doc) => doc.category === "assignment").length > 0 ? (
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
        className="p-10 bg-gradient-to-l from-red-100 to-indigo-100"
      >
        <div className="container">
          <h3 className="text-3xl font-bold mb-4 text-indigo-600">Notes</h3>
          <p className="text-gray-700 mb-4">
            Upload and download notes with ease.
          </p>
          <div className="grid xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

      <section id="about" className="p-10">
        <div className="container">
          <h3 className="text-3xl font-bold mb-4 text-indigo-600">About Us</h3>
          <p className="text-gray-700">
            Learn more about EduDocs and our mission to facilitate easy sharing
            of educational resources.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
