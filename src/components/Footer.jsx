

const Footer = () => {
  return (
    <footer className="bg-gray-900 p-8">
      <div className="container flex justify-center">
        <div className="flex flex-wrap justify-around items-center w-full">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-white">EduDocs</h1>
            <p className="text-sm text-gray-200">
              Your go-to platform for notes, documents, and assignments.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-300">
        &copy; {new Date().getFullYear()} | EduDocs by Sonu Munda.
      </div>
    </footer>
  );
};

export default Footer;
