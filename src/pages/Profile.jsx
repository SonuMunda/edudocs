import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { FiFileText } from "react-icons/fi";
import { useEffect, useState } from "react";
import {
  fetchUserDetailsByUsername,
  fetchUserUploads,
} from "../store/slices/userSlice";
import { Link, useParams } from "react-router-dom";
import ShareButtons from "../components/ShareButtons";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import FetchUserId from "../utils/FetchUserId";
import { MdThumbUp } from "react-icons/md";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [uploadsData, setUploadsData] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const id = FetchUserId();

  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(username);
    dispatch(fetchUserDetailsByUsername(username));

    if (username) {
      if (!profileData) {
        dispatch(fetchUserDetailsByUsername(username)).then((data) => {
          setProfileData(data.payload);
        });
      }
      dispatch(fetchUserUploads(profileData?._id)).then((data) => {
        setUploadsData(data.payload);
      });
    }
  }, [username, dispatch, profileData]);

  const totalLikes = uploadsData?.reduce((total, document) => {
    return total + document.likes.length;
  }, 0);

  const totalVotes = uploadsData?.reduce((total, document) => {
    return total + document.votes.length;
  }, 0);

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
    <section className="profile bg-blue-200 min-h-screen center p-4">
      <ToastContainer />
      <div className="container max-w-4xl mx-auto mt-14 mb-4 backdrop-blur-3xl center flex-col">
        <div className="avatar m-auto bg-neutral-100 border-2 h-40 w-40 rounded-full center">
          <h1 className="avatar-text text-5xl font-bold text-blue-500">
            {profileData.firstName.charAt(0)}
            {profileData.lastName.charAt(0)}
          </h1>
        </div>
        <div className="details w-full  my-4 rounded">
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
                <button className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
                  Upload Document to help buddies!
                </button>
              </Link>
            </div>
          )}
          <div className="documents-statistics my-6 bg-blue-100 p-4 rounded-3xl border">
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
                <span className="font-bold text-2xl">{totalLikes || 0}</span>
                <span>Likes</span>
              </div>
              <div className="uploads center flex-col">
                <span className="font-bold text-2xl">{totalVotes || 0}</span>
                <span>Votes</span>
              </div>
            </div>
          </div>
          <div className="documents-uploaded shadow my-2 p-4 rounded-3xl bg-blue-100 max-h-96 overflow-y-auto">
            <div className="header border-b p-4 font-semibold">
              <h1>Uploaded Documents</h1>
            </div>
            <div className="documents-lists my-4">
              <ul className="document-list max-h-96">
                {uploadsData
                  ? uploadsData.map((document) => (
                      <li
                        className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b p-4 my-2 bg-blue-50 rounded-3xl "
                        key={document._id}
                      >
                        <Link
                          to={`/${profileData.username}/${profileData._id}/document/${document.title}/${document._id}/view`}
                        >
                          <div className="flex gap-4 items-center">
                            <div className="document-icon text-2xl text-blue-600">
                              <FiFileText />
                            </div>
                            <div className="document-details">
                              <h1 className="document-title font-semibold text-blue-600">
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
                            <MdThumbUp
                              size={20}
                              className="mx-2 text-blue-500"
                            />
                            <span>{document.likes.length}</span>
                          </div>
                          <div className="share-options">
                            <button
                              className="border rounded py-2 px-4 text-gray-800 bg-blue-100 rounded-3xl"
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
                  : `${
                      id == profileData._id ? "You" : "User"
                    } haven't uploaded any document yet`}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="share-menu fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg shadow-gray-200 p-6 border border-gray-200 rounded-3xl max-w-sm w-full">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-2xl text-blue-700">Share</h4>
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
              className="border border-blue-300 p-2 rounded-lg w-full bg-gray-100 text-gray-500"
            />
            <button
              className="copy-btn bg-blue-600 hover:bg-blue-700 py-2 px-5 text-white text-sm rounded-lg transition-colors"
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
