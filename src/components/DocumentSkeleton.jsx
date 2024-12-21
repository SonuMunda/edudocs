import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DocumentSkeleton = () => {
  return (
    <div className="document-card h-full bg-gray-50 p-4 rounded-2xl border-2 shadow">
      <div className="document-image overflow-hidden rounded-xl">
        <Skeleton height={144} className="sm:h-56" />
      </div>
      <h4 className="text-sm font-bold mt-4 sm:text-lg">
        <Skeleton width="60%" />
      </h4>
    </div>
  );
};

export default DocumentSkeleton;
