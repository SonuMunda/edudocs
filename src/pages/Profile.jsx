import { useSelector } from "react-redux";
import FetchUserId from "../utils/FetchUserId";
import { FaFileAlt } from "react-icons/fa";
import Loader from "../components/Loader";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const id = FetchUserId();

  if (!user) {
    return <Loader />;
  }

  return (
    <main className="profile bg-indigo-100 min-h-screen center p-4 ">
      <div className="container max-w-4xl mx-auto mt-14 mb-4 bg-white p-6 rounded-lg shadow-lg center flex-col">
        <div className="avatar m-auto border-2 h-40 w-40 rounded-full center">
          <h1 className="avatar-text text-6xl font-bold text-indigo-500">
            {user?.firstName.charAt(0)}
          </h1>
        </div>
        <div className="details w-full bg-gray-100 my-4 rounded-xl p-5">
          <h1 className="text-3xl font-bold text-center mt-4">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-center text-gray-500 my-1">@{user.username}</p>
          <p className="text-center text-gray-500 my-1">{user.university}</p>

          <div className="flex justify-center gap-10 mt-6 font-semibold text-gray-600">
            <div className="followers center flex-col">
              <span>0</span>
              <span>Followers</span>
            </div>
            <div className="following center flex-col">
              <span>0</span>
              <span>Following</span>
            </div>
          </div>

          {id !== user._id ? (
            <button className="btn btn-primary bg-indigo-600 text-white py-2 px-4 rounded-lg">
              Follow
            </button>
          ) : null}

          <div className="level bg-indigo-100 p-5 my-4 rounded-xl">
            <div className="points flex justify-between text-xl font-semibold text-gray-500 my-2 px-6">
              <span>Points</span>
              <span>100</span>
            </div>
            <div className="flex justify-between text-xl font-semibold text-gray-500 my-2 px-6">
              <span>Level</span> <span>1</span>
            </div>
          </div>
          <div className="upload-button center">
            <button className="btn btn-primary bg-indigo-600 text-white py-2 px-4 rounded-lg">
              Upload Document to Earn Points
            </button>
          </div>

          <div className="documents-statistics my-6 bg-white p-4 rounded-lg border">
            <div className="header p-3">
              <h1 className="font-semibold text-md mb-2">Uploads</h1>
            </div>
            <hr />
            <div className="flex justify-around p-2">
              <div className="uploads center flex-col">
                <span className="font-bold text-2xl">0</span>
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

          <div className="documents-uploaded border m-2 p-4 rounded-xl bg-white max-h-96 overflow-y-auto">
            <div className="header border-b p-4 font-semibold">
              <h1>Uploaded Documents</h1>
            </div>
            <div className="documents-lists m-4">
              <ul className="document-list">
                <li className="list-item my-4 border-b py-2 flex">
                  <div className="document-icon">
                    <FaFileAlt size={24} />
                  </div>
                  <div className="document-details">
                    <h1>Document Title</h1>
                    <p>100 pages</p>
                  </div>
                </li>
                <li className="list-item flex justify-between my-4 border-b py-2">
                  <div className="document-icon">
                    <FaFileAlt size={24} />
                  </div>
                  <div className="document-details">
                    <h1>Document Title</h1>
                    <p>100 pages</p>
                  </div>
                </li>
                <li className="list-item flex justify-between my-4 border-b py-2">
                  <div className="document-icon">
                    <FaFileAlt size={24} />
                  </div>
                  <div className="document-details">
                    <h1>Document Title</h1>
                    <p>100 pages</p>
                  </div>
                </li>
                <li className="list-item flex justify-between my-4 border-b py-2">
                  <div className="document-icon">
                    <FaFileAlt size={24} />
                  </div>
                  <div className="document-details">
                    <h1>Document Title</h1>
                    <p>100 pages</p>
                  </div>
                </li>
                <li className="list-item flex justify-between my-4 border-b py-2">
                  <div className="document-icon">
                    <FaFileAlt size={24} />
                  </div>
                  <div className="document-details">
                    <h1>Document Title</h1>
                    <p>100 pages</p>
                  </div>
                </li>
                <li className="list-item flex justify-between my-4 border-b py-2">
                  <div className="document-icon">
                    <FaFileAlt size={24} />
                  </div>
                  <div className="document-details">
                    <h1>Document Title</h1>
                    <p>100 pages</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
