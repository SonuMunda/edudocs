import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchFileDetails } from "../store/slices/documentSlice";
import ShareMenu from "../components/ShareMenu";
import { toast, ToastContainer } from "react-toastify";
import { FaShare, FaThumbsUp } from "react-icons/fa";
import { BiSolidUpvote } from "react-icons/bi";
import FetchUserId from "../utils/FetchUserId";
import Skeleton from "react-loading-skeleton";
import {
  toggleLike,
  toggleVote,
  updateLikes,
  updateVotes,
} from "../store/slices/documentActionsSlice";
import { io } from "socket.io-client";
import { ColorRing } from "react-loader-spinner";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {
  MdCloudDownload,
  MdRefresh,
  MdZoomIn,
  MdZoomOut,
} from "react-icons/md";
import downloadFile from "../utils/DownloadFile";
import { ErrorBoundary } from "react-error-boundary";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.min.js`;

const DocumentView = () => {
  const { likes, votes, likesLoading, votesLoading, error } = useSelector(
    (state) => state?.documentActions
  );
  const { document, loading } = useSelector((state) => state?.document);
  const { fileId, username, userId } = useParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const [socket, setSocket] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);

  const pageRefs = useRef({});
  const dispatch = useDispatch();
  const currentUserId = FetchUserId();

  const [currentLikes, setCurrentLikes] = useState({ users: [], counts: 0 });
  const [currentVotes, setCurrentVotes] = useState({ users: [], counts: 0 });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  useEffect(() => {
    if (Array.isArray(document?.likes)) {
      setCurrentLikes({ users: document.likes, counts: document.likes.length });
    }
    if (Array.isArray(document?.votes)) {
      setCurrentVotes({ users: document.votes, counts: document.votes.length });
    }
  }, [document]);

  useEffect(() => {
    if (Array.isArray(likes)) {
      setCurrentLikes({ users: likes, counts: likes.length });
    }
    if (Array.isArray(votes)) {
      setCurrentVotes({ users: votes, counts: votes.length });
    }
  }, [likes, votes]);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SERVER_URL);
    setSocket(newSocket);

    newSocket.emit("joinDocument", fileId);
    newSocket.on("likeUpdate", (data) => {
      dispatch(updateLikes({ likes: data?.likes }));
    });
    newSocket.on("voteUpdate", (data) => {
      dispatch(updateVotes({ votes: data?.votes }));
    });

    return () => {
      newSocket.emit("leaveDocument", fileId);
      newSocket.disconnect();
    };
  }, [fileId, dispatch]);

  useEffect(() => {
    dispatch(fetchFileDetails(fileId));
    window.scrollTo(0, 0);
  }, [dispatch, fileId]);

  const toggleShareMenu = (url, title) => {
    setMenuOpen(true);
    setShareLink(encodeURI(url));
    setShareTitle(title);
  };

  const handleLike = () => {
    if (!currentUserId) return;
    dispatch(toggleLike({ documentId: fileId, currentUserId }));
  };

  const handleVote = () => {
    if (!currentUserId) return;
    dispatch(toggleVote({ documentId: fileId, userId: currentUserId }));
  };

  error?.likes && toast.error(error?.likes);
  error?.votes && toast.error(error?.votes);

  return (
    <main className="document-view">
      <ToastContainer />
      <div className="document-viewer p-4 flex flex-col gap-4 lg:flex-row mx-auto">
        {/* Document description sidebar */}
        <div className="document-description bg-white w-full md:w-4/12 p-4 rounded">
          <div className="flex flex-col gap-2 my-4">
            {!document?.title ? (
              <Skeleton height={40} />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800">
                {document.title}
              </h2>
            )}
            {!document?.description ? (
              <Skeleton height={20} />
            ) : (
              <p className="text-gray-700 text-xl">{document.description}</p>
            )}
          </div>

          {/* Metadata */}
          {["course", "university", "session"].map((key) => (
            <div key={key} className="mb-2">
              {!document?.[key] ? (
                <>
                  <Skeleton height={24} />
                  <Skeleton height={20} />
                </>
              ) : (
                <>
                  <h4 className="text-lg font-semibold capitalize">
                    {key.replace("-", " ")}
                  </h4>
                  <p className="text-gray-800">{document[key]}</p>
                </>
              )}
            </div>
          ))}

          {/* Uploader */}
          <div className="owner mb-2">
            {!document?.username ? (
              <>
                <Skeleton height={24} />
                <Skeleton height={20} />
              </>
            ) : (
              <>
                <h4 className="text-lg font-semibold">Uploaded by</h4>
                <Link
                  to={`/profile/${document?.username}`}
                  className="text-blue-800"
                >
                  {document?.username}
                </Link>
              </>
            )}
          </div>

          {/* Action buttons */}
          {loading ? (
            <div className="relative flex">
              <Skeleton count={3} height={20} width={200} />
            </div>
          ) : (
            <>
              <div className="document-btns flex flex-wrap gap-4 mt-4">
                <button
                  className="share-btn center ring ring-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 px-4 py-2 rounded transition"
                  onClick={() =>
                    toggleShareMenu(
                      `${
                        import.meta.env.VITE_CLIENT_URL
                      }/${username}/${userId}/document/${
                        document?.title
                      }/${fileId}/view`,
                      document?.title
                    )
                  }
                >
                  <div className="icon me-2">
                    <FaShare />
                  </div>
                  <span className="btn-text">Share</span>
                </button>

                {currentUserId && currentUserId !== document?.uploadedBy && (
                  <>
                    <button
                      className={`like-btn center gap-2 ring ring-green-600 ${
                        currentLikes?.users?.includes(currentUserId)
                          ? "bg-green-600 text-white"
                          : "text-green-600"
                      } hover:bg-green-600 hover:text-white px-4 py-2 rounded`}
                      onClick={handleLike}
                    >
                      {likesLoading ? (
                        <ColorRing
                          visible={true}
                          height={24}
                          width={24}
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={[
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                          ]}
                        />
                      ) : (
                        <FaThumbsUp />
                      )}
                      {Array.isArray(currentVotes?.users) &&
                      currentLikes.users.includes(currentUserId)
                        ? "Liked"
                        : "Like"}
                    </button>

                    <button
                      className={`vote center gap-2 ring ring-red-600 ${
                        currentVotes?.users?.includes(currentUserId)
                          ? "bg-red-600 text-white"
                          : "text-red-600"
                      } hover:bg-red-600 hover:text-white px-4 py-2 rounded`}
                      onClick={handleVote}
                    >
                      {votesLoading ? (
                        <ColorRing
                          visible={true}
                          height={24}
                          width={24}
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={[
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                          ]}
                        />
                      ) : (
                        <BiSolidUpvote />
                      )}
                      {Array.isArray(currentVotes?.users) &&
                      currentVotes.users.includes(currentUserId)
                        ? "Voted"
                        : "Vote"}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* PDF Viewer */}
        <div className="flex flex-col h-screen max-w-5xl w-full bg-gray-100 rounded shadow">
          <div className="flex items-center justify-between bg-white px-4 py-2 border-b">
            <div className="flex space-x-2 items-center">
              <button onClick={zoomOut} className="p-2">
                <MdZoomOut size={24} />
              </button>
              <button onClick={zoomIn} className="p-2">
                <MdZoomIn size={24} />
              </button>
              <span>Zoom: {(scale * 100).toFixed(0)}%</span>
            </div>

            <button
              onClick={() => downloadFile(document?.url, document?.title)}
              className="download-btn center gap-2 text-green-800"
              title="Download PDF"
              disabled={!document?.url}
            >
              Download <MdCloudDownload size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-auto px-4 py-2 bg-gray-200 z-1">
            <ErrorBoundary
              fallback={
                <div className="text-red-500">
                  Error loading document
                  <button
                    onClick={() => window.location.reload()}
                    className="reload-btn center gap-2 bg-gray-800 text-white p-2 m-2 rounded-full cursor-pointer"
                  >
                    <MdRefresh size={16} /> Refresh
                  </button>
                </div>
              }
            >
              {document?.url ? (
                <Document
                  file={document.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <div
                      key={`page_${index + 1}`}
                      ref={(el) => (pageRefs.current[index + 1] = el)}
                      className="mb-8 flex justify-center"
                    >
                      <Page pageNumber={index + 1} scale={scale} />
                    </div>
                  ))}
                </Document>
              ) : (
                <div className="text-center text-red-500 mt-4">
                  No PDF file URL provided.
                </div>
              )}
            </ErrorBoundary>
          </div>
        </div>
      </div>

      <ShareMenu
        shareLink={shareLink}
        shareTitle={shareTitle}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </main>
  );
};

export default DocumentView;
