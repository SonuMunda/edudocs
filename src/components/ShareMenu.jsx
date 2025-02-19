import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import ShareButtons from "./ShareButtons";
import { FaCopy } from "react-icons/fa6";
import PropTypes from "prop-types";

const ShareMenu = ({ shareLink, shareTitle, menuOpen, setMenuOpen }) => {
  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied", {
      position: "top-right",
    });
  };

  if (!menuOpen) return null;

  return (
    <div
      className="h-full w-full fixed top-0 left-0 center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={() => setMenuOpen(false)}
    >
      <div className="share-menu relative p-4 w-96 bg-white border rounded">
        <div className="flex items-center justify-between pb-2 border-b border-gray-400">
          <h4 className="font-bold text-2xl text-blue-700">Share</h4>
          <button
            className="close-btn text-gray-600 hover:text-gray-700 transition-colors absolute top-0 right-0 p-4 bg-gray-100 rounded hover:bg-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <ShareButtons
          url={shareLink}
          title={`Hi there! I'm sharing the link of ${shareTitle} with you. Hope it helps!`}
        />
        <h4 className="font-semibold text-gray-900 mt-4 mb-3">
          Share this link
        </h4>
        <div className="share-link flex items-center gap-2">
          <input
            type="text"
            value={shareLink}
            disabled
            className="ring-1 ring-gray-300 p-2 rounded w-full bg-gray-100 text-gray-500"
          />
          <button
            className="copy-btn bg-blue-600 hover:bg-blue-700 py-3 px-5 text-white text-sm rounded-lg transition-colors"
            onClick={handleCopyClipboard}
          >
            <FaCopy size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;

ShareMenu.propTypes = {
  shareLink: PropTypes.string,
  shareTitle: PropTypes.string,
  menuOpen: PropTypes.bool,
  setMenuOpen: PropTypes.func,
};
