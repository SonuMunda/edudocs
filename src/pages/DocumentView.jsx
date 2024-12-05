import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchFileDetails } from "../store/slices/userSlice";
import ShareMenu from "../components/ShareMenu";
import { ToastContainer } from "react-toastify";
import { FaShare } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { BiSolidUpvote } from "react-icons/bi";

const DocumentView = () => {
  const { fileId, username, userId } = useParams();
  const [fileDetails, setFileDetails] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchFileDetails(fileId)).then((data) => {
      setFileDetails(data.payload);
    });
  }, [dispatch, fileId]);

  const toggleShareMenu = (url, title) => {
    setMenuOpen(true);
    setShareLink(url);
    setShareTitle(title);
  };

  return (
    <main className="bg-gray-50 min-h-screen p-6 flex justify-center items-center">
      <ToastContainer />
      <div className="container document-viewer flex flex-col gap-4 md:flex-row my-10">
        {/* Document Description */}
        <div className="document-description w-full md:w-4/12 p-4 border-r rounded">
          <div className="flex flex-col gap-2 my-4">
            <h2 className="text-gray-800 font-bold text-2xl">
              {fileDetails?.title.replace(/\.[^/.]+$/, "")}
            </h2>
            <p className="text-gray-700 text-xl">{fileDetails?.description}</p>
          </div>

          <div className="course mb-2">
            <h4 className="text-lg font-semibold">Course</h4>
            <p className="text-gray-800">{fileDetails?.course}</p>
          </div>

          <div className="university mb-2">
            <h4 className="text-lg font-semibold">University</h4>
            <p className="text-gray-800">{fileDetails?.university}</p>
          </div>

          <div className="academic-year mb-2">
            <h4 className="text-lg font-semibold">Academic Year</h4>
            <p className="text-gray-800">{fileDetails?.session}</p>
          </div>

          <div className="owner mb-2">
            <h4 className="text-lg font-semibold">Uploaded by</h4>
            <Link
              to={`/profile/${username}`}
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              {username}
            </Link>
          </div>

          {/* Share button */}
          <div className="document-btns flex gap-4">
            <button
              className="share-btn center bg-indigo-600 text-white px-4 py-2 rounded"
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
              <span className="font-bold">Share</span>
            </button>

            <button className="like-btn center bg-green-600 text-white px-4 py-2 rounded">
              <div className="icon me-2">
                <FaThumbsUp />
              </div>
              <span className="font-bold">Like</span>
            </button>

            <button className="vote center bg-red-600 text-white px-4 py-2 rounded">
              <div className="icon me-2">
              <BiSolidUpvote/>
              </div>
              <span className="font-bold">Vote</span>
            </button>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="relative w-full h-screen">
          <iframe
            src={fileDetails?.url}
            className="w-full h-full rounded object-contain"
            title="file Viewer"
          />
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
