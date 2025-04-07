import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  addDocumentLike,
  addDocumentVote,
  fetchFileDetails,
} from "../store/slices/userSlice";
import ShareMenu from "../components/ShareMenu";
import { toast, ToastContainer } from "react-toastify";
import { FaShare } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { BiSolidUpvote } from "react-icons/bi";
import FetchUserId from "../utils/FetchUserId";
// import { Worker } from "@react-pdf-viewer/core";
// import { Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
import Skeleton from "react-loading-skeleton";
// import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
// import "@react-pdf-viewer/toolbar/lib/styles/index.css";

const DocumentView = () => {
  const { fileId, username, userId } = useParams();
  const [fileDetails, setFileDetails] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const dispatch = useDispatch();

  const currentUserId = FetchUserId();

  // const toolbarPluginInstance = toolbarPlugin();
  // const { Toolbar } = toolbarPluginInstance;

  window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(fetchFileDetails(fileId)).then((data) => {
      setFileDetails(data.payload);
    });
  }, [dispatch, fileId]);

  const toggleShareMenu = (url, title) => {
    setMenuOpen(true);
    const encodedUrl = encodeURI(url);
    setShareLink(encodedUrl);
    setShareTitle(title);
  };

  const handleLike = async () => {
    dispatch(addDocumentLike({ documentId: fileId, currentUserId })).then(
      (data) => {
        if (data.payload) {
          toast.success(data.payload, {
            position: "top-right",
          });
        } else if (data.error) {
          toast.error(data.error.message || "Failed to like document", {
            position: "top-right",
          });
        }
      }
    );
  };

  const handleVote = async () => {
    dispatch(
      addDocumentVote({ documentId: fileId, userId: currentUserId })
    ).then((data) => {
      if (data.payload) {
        toast.success(data.payload, {
          position: "top-right",
        });
      } else if (data.error) {
        toast.error(data.error.message || "Failed to vote document", {
          position: "top-right",
        });
      }
    });
  };

  return (
    <main className="min-h-screen p-4 flex justify-center items-center">
      <ToastContainer />
      <div className="container document-viewer flex flex-col gap-4 lg:flex-row my-12">
        {/* Document Description */}
        <div className="document-description bg-white w-full md:w-4/12 p-4 rounded">
          <div className="flex flex-col gap-2 my-4">
            {!fileDetails?.title ? (
              <Skeleton height={40} />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800">
                {fileDetails?.title}
              </h2>
            )}
            {!fileDetails?.description ? (
              <Skeleton height={20} />
            ) : (
              <p className="text-gray-700 text-xl">
                {fileDetails?.description}
              </p>
            )}
          </div>

          <div className="course mb-2">
            <h4 className="text-lg font-semibold">Course</h4>
            {!fileDetails?.course ? (
              <Skeleton height={20} />
            ) : (
              <p className="text-gray-800">{fileDetails?.course}</p>
            )}
          </div>

          <div className="university mb-2">
            <h4 className="text-lg font-semibold">University</h4>
            {!fileDetails?.university ? (
              <Skeleton height={20} />
            ) : (
              <p className="text-gray-800">{fileDetails?.university}</p>
            )}
          </div>

          <div className="academic-year mb-2">
            <h4 className="text-lg font-semibold">Academic Year</h4>
            {!fileDetails?.session ? (
              <Skeleton height={20} />
            ) : (
              <p className="text-gray-800">{fileDetails?.session}</p>
            )}
          </div>

          <div className="owner mb-2">
            <h4 className="text-lg font-semibold">Uploaded by</h4>
            {!fileDetails?.username ? (
              <Skeleton height={20} />
            ) : (
              <Link
                to={`/profile/${fileDetails?.username}`}
                className="text-blue-800"
              >
                {fileDetails?.username}
              </Link>
            )}
          </div>

          {/* Share button */}
          <div className="document-btns flex gap-4">
            <button
              className="share-btn center bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() =>
                toggleShareMenu(
                  `${
                    import.meta.env.VITE_CLIENT_URL
                  }/${username}/${userId}/document/${
                    fileDetails?.title
                  }/${fileId}/view`,
                  fileDetails?.title
                )
              }
            >
              <div className="icon me-2">
                <FaShare />
              </div>
              <span className="btn-text">Share</span>
            </button>
            {currentUserId && currentUserId !== fileDetails?.uploadedBy && (
              <>
                <button
                  className="like-btn center bg-green-600 text-white px-4 py-2 rounded"
                  onClick={handleLike}
                >
                  <div className="icon me-2">
                    <FaThumbsUp />
                  </div>
                  <span className="btn-text">{fileDetails?.likes?.length}</span>
                </button>

                <button
                  className="vote center bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleVote}
                >
                  <div className="icon me-2">
                    <BiSolidUpvote />
                  </div>
                  <span className="btn-text">Vote</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Document Viewer */}
        <div
          className="relative w-full rounded overflow-hidden shadow-md bg-gray-200"
          style={{ height: "85vh" }}
        >
          {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            {fileDetails?.url ? (
              <div className="w-full h-full">
                <div className="pdf-toolbar p-2">
                  <Toolbar />
                </div>
                <Viewer
                  fileUrl={fileDetails?.url}
                  plugins={[toolbarPluginInstance]}
                />
              </div>
            ) : (
              <Skeleton height={"100%"} />
            )}
          </Worker> */}

          {fileDetails?.url ? (
            <iframe
              src={`https://docs.google.com/gview?url=${fileDetails?.url}&embedded=true`}
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          ) : (
            <Skeleton height={"100%"} />
          )}
        </div>
      </div>

      {/* Share Menu */}
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
