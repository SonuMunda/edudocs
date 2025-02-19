import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DocumentCard from "../components/DocumentCard";
import { fetchDocuments } from "../store/slices/documentSlice";
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
    <>
      <section
        id="hero"
        className="center flex-col bg-white"
        style={{ height: "75vh" }}
      >
        <div className="container center flex-col p-4 max-w-6xl">
          <h2 className="text-4xl font-semibold  text-center">
            Welcome to Edu<span className="text-blue-500">Docs</span>
          </h2>
          <p className="mt-4 mb-2 text-gray-600 text-md text-center">
            Empowering students and educators with a seamless platform to share
            notes, documents, and assignments.
          </p>
          <div className="search w-full relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full py-3 px-4 outline-none border bg-gray-100 rounded"
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
      <section id="recently-uploaded" className="py-10 px-4 sm:px-10 ">
        <div className="recently-uploaded-container">
          <h3 className="text-2xl font-bold mb-8 text-gray-800 pb-3">
            Recently Uploaded Documents
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
        className="py-10 px-4 sm:px-10 bg-gradient-to-l "
      >
        <div className="assignments-container">
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
      <section id="notes" className="py-10 px-4 sm:px-10 bg-gradient-to-l ">
        <div className="notes-container">
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
    </>
  );
};

export default Home;
