import { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { fetchBookDetails } from "../store/slices/booksSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const BookView = () => {
  const [bookDetails, setBookDetails] = useState({});
  const [pageImages, setPageImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jumpPage, setJumpPage] = useState("");
  const flipBook = useRef();

  const dispatch = useDispatch();

  const { bookId } = useParams();

  useEffect(() => {
    dispatch(fetchBookDetails(bookId)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setBookDetails(response.payload.bookInfo);
        console.log(response.payload.bookInfo);
      } else {
        console.error("Failed to fetch book details");
      }
    });
  }, [bookId, dispatch]);

  const pdfUrl = bookDetails?.url;

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
          <h1 className="text-3xl font-bold text-gray-800">
            Book Title: Computer Organization Architecture
          </h1>
          <p className="text-gray-600 mt-2">Author Name : William Stallings</p>
          <p className="text-gray-600 mt-2">Category: Computer-Science</p>
          <p className="text-gray-600 mt-2">
            "Computer Organization and Architecture" by William Stallings is a
            comprehensive textbook that explores the internal structure and
            operational principles of computer systems. It covers topics like
            processor architecture, instruction sets, memory hierarchy,
            input/output systems, and parallel organization. Widely used in
            academia, the book balances theory with real-world examples, making
            it ideal for students and professionals seeking a deep understanding
            of how computers work at a hardware level.
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
