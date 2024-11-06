import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { FiFileText } from "react-icons/fi";
import { useEffect, useState } from "react";
import {
  fetchUserDetailsById,
  fetchUserUploads,
} from "../store/slices/userSlice";
import { Link, useParams } from "react-router-dom";
import ShareButtons from "../components/ShareButtons";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import FetchUserId from "../utils/FetchUserId";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [uploadsData, setUploadsData] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const id = FetchUserId();

  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      if (!profileData) {
        dispatch(fetchUserDetailsById(userId)).then((data) => {
          setProfileData(data.payload);
        });
      }
      dispatch(fetchUserUploads(userId)).then((data) => {
        setUploadsData(data.payload);
      });
    }
  }, [userId, dispatch, profileData]);

  const toggleShareMenu = (url, title) => {
    setMenuOpen(true);
    setShareLink(url);
    setShareTitle(title);
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied", {
      position: "top-right",
    });
  };

  if (!profileData) {
    return <Loader />;
  }

  return (
    <section className="profile bg-gradient-to-l from-red-100 to-indigo-100 min-h-screen center p-4 ">
      <ToastContainer />
      <div className="container max-w-4xl mx-auto mt-14 mb-4 backdrop-blur-3xl p-6 rounded bg-gray-50 center flex-col">
        <div className="avatar m-auto border-2 h-40 w-40 rounded-full center">
          <h1 className="avatar-text text-6xl font-bold text-indigo-500">
            {profileData.firstName.charAt(0)}
            {profileData.lastName.charAt(0)}
          </h1>
        </div>
        <div className="details w-full bg-gray-200 my-4 rounded p-5">
          <h1 className="text-3xl font-bold text-center mt-4">
            {profileData.firstName} {profileData.lastName}
          </h1>
          <p className="text-center text-gray-500 my-1">
            @{profileData.username}
          </p>
          <p className="text-center text-gray-500 my-1">
            {profileData.university}
          </p>
          {id === profileData._id && (
            <div className="upload-button center my-10">
              <Link to="/uploads">
                <button className="btn btn-primary bg-indigo-600 text-white py-2 px-4 rounded">
                  Upload Document to help buddies!
                </button>
              </Link>
            </div>
          )}
          <div className="documents-statistics my-6 bg-white p-4 rounded border">
            <div className="header p-3">
              <h1 className="font-semibold text-md mb-2">Uploads</h1>
            </div>
            <hr />
            <div className="flex justify-around p-2">
              <div className="uploads center flex-col">
                <span className="font-bold text-2xl">
                  {profileData.uploads.length}
                </span>
                <span>Documents</span>
              </div>
              <div className="uploads center flex-col">
                <span className="font-bold text-2xl">0</span>
                <span>Liked</span>
              </div>
              <div className="uploads center flex-col">
                <span className="font-bold text-2xl">0</span>
                <span>Votes</span>
              </div>
            </div>
          </div>
          <div className="documents-uploaded border m-2 p-4 rounded bg-white max-h-96 overflow-y-auto">
            <div className="header border-b p-4 font-semibold">
              <h1>Uploaded Documents</h1>
            </div>
            <div className="documents-lists m-4">
              <ul className="document-list max-h-96 overflow-y-auto">
                {uploadsData
                  ? uploadsData.map((document) => (
                      <li
                        className="flex justify-between items-center gap-4 border-b p-4 bg-gray-50 rounded hover:bg-gray-100"
                        key={document._id}
                      >
                        <Link
                          to={`/${profileData.username}/${profileData._id}/document/${document.title}/${document._id}/view`}
                        >
                          <div className="flex gap-4 items-center">
                            <div className="document-icon text-2xl text-indigo-800">
                              <FiFileText />
                            </div>
                            <div className="document-details">
                              <h1 className="document-title font-semibold text-indigo-600">
                                {document.title}
                              </h1>
                              <p className="document-subject text-sm text-gray-500">
                                {document.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div className="flex gap-4 items-center">
                          <div className="likes flex items-center text-gray-600">
                            <i className="fas fa-thumbs-up mr-2"></i>
                            <span>{document.like}</span>
                          </div>
                          <div className="share-options">
                            <button
                              className="border rounded py-2 px-4 text-gray-600 hover:bg-gray-100"
                              onClick={() => {
                                const url = `${
                                  import.meta.env.VITE_CLIENT_URL
                                }/${profileData.username}/${
                                  profileData._id
                                }/document/${document.title}/${
                                  document._id
                                }/view`;
                                const title = document.category;
                                toggleShareMenu(url, title);
                              }}
                            >
                              Share
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  : "You haven't uploaded any document yet"}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="share-menu fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg shadow-gray-200 p-6 border border-gray-200 rounded-lg max-w-sm w-full">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-2xl text-indigo-700">Share</h4>
            <button
              className="close-btn text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <ShareButtons
            url={shareLink}
            title={`Hi there! I'm sharing the link of ${shareTitle} with you. Hope it helps!`}
          />
          <h4 className="font-semibold text-gray-700 mt-4 mb-3">
            Share this link
          </h4>
          <div className="share-link flex items-center gap-2">
            <input
              type="text"
              value={shareLink}
              disabled
              className="border border-indigo-300 p-2 rounded-lg w-full bg-gray-100 text-gray-500"
            />
            <button
              className="copy-btn bg-indigo-600 hover:bg-indigo-700 py-2 px-5 text-white text-sm rounded-lg transition-colors"
              onClick={handleCopyClipboard}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
