import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchFileDetails } from "../store/slices/userSlice";

const DocumentView = () => {
  const { fileId, username } = useParams();
  const [fileDetails, setFileDetails] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFileDetails(fileId)).then((data) => {
      setFileDetails(data.payload);
    });
  }, [dispatch, fileId]);

  return (
    <main className="bg-gray-50 min-h-screen  p-6 flex justify-center items-center">
      <div className="container document-viewer flex flex-col gap-4 md:flex-row my-10">
        {/* Document Description */}
        <div className="document-description w-full md:w-4/12 p-4 border-r bg-indigo-100 rounded">
          <div className="text-2xl font-bold flex items-center gap-2 my-4">
            <h2 className="text-gray-800">
              {fileDetails?.title.replace(/\.[^/.]+$/, "")} -
            </h2>
            <p className="text-gray-700">{fileDetails?.description}</p>
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
            <Link to={`/profile/${username}`} className="text-indigo-600 font-semibold hover:text-indigo-700">{username}</Link>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="relative w-full h-screen">
          <iframe
            src="https://res.cloudinary.com/drssactyo/image/upload/v1727077403/BackEnd%20WS-1.pdf.pdf"
            className="w-full h-full rounded object-contain"
            title="file Viewer"
          />
        </div>
      </div>
    </main>
  );
};

export default DocumentView;
