import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DocumentCard = ({ document }) => {
  return (
    <Link
      to={`/${document.username}/${document.uploadedBy}/document/${document.title}/${document._id}/view`}
      key={document._id}
    >
      <div className="document-card h-full bg-gray-50 p-4 rounded-2xl border-2 shadow">
        <div className="document-image overflow-hidden rounded-xl">
          <img
            src={
              document.url.endsWith(".doc") || document.url.endsWith(".docx")
                ? `${document.url}.jpg`
                : document.url.replace(/\.[^/.]+$/, ".jpg")
            }
            alt={document.title.replace(/\.[^/.]+$/, "")}
            className="object-cover w-full h-36 sm:h-56"
          />
        </div>
        <h4 className="text-sm font-bold mt-4 sm:text-lg">
          {document.title.replace(/\.[^/.]+$/, "")}
        </h4>
      </div>
    </Link>
  );
};

DocumentCard.propTypes = {
  document: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    uploadedBy: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default DocumentCard;
