const DocumentView = () => {
    return (
      <main>
        <section className="document-viewer center">
          <div className="container flex flex-wrap mt-10">
            <div className="document-description w-full md:w-1/3 p-4">
              <h2 className="text-2xl font-semibold mb-4">Document Title</h2>
              <p className="text-gray-700 mb-4">
                Document description goes here. Provide details about the document.
              </p>
              <p className="text-sm text-gray-500">File type: PDF/Image</p>
            </div>
  
            <div className="viewer-canvas w-full md:w-2/3 p-4 bg-gray-100 shadow-md rounded-lg">
              <img
                src="document-url"
                alt="Document Title"
                className="max-w-full h-auto rounded"
              />
            </div>
          </div>
        </section>
      </main>
    );
  };
  
  export default DocumentView;
  