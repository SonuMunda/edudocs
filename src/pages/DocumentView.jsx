import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchFileDetails } from "../store/slices/documentSlice";
import ShareMenu from "../components/ShareMenu";
import { toast, ToastContainer } from "react-toastify";
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
import { LuArrowUp, LuCloudDownload, LuRefreshCcw, LuShare2, LuThumbsUp, LuZoomIn, LuZoomOut } from "react-icons/lu"
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
      <div className="document-viewer max-w-7xl p-4  mx-auto">
        <div className="content grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document description sidebar */}
          <div className="document-description bg-white h-fit w-full space-y-3 p-10 rounded-3xl">
            <div className="">
              {!document?.title ? (
                <Skeleton height={40} className="w-96 rounded-full" />
              ) : (
                <h2 className="text-2xl font-semibold text-gray-800">
                  {document.title}
                </h2>
              )}
              {!document?.description ? (
                <Skeleton count={3} height={20} className="w-full rounded-full" />
              ) : (
                <p className="text-gray-700">{document.description}</p>
              )}
            </div>

            {/* Metadata */}
            {["course", "university", "session"].map((key) => (
              <div key={key} className="mb-2">
                {!document?.[key] ? (
                  <>
                    <Skeleton height={24} className="w-96 rounded-full" />
                    <Skeleton height={20} className="w-80 rounded-full" />
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
              <div className="relative grid grid-cols-3">
                <Skeleton height={40} width={100} borderRadius={100} />
                <Skeleton height={40} width={100} borderRadius={100} />
                <Skeleton height={40} width={100} borderRadius={100} />
              </div>
            ) : (
              <>
                <div className="document-btns flex flex-wrap gap-4 mt-4">
                  <button
                    className="share-btn center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 py-2 px-4 text-white rounded-3xl"
                    onClick={() =>
                      toggleShareMenu(
                        `${import.meta.env.VITE_CLIENT_URL
                        }/${username}/${userId}/document/${document?.title
                        }/${fileId}/view`,
                        document?.title
                      )
                    }
                  >
                    <div className="icon me-2">
                      <LuShare2 />
                    </div>
                    <span className="btn-text">Share</span>
                  </button>

                  {currentUserId && currentUserId !== document?.uploadedBy && (
                    <>
                      <button
                        className={`share-btn center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-2 px-4 text-white rounded-3xl ${currentLikes?.users?.includes(currentUserId)
                          ? "bg-green-600 text-white"
                          : "text-green-600"
                          }`}
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
                          <LuThumbsUp />
                        )}
                        {Array.isArray(currentVotes?.users) &&
                          currentLikes.users.includes(currentUserId)
                          ? "Liked"
                          : "Like"}
                      </button>

                      <button
                        className={`share-btn center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-2 px-4 text-white rounded-3xl ${currentVotes?.users?.includes(currentUserId)
                          ? "bg-red-600 text-white"
                          : "text-red-600"
                          }`}
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
                          <LuArrowUp />
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
          <div className="viewer lg:col-span-2 flex flex-col h-screen  w-full bg-gray-100 rounded-3xl overflow-hidden shadow">
            <div className="flex items-center justify-between bg-white px-4 py-2 border-b">
              <div className="flex space-x-2 items-center">
                <button onClick={zoomOut} className="p-2">
                  <LuZoomOut size={24} />
                </button>
                <button onClick={zoomIn} className="p-2">
                  <LuZoomIn size={24} />
                </button>
                <span>Zoom: {(scale * 100).toFixed(0)}%</span>
              </div>

              <button
                onClick={() => downloadFile(document?.url, document?.title)}
                className="download-btn center gap-2 text-green-800"
                title="Download PDF"
                disabled={!document?.url}
              >
                Download <LuCloudDownload size={24} />
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
                      <LuRefreshCcw size={16} /> Refresh
                    </button>
                  </div>
                }
              >
                {document?.url ? (
                  <Document
                    file={document.url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={
                      <div className="text-red-500">
                        Error loading document
                        <button
                          onClick={() => window.location.reload()}
                          className="reload-btn center gap-2 bg-gray-800 text-white p-2 m-2 rounded-full cursor-pointer"
                        >
                          <LuRefreshCcw size={16} /> Refresh
                        </button>
                      </div>
                    }
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
