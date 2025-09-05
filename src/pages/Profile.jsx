import { useDispatch, useSelector } from "react-redux";
import { FiFileText } from "react-icons/fi";
import { useEffect, useState } from "react";
import { fetchUserDetailsByUsername } from "../store/slices/userSlice";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FetchUserId from "../utils/FetchUserId";
import { MdBarChart, MdFolder, MdRocketLaunch, MdThumbUp } from "react-icons/md";
import ShareMenu from "../components/ShareMenu";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchUserUploads } from "../store/slices/userDocumentsSlice";

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state?.user);
  const { documents, isDocumentsLoading } = useSelector(
    (state) => state?.userDocuments
  );

  const [shareLink, setShareLink] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const id = FetchUserId();

  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetailsByUsername(username));
  }, [username, dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserUploads({ userId: user?._id }));
    }
  }, [user?._id, dispatch]);

  const totalLikes = documents?.reduce((total, document) => {
    return total + document.likes.length;
  }, 0);

  const totalVotes = documents?.reduce((total, document) => {
    return total + document.votes.length;
  }, 0);

  const toggleShareMenu = (url, title) => {
    setMenuOpen(true);
    const encodedUrl = encodeURI(url);
    setShareLink(encodedUrl);
    setShareTitle(title);
  };

  return (
    <section className="profile min-h-screen center">
      <ToastContainer />
      <div className="container max-w-7xl mx-auto px-4 py-20">

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row gap-10 items-center bg-white shadow-md p-6 rounded-2xl">
          {isLoading ? (
            <Skeleton circle={true} height={160} width={160} />
          ) : (
            <div className="avatar bg-gradient-to-br from-blue-500 to-indigo-600 text-white border h-40 w-40 rounded-full flex items-center justify-center shadow-lg">
              <h1 className="avatar-text text-5xl font-extrabold drop-shadow-md">
                {user?.firstName.charAt(0)}
                {user?.lastName.charAt(0)}
              </h1>
            </div>
          )}

          <div className="account-info text-center sm:text-left px-4">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
              {isLoading ? (
                <Skeleton height={40} width={300} />
              ) : (
                <span>
                  {user?.firstName} {user?.lastName}
                </span>
              )}
            </h1>

            <p className="text-gray-500 text-lg mb-1">
              {isLoading ? (
                <Skeleton height={20} width={300} />
              ) : (
                <span>@{user?.username}</span>
              )}
            </p>

            <p className="text-gray-500 text-lg">
              {isLoading ? (
                <Skeleton height={20} width={300} />
              ) : (
                <span>{user?.university || "University not mentioned"}</span>
              )}
            </p>
          </div>
        </div>

        {/* Upload Button */}
        {id === user?._id && (
          <div className="upload-button flex justify-center mt-10">
            <Link to="/uploads">
              <button className="btn bg-blue-600 flex items-center justify-center gap-4 hover:bg-blue-700 transition-colors duration-300 text-white py-3 px-6 rounded-xl shadow-md font-semibold">
                <MdRocketLaunch size={24} /> Upload Document to help buddies!
              </button>
            </Link>
          </div>
        )}

        {/* Statistics */}
        <div className="details w-full mx-auto my-10 rounded-2xl">
          <div className="documents-statistics my-6 bg-white shadow-md p-6 rounded-2xl border">
            <div className="header mb-4">
              <h1 className="flex items-center gap-2 font-semibold text-lg text-gray-800"><MdBarChart size={24} color="#495aeb"/> Uploads</h1>
            </div>
            <hr className="mb-4" />
            {isLoading ? (
              <Skeleton height={80} />
            ) : (
              <div className="flex justify-around p-2">
                <div className="uploads center flex-col">
                  <span className="font-bold text-3xl">{user?.uploads.length || 0}</span>
                  <span className="text-gray-600">Documents</span>
                </div>
                <div className="uploads center flex-col">
                  <span className="font-bold text-3xl">{totalLikes || 0}</span>
                  <span className="text-gray-600">Likes</span>
                </div>
                <div className="uploads center flex-col">
                  <span className="font-bold text-3xl">{totalVotes || 0}</span>
                  <span className="text-gray-600">Votes</span>
                </div>
              </div>
            )}
          </div>

          {/* Documents List */}
          <div className="documents-uploaded shadow-md my-6 p-6 rounded-2xl bg-white">
            <div className="header border-b pb-4 font-semibold text-gray-800 text-lg flex items-center gap-2">
              <MdFolder size={24} color="orange" /> <h1>Uploaded Documents</h1>
            </div>
            <div className="documents-lists my-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
              <ul className="document-list">
                {isDocumentsLoading ? (
                  <Skeleton height={80} count={4} />
                ) : documents.length > 0 ? (
                  documents.map((document) => (
                    <li
                      className="flex flex-col sm:flex-row justify-between gap-4 border-b p-4 my-2 bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-sm"
                      key={document._id}
                    >
                      <Link
                        to={`/${user?.username}/${user?._id}/document/${document.title}/${document._id}/view`}
                        className="flex gap-4 items-center"
                      >
                        <div className="document-icon text-3xl text-blue-600">
                          <FiFileText />
                        </div>
                        <div className="document-details">
                          <h1 className="document-title font-semibold text-blue-600 hover:underline">
                            {document.title}
                          </h1>
                          <p className="document-subject text-sm text-gray-500">
                            {document.description}
                          </p>
                        </div>
                      </Link>
                      <div className="flex gap-4 items-center">
                        <div className="likes flex items-center text-gray-600">
                          <MdThumbUp size={20} className="mx-2 text-blue-500" />
                          <span>{document.likes.length}</span>
                        </div>
                        <div className="share-options">
                          <button
                            className="rounded-lg py-2 px-4 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition shadow-md"
                            onClick={() => {
                              const url = `${import.meta.env.VITE_CLIENT_URL}/${user?.username}/${user?._id}/document/${document.title}/${document._id}/view`;
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
                ) : (
                  <p className="text-gray-500 flex items-center gap-2 text-center py-6 italic">
                    {id == user?._id ? "You" : "User"}<span>haven’t uploaded any documents yet.</span>
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Share Menu */}
      <ShareMenu
        shareLink={shareLink}
        shareTitle={shareTitle}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </section>
  );
};

export default Profile;
