import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBookDetails } from "../store/slices/booksSlice";
import { ThreeDots } from "react-loader-spinner";
import { pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const BookView = () => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(null);
  const [pageImages, setPageImages] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [jumpPageInput, setJumpPageInput] = useState("");
  const totalPagesRef = useRef(0);
  const flipBookRef = useRef();

  const dispatch = useDispatch();
  const { bookId } = useParams();

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await dispatch(fetchBookDetails(bookId));
        if (response.meta.requestStatus === "fulfilled") {
          setBookDetails(response.payload.bookInfo);
        }
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [bookId, dispatch]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(bookDetails.url);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        totalPagesRef.current = pdf.numPages;

        for (let i = 1; i <= Math.min(4, pdf.numPages); i++) {
          await renderPageToImage(pdf, i);
        }
      } catch (err) {
        console.error("Error rendering PDF:", err);
        setPdfError("Failed to render PDF.");
      } finally {
        setPdfLoading(false);
      }
    };

    if (bookDetails?.url) loadPdf();
  });

  const renderPageToImage = async (pdf, pageNumber) => {
    if (pageImages[pageNumber]) return;

    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");

    await page.render({ canvasContext: context, viewport }).promise;
    setPageImages((prev) => ({ ...prev, [pageNumber]: canvas.toDataURL() }));
  };

  const handleFlip = async (e) => {
    const pageIndex = e.data;
    setCurrentPage(pageIndex);

    const preloadPages = [pageIndex + 1, pageIndex + 2, pageIndex + 3];
    for (let p of preloadPages) {
      if (p > 0 && p <= totalPagesRef.current) {
        await renderPageToImage(pdfDoc, p);
      }
    }
  };

  const goToPrevious = () => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNext = () => {
    if (flipBookRef.current && currentPage < totalPagesRef.current - 1) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const jumpToPage = () => {
    const target = parseInt(jumpPageInput);
    if (!isNaN(target) && target >= 1 && target <= totalPagesRef.current) {
      flipBookRef.current.pageFlip().flip(target - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ThreeDots color="#3b82f6" height={50} width={50} />
      </div>
    );
  }

  if (!bookDetails?.url) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">
          Could not load book details or URL.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  to-white px-4 py-6 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto">
        {/* Book Info */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {bookDetails.title}
          </h1>
          <p className="text-gray-600 mt-1">{bookDetails.author}</p>
        </div>

        {/* Flipbook Viewer */}
        <div className="bg-white rounded-xl relative shadow-md overflow-hidden flex justify-center">
          {pdfLoading ? (
            <div className="h-[500px] flex justify-center items-center">
              <ThreeDots color="#3b82f6" height={50} width={50} />
            </div>
          ) : pdfError ? (
            <p className="text-red-500 text-center">{pdfError}</p>
          ) : (
            <>
              <button
                onClick={goToPrevious}
                disabled={currentPage === 0}
                className="absolute h-full left-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-2"
              >
                <MdChevronLeft size={36} />
              </button>

              <HTMLFlipBook
                ref={flipBookRef}
                onFlip={handleFlip}
                width={300}
                height={400}
                size="stretch"
                minWidth={300}
                maxWidth={600}
                minHeight={400}
                maxHeight={600}
                showCover={true}
                className="shadow-lg mx-auto"
              >
                {Array.from({ length: totalPagesRef.current }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="bg-white flex items-center justify-center h-full overflow-hidden"
                    >
                      {pageImages[index + 1] ? (
                        <img
                          src={pageImages[index + 1]}
                          alt={`Page ${index + 1}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-500">
                          Loading page {index + 1}...
                        </div>
                      )}
                    </div>
                  )
                )}
              </HTMLFlipBook>
              <button
                onClick={goToNext}
                disabled={currentPage >= totalPagesRef.current - 1}
                className="absolute h-full right-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-2"
              >
                <MdChevronRight size={36} />
              </button>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 0}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <MdChevronLeft size={24} />
          </button>

          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border text-gray-700 text-sm">
            Page <strong>{currentPage + 1}</strong> of{" "}
            <strong>{totalPagesRef.current}</strong>
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage >= totalPagesRef.current - 1}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <MdChevronRight size={24} />
          </button>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={totalPagesRef.current}
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              placeholder="Go to page"
              className="px-3 py-2 border border-gray-300 rounded-md w-24 text-center"
            />
            <button
              onClick={jumpToPage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Jump
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookView;
