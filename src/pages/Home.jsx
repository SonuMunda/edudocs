import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRecentDocuments } from "../store/slices/userSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const [documents, setDocuments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecentDocuments()).then((data) => {
      setDocuments(data.payload);
    });
  }, [dispatch]);

 
  return (
    <main>
      <section id="hero" className="center flex-col h-96  bg-indigo-100">
        <div className="container center flex-col p-10">
          <h2 className="text-5xl font-bold mb-4 text-indigo-600">
            Welcome to EduDocs
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            Your ultimate platform for sharing notes and assignments.
          </p>
          <div className="search-box flex justify-center">
            <input
              type="text"
              placeholder="Search for notes, assignments, and more"
              className="p-2 w-96 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button className="btn btn-primary bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700">
              Search
            </button>
          </div>
        </div>
      </section>
      <hr />
      <section id="notes" className="p-10">
        <div className="container  mx-auto">
          <h3 className="text-3xl font-bold mb-4 text-indigo-600">
            Recently Uploaded
          </h3>
          <p className="text-gray-700 mb-4">
            Browse and share notes with your classmates.
          </p>
          <div className="grid xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {documents
              ?.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
              .map((document) => {
                return (
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
                          alt=""
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
                );
              })}
          </div>
        </div>
      </section>
      <section id="assignments" className="p-10 bg-gray-100">
        <div className="container">
          <h3 className="text-3xl font-bold mb-4 text-indigo-600">
            Assignments
          </h3>
          <p className="text-gray-700 mb-b4">
            Upload and download assignments with ease.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Add content or components for assignments here */}
            <div className="assignment-card bg-white p-4 rounded-lg shadow">
              <h4 className="text-xl font-semibold">Sample Assignment 1</h4>
              <p className="text-gray-600">Description of the assignment.</p>
            </div>
            <div className="assignment-card bg-white p-4 rounded-lg shadow">
              <h4 className="text-xl font-semibold">Sample Assignment 2</h4>
              <p className="text-gray-600">Description of the assignment.</p>
            </div>
            {/* Add more assignment cards as needed */}
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
