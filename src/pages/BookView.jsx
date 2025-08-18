import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBookDetails } from "../store/slices/booksSlice";
import { ThreeDots } from "react-loader-spinner";
import { Document, Page, pdfjs } from "react-pdf";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const BookView = () => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);  // Track screen width

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setSpreadIndex(0);
  };

  const leftPage = screenWidth > 1024 ? spreadIndex * 2 + 1 : spreadIndex + 1;
  const rightPage = leftPage + 1 <= numPages ? leftPage + 1 : null;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && spreadIndex > 0) {
        setSpreadIndex(spreadIndex - 1);
      } else if (e.key === "ArrowRight" && rightPage) {
        setSpreadIndex(spreadIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [spreadIndex, rightPage]);

  const prevSpread = () => {
    if (spreadIndex > 0) setSpreadIndex(spreadIndex - 1);
  };
  const nextSpread = () => {
    if (rightPage) setSpreadIndex(spreadIndex + 1);

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
    <div className="book-viewer min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="book flex items-center relative">
          <button
            onClick={prevSpread}
            disabled={spreadIndex === 0}
            aria-label="Previous pages"
            className="h-full absolute top 1/2 left-0 z-10 disabled:opacity-40 p-2"
          >
            <LuChevronLeft size={24} />
          </button>

          <Document
            file={bookDetails.url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center items-center"
            renderMode="canvas"
            loading={<Skeleton height={"100%"} width={"100%"} />}
          >
            {screenWidth < 1024 ? (
              <Page pageNumber={leftPage} className="shadow-lg rounded-md w-full" width={screenWidth - 16}/>
            ) : (
              <>
                <Page pageNumber={leftPage} className="shadow-lg rounded-md" width={480} />
                {rightPage && (
                  <Page pageNumber={rightPage} className="shadow-lg rounded-md" width={480} />
                )}
              </>
            )}
          </Document>

          <button
            onClick={nextSpread}
            disabled={!rightPage}
            aria-label="Next pages"
            className="h-full absolute top 1/2 right-0 z-10 disabled:opacity-40 p-2"
          >
            <LuChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookView;
