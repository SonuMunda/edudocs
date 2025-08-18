import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../store/slices/booksSlice";
import DocumentSkeleton from "../components/DocumentSkeleton";

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, loading, error } = useSelector((state) => state.books || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchBooks());
  }, [dispatch]);

  const categories = [
    "All",
    ...new Set(books.map((book) => book.category).filter(Boolean)),
  ];

  // Filtered books
  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const authorMatch = book.author
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === "All" || book.category === selectedCategory;
    return (titleMatch || authorMatch) && categoryMatch;
  });

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Digital Book Library
          </h1>
          <p className="text-gray-600 mt-2">
            Explore and discover books from your favorite authors
          </p>
        </header>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div className="content pt-10">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <DocumentSkeleton key={index} />
                ))}
            </div>
          ) : error ? (
            <div className="max-w-lg mx-auto bg-red-100 border border-red-300 p-6 rounded text-center shadow">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="h-64 bg-white space-y-2 rounded-xl overflow-hidden border shadow cursor-pointer hover:border-2 hover:shadow-lg transition duration-200"
                  onClick={() => navigate(`/book/view/${book._id}`)}
                >
                  <img
                    src={book.cover}
                    alt={book.title || "Book cover"}
                    className="w-full h-full object-cover rounded"
                  />
                  {/* <div className="p-2">
                  <h3 className="text-sm font-semibold text-gray-800 mt-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm">- {book.author}</p>
                </div> */}
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto p-8 rounded-lg  text-center">
              <p className="text-gray-700 text-lg mb-6">
                No books found matching your filters.
              </p>
              <button
                onClick={() => navigate("/document-search")}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Browse Other Documents
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Books;
