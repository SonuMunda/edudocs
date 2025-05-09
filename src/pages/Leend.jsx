import { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const BookView = () => {
  const [pageImages, setPageImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jumpPage, setJumpPage] = useState("");
  const flipBook = useRef();

  const pdfUrl =
    "https://raw.githubusercontent.com/Rafiquzzaman420/Free-Programming-Books/4c4222930e89e7d39b4f4f913a73491d18ff7ad1/Java/Basic%20to%20advance%20concepts/Java%20Quick%20Syntax%20Reference.pdf";

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const total = pdf.numPages;
        const images = [];

        for (let i = 1; i <= total; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          images.push(canvas.toDataURL());
        }

        setPageImages(images);
        setLoading(false);
      } catch (error) {
        console.error("PDF loading error:", error);
      }
    };

    loadPdf();
  }, []);

  const handleJump = () => {
    const pageNumber = parseInt(jumpPage);
    if (
      !isNaN(pageNumber) &&
      pageNumber >= 1 &&
      pageNumber <= pageImages.length
    ) {
      flipBook.current.pageFlip().flip(pageNumber - 1);
    }
  };

  const goNextPage = () => {
    flipBook.current.pageFlip().flipNext();
  };

  const goPrevPage = () => {
    flipBook.current.pageFlip().flipPrev();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Loading your book...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6">
      <div className="container">
        {/* Book Details */}

        <div className="book-info mb-6 max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Book Title</h1>
          <p className="text-gray-600 mt-2">Author Name</p>
          <p className="text-gray-600 mt-2">Published Year</p>
          <p className="text-gray-600 mt-2">Category</p>
          <p className="text-gray-600 mt-2">
            Description of the book goes here. This is a brief overview of what
            the book is about.
          </p>
        </div>

        {/* Book + Navigation */}
        <div className="relative w-full max-w-[1200px] flex items-center justify-center mx-auto">
          {/* Left Arrow - Desktop only */}
          <button
            onClick={goPrevPage}
            className="hidden md:flex absolute h-full left-0 z-10 px-4 py-2"
          >
           <span className="my-auto ">
            <MdArrowBackIos className="text-2xl" />
           </span>
          </button>

          {/* Flip Book */}
          <HTMLFlipBook
            width={450}
            height={500}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={false}
            className="shadow-lg border mx-auto"
            mobileScrollSupport={true}
            ref={flipBook}
          >
            {pageImages.map((img, index) => (
              <div key={index} className="page bg-white mx-auto">
                <img
                  src={img}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-contain mx-auto"
                />
              </div>
            ))}
          </HTMLFlipBook>

          {/* Right Arrow - Desktop only */}
          <button
            onClick={goNextPage}
            className="hidden md:flex absolute h-full right-0 z-10 px-4 py-2"
          >
           <span className="my-auto">
            <MdArrowForwardIos className="text-2xl" />
           </span>
          </button>
        </div>
        {/* Jump to Page */}
        <div className="mt-6 text-center">
          <input
            type="number"
            min="1"
            max={pageImages.length}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            className="border px-3 py-2 rounded mr-2 w-40 border-gray-300 focus:outline-none focus:ring focus:ring-blue-600"
            placeholder="Page number"
          />
          <button
            onClick={handleJump}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Jump to
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookView;
