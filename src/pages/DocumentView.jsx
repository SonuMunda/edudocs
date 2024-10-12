import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {fileDetails?.title.replace(/\.[^/.]+$/, "")}
          </h2>
          <p className="text-gray-600 mb-6">
          {fileDetails?.description}
          </p>

          <div className="course mb-2">
            <h4 className="text-md ">Course</h4>
            <p className="text-sm text-gray-500">{fileDetails?.course}</p>
          </div>

          <div className="university mb-2">
            <h4 className="text-md ">University</h4>
            <p className="text-sm text-gray-500">{fileDetails?.university}</p>
          </div>

          <div className="academic-year mb-2">
            <h4 className="text-md ">Academic Year</h4>
            <p className="text-sm text-gray-500">{fileDetails?.session}</p>
          </div>

          <div className="owner mb-2">
            <h4 className="text-md ">Uploaded by</h4>
            <p className="text-sm text-gray-500">{username}</p>
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
