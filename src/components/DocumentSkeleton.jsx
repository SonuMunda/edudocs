import Skeleton from "react-loading-skeleton";

const DocumentSkeleton = () => {
  return (
    <div className="note-card bg-gray-100 h-full p-4 rounded-lg shadow">
      <div className="document-image h-64 overflow-hidden">
        <Skeleton height={256} />
      </div>
      <div className="details bg-white my-2 p-2">
        <h4 className="text-xl font-bold">
          <Skeleton width={150} />
        </h4>
        <p className="text-gray-600">
          <Skeleton count={2} />
        </p>
      </div>
    </div>
  );
};

export default DocumentSkeleton;
