const Home = () => {
  return (
    <>
      <section id="hero" className="center flex-col h-96 bg-indigo-100">
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
      </section>
      <hr />
      <section id="notes" className="my-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-3xl font-bold mb-4 text-indigo-600">Notes</h3>
        <p className="text-gray-700 mb-4">
          Browse and share notes with your classmates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add content or components for notes here */}
          <div className="note-card bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-xl font-semibold">Sample Note 1</h4>
            <p className="text-gray-600">Description of the note.</p>
          </div>
          <div className="note-card bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-xl font-semibold">Sample Note 2</h4>
            <p className="text-gray-600">Description of the note.</p>
          </div>
          {/* Add more note cards as needed */}
        </div>
      </section>
      <section
        id="assignments"
        className="my-8 bg-white shadow-md rounded-lg p-6"
      >
        <h3 className="text-3xl font-bold mb-4 text-indigo-600">Assignments</h3>
        <p className="text-gray-700 mb-4">
          Upload and download assignments with ease.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add content or components for assignments here */}
          <div className="assignment-card bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-xl font-semibold">Sample Assignment 1</h4>
            <p className="text-gray-600">Description of the assignment.</p>
          </div>
          <div className="assignment-card bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-xl font-semibold">Sample Assignment 2</h4>
            <p className="text-gray-600">Description of the assignment.</p>
          </div>
          {/* Add more assignment cards as needed */}
        </div>
      </section>
      <section id="about" className="my-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-3xl font-bold mb-4 text-indigo-600">About Us</h3>
        <p className="text-gray-700">
          Learn more about EduDocs and our mission to facilitate easy sharing of
          educational resources.
        </p>
      </section>
      <section id="contact" className="my-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-3xl font-bold mb-4 text-indigo-600">Contact Us</h3>
        <p className="text-gray-700 mb-4">
          Get in touch with us for any queries or support.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border  focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border  focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Message</label>
            <textarea
              className="w-full p-2 border  focus:outline-none focus:ring-1 focus:ring-indigo-500"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-10 rounded  hover:bg-indigo-700"
          >
            Send
          </button>
        </form>
      </section>
    </>
  );
};

export default Home;
