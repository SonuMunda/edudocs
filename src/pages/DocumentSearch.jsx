import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { fetchRecentDocuments } from "../store/slices/userSlice";
import { Link } from "react-router-dom";

const DocumentSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecentDocuments()).then((data) => {
      setDocuments(data.payload);
    });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchQuery) {
      const filtered = documents.filter((doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDocuments(filtered);
    }
  };

  return (
    <main>
      <section
        className="hero  w-full center bg-gray-50"
        style={{ height: "70vh" }}
      >
        <div className="container p-10 center flex-col">
          <h1 className="text-4xl font-semibold text-gray-600 text-center">
            Which document do you want to find?
          </h1>
          <p className="mt-8 mb-2 text-gray-500 text-lg">
            Search for notes, assignments, study materials, or documents
          </p>
          <div className="search w-full relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full py-2 px-4 border border-2 rounded-full"
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
        <section className="filtered-documents my-10 p-5">
          <h2 className="text-2xl font-semibold text-gray-600 mb-10">
            Searched Documents
          </h2>
          <div className="grid xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDocuments.map((document) => (
              <Link
                to={`/${document.username}/${document.uploadedBy}/document/${document.title}/${document._id}/view`}
                key={document._id}
              >
                <div className="note-card bg-gray-100 h-full p-4 rounded-lg shadow">
                  <div className="document-image h-64 overflow-hidden">
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
                    <h4 className="text-xl font-bold">
                      {document.title.replace(/\.[^/.]+$/, "")}
                    </h4>
                    <p className="text-gray-600">{document.description}</p>
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
