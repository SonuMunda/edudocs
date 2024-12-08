import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { fetchAllDocuments } from "../store/slices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DocumentSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.search.replace("?", "");

  useEffect(() => {
    dispatch(fetchAllDocuments()).then((data) => {
      setDocuments(data.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    if (query || searchQuery) {
      const filterQuery = query || searchQuery;
      const filtered = documents.filter((doc) =>
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
    <main className="bg-blue-200">
      <section className="hero h-96 w-full center bg-blue-200">
        <div className="container p-10 center flex-col">
          <h1 className="text-4xl font-semibold text-gray-800 text-center">
            Which document do you want to find?
          </h1>
          <p className="mt-8 mb-2 text-gray-700 text-lg">
            Search for notes, assignments, study materials, or documents
          </p>
          <div className="search w-full relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full py-2 px-4 outline-none border border-2 rounded-full bg-blue-50 hover:shadow"
                placeholder="Type to search for documents"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="icon absolute top-1/2 -translate-y-1/2 right-4 text-xl">
                <FaMagnifyingGlass />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Section to display filtered documents */}
      {filteredDocuments.length > 0 ? (
        <section className="filtered-documents py-10 px-6 bg-blue-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Searched Documents
          </h2>
          <div className="border-4 border-blue-600 w-40 rounded-full mb-10"></div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredDocuments.map((document) => (
              <Link
                to={`/${document.username}/${document.uploadedBy}/document/${document.title}/${document._id}/view`}
                key={document._id}
              >
                <div className="note-card bg-gray-50 h-full p-4 rounded-3xl shadow">
                  <div className="document-image  h-56 overflow-hidden">
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
                  <div className="details bg-white my-2 p-2">
                    <h4 className="font-bold">
                      {document.title.replace(/\.[^/.]+$/, "")}
                    </h4>
                    <p className="text-sm text-gray-600">{document.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default DocumentSearch;
