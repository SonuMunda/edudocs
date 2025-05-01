import { useDispatch, useSelector } from "react-redux";
import { FiFileText } from "react-icons/fi";
import { useEffect, useState } from "react";
import { fetchUserDetailsByUsername } from "../store/slices/userSlice";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import FetchUserId from "../utils/FetchUserId";
import { MdThumbUp } from "react-icons/md";
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
  }, []);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserUploads({ userId: user?._id }));
    }
  }, [user?._id]);

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
    <section className="profile min-h-screen center p-4">
      <ToastContainer />
      <div className="container max-w-4xl mx-auto mt-14 mb-4  center flex-col">
        {isLoading ? (
          <Skeleton circle={true} height={160} width={160} />
        ) : (
          <div className="avatar m-auto bg-white border h-40 w-40 rounded-full center">
            <h1 className="avatar-text text-5xl font-bold text-blue-500">
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </h1>
          </div>
        )}

        <div className="details w-full mx-auto my-4 rounded">
          <h1 className="text-3xl font-bold text-center mt-4">
            {isLoading ? (
              <Skeleton height={40} width={360} />
            ) : (
              <span>
                {user?.firstName} {user?.lastName}
              </span>
            )}
          </h1>

          <p className="text-center text-gray-500 my-1">
            {isLoading ? (
              <Skeleton height={20} width={360} />
            ) : (
              <span>@{user?.username}</span>
            )}
          </p>

          <p className="text-center text-gray-500 my-1">
            {isLoading ? (
              <Skeleton height={20} width={360} />
            ) : (
              <span>{user?.university || "University not mentioned"}</span>
            )}
          </p>
          {id === user?._id && (
            <div className="upload-button center my-10">
              <Link to="/uploads">
                <button className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
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
            {isLoading ? (
              <Skeleton height={80} />
            ) : (
              <div className="flex justify-around p-2">
                <div className="uploads center flex-col">
                  <span className="font-bold text-2xl">
                    {user?.uploads.length || 0}
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
            )}
          </div>
          <div className="documents-uploaded shadow my-2 p-4 rounded bg-white">
            <div className="header border-b p-4 font-semibold">
              <h1>Uploaded Documents</h1>
            </div>
            <div className="documents-lists my-4 max-h-96 overflow-y-auto">
              <ul className="document-list">
                {isDocumentsLoading ? (
                  <Skeleton height={80} count={4} />
                ) : documents ? (
                  documents.map((document) => (
                    <li
                      className="flex flex-col sm:flex-row justify-between gap-4 border-b p-4 my-2 bg-gray-100 rounded "
                      key={document._id}
                    >
                      <Link
                        to={`/${user?.username}/${user?._id}/document/${document.title}/${document._id}/view`}
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
                          <MdThumbUp size={20} className="mx-2 text-blue-500" />
                          <span>{document.likes.length}</span>
                        </div>
                        <div className="share-options">
                          <button
                            className="border rounded py-2 px-4 text-white bg-blue-500"
                            onClick={() => {
                              const url = `${import.meta.env.VITE_CLIENT_URL}/${
                                user?.username
                              }/${user?._id}/document/${document.title}/${
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
                ) : (
                  `${
                    id == user?._id ? "You" : "User"
                  } haven't uploaded any document yet`
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
