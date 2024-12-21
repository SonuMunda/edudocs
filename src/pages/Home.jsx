import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DocumentCard from "../components/DocumentCard";

import Loader from "../components/Loader";

const Home = () => {
  const { documents, loading } = useSelector((state) => state?.documents);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/document-search?${query}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      <section id="hero" className="center flex-col h-96 bg-blue-950">
        <div className="container center flex-col p-4 max-w-6xl">
          <h2 className="text-5xl font-semibold text-blue-100 text-center">
            Welcome to EduDocs
          </h2>
          <p className="text-lg mt-4 mb-2 text-blue-50 text-md text-center">
            Your ultimate platform for sharing notes and assignments.
          </p>
          <div className="search w-full relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full py-3 px-4 outline-none  rounded-full"
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
        className="py-10 px-4 sm:px-10 bg-blue-100"
      >
        <div className="recently-uploaded-container">
          <h3 className="text-3xl font-bold mb-8 text-gray-800 pb-3">
            Recently Uploaded
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {documents?.length > 0 &&
              [...documents]
                .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
                .slice(0, 5)
                .map((document) => (
                  <DocumentCard document={document} key={document._id} />
                ))}
          </div>
        </div>
      </section>
      <section
        id="assignments"
        className="py-10 px-4 sm:px-10 bg-gradient-to-l bg-blue-50"
      >
        <div className="assignments-container">
          <h3 className="text-3xl font-bold mb-8 text-gray-800  pb-3">
            Assignments
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {documents.filter((doc) => doc.category === "assignment").length >
            0 ? (
              documents
                .filter((doc) => doc.category === "assignment")
                .slice(0, 5)
                .map((document) => (
                  <DocumentCard document={document} key={document._id} />
                ))
            ) : (
              <p className="text-gray-800">
                No assignments available at the moment. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        id="notes"
        className="py-10 px-4 sm:px-10 bg-gradient-to-l bg-blue-100"
      >
        <div className="notes-container">
          <h3 className="text-3xl font-bold mb-8 text-gray-800  pb-3">Notes</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {documents.filter((doc) => doc.category === "notes").length > 0 ? (
              documents
                .filter((doc) => doc.category === "notes")
                .slice(0, 5)
                .map((document) => (
                  <DocumentCard document={document} key={document._id} />
                ))
            ) : (
              <p className="text-gray-800">
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
