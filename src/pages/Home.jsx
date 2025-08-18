import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DocumentCard from "../components/DocumentCard";
import { fetchDocuments } from "../store/slices/documentsSlice";
import DocumentSkeleton from "../components/DocumentSkeleton";

const Home = () => {
  const { documents, loading } = useSelector((state) => state?.documents);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDocuments());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/document-search?${query}`);
  };

  return (
    <main>
      <section
        id="hero"
        className="flex flex-col justify-center items-center bg-gradient-to-b from-blue-800 to-gray-950 text-white md:min-h-screen"
      >
        <div className="container max-w-7xl px-4 py-24  mx-auto">
          <div className="content">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">Discover to EduDocs</h1>
            <p className="text-md md:text-lg text-gray-200 mb-6 max-w-3xl text-center mx-auto">
              Empowering students and educators with a seamless platform to share
              notes, documents, and assignments.
            </p>

            <form
              onSubmit={handleSearch}
              className="relative w-full max-w-xl mx-auto"
              role="search"
            >
              <label htmlFor="search" className="sr-only">
                Search documents
              </label>
              <input
                id="search"
                type="text"
                className="w-full py-4 px-5 pr-12 rounded-full border border-gray-300 bg-gray-100 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type to search for documents"
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search for documents"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-blue-600"
                aria-label="Submit search"
              >
                <FaMagnifyingGlass size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <hr />
      <section id="recently-uploaded" className="recent-items bg-white">
        <div className="container max-w-7xl mx-auto px-4 py-24">
          <h3 className="text-2xl font-bold mb-8 text-gray-800 pb-3">
            Recently Uploaded
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loading ? (
              Array(4)
                .fill(null)
                .map((_, index) => <DocumentSkeleton key={index} />)
            ) : documents?.length > 0 ? (
              documents
                ?.filter((doc) => doc.uploadedAt)
                .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
                .slice(0, 5)
                .map((document) => (
                  <DocumentCard document={document} key={document?._id} />
                ))
            ) : (
              <p className="text-gray-800">
                No documents available at the moment. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>
      <hr />
      <section
        id="assignments"
        className="assignments bg-neutral-100"
      >
        <div className="container max-w-7xl mx-auto px-4 py-24">
          <h3 className="text-2xl font-bold mb-8 text-gray-800  pb-3">
            Assignments
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loading ? (
              Array(4)
                .fill(null)
                .map((_, index) => <DocumentSkeleton key={index} />)
            ) : documents?.filter((doc) => doc.category === "assignment")
              .length > 0 ? (
              documents
                .filter((doc) => doc.category === "assignment")
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
      <hr />
      <section id="notes" className="notes bg-white">
        <div className="container max-w-7xl mx-auto px-4 py-24">
          <h3 className="text-2xl font-bold mb-8 text-gray-800  pb-3">Notes</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loading ? (
              Array(4)
                .fill(null)
                .map((_, index) => <DocumentSkeleton key={index} />)
            ) : documents?.filter((doc) => doc.category === "notes").length >
              0 ? (
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
