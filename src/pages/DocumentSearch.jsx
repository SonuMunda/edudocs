import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchDocuments } from "../store/slices/documentSlice";
import "react-loading-skeleton/dist/skeleton.css";

const DocumentSearch = () => {
  const { documents, loading } = useSelector((state) => state?.documents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const query = location.search.replace("?", "");

  useEffect(() => {
    if (document == null || []) {
      dispatch(fetchDocuments());
    }
  }, [dispatch]);

  useEffect(() => {
    if (query || searchQuery) {
      const filterQuery = query || searchQuery;
      const filtered = documents?.filter((doc) =>
        doc.title.toLowerCase().includes(filterQuery.toLowerCase())
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments([]);
    }
  }, [documents, query, searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery) {
      navigate(`?${searchQuery}`);
    }
  };

  return (
    <>
      <section
        className={`hero ${
          !query ? "h-screen" : "h-96"
        } w-full center bg-white`}
      >
        <div className="container p-4 center flex-col max-w-6xl mt-12">
          <h1 className="text-4xl font-semibold text-gray-900 text-center">
            Which document do you want to find?
          </h1>
          <p className="mt-8 mb-2 text-gray-700 text-lg text-center">
            Search for notes, assignments, study materials, or documents
          </p>

          <div className="search w-full relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                id="search"
                className="w-full py-3 px-4 outline-none rounded border bg-gray-100"
                placeholder="Type to search for documents"
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading}
              />
              <div className="icon absolute top-1/2 -translate-y-1/2 right-4 text-xl">
                <FaMagnifyingGlass />
              </div>
            </form>
          </div>
        </div>
      </section>

      <hr />

      {/* Section to display filtered documents */}
      {filteredDocuments?.length > 0 && (
        <section className="filtered-documents py-10 px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Searched Documents
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredDocuments.map((document) => (
              <Link
                to={`/${document.username}/${document.uploadedBy}/document/${document.title}/${document._id}/view`}
                key={document._id}
              >
                <div className="note-card h-full rounded border bg-gray-200 p-2">
                  <div className="document-image h-20 sm:h-56 overflow-hidden">
                    <img
                      src={
                        document.url.endsWith(".doc") ||
                        document.url.endsWith(".docx")
                          ? `${document.url}.jpg`
                          : document.url.replace(/\.[^/.]+$/, ".jpg")
                      }
                      alt={document.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="details mt-2">
                    <h4 className="font-bold">
                      {document.title.replace(/\.[^/.]+$/, "")}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {document.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {query && filteredDocuments?.length <= 0 && (
        <section className="filtered-documents py-10 px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Document you are looking for is not available!
          </h2>

          <p className="text-gray-700">Try searching for another document.</p>
        </section>
      )}
    </>
  );
};

export default DocumentSearch;
