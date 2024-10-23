import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import ShareButtons from "./ShareButtons";

const ShareMenu = ({ shareLink, shareTitle, menuOpen, setMenuOpen }) => {
  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied", {
      position: "top-right",
    });
  };

  if (!menuOpen) return null;

  return (
    <div className="share-menu fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 border border-gray-200 rounded-lg max-w-sm w-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-2xl text-indigo-700">Share</h4>
        <button
          className="close-btn text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>
      </div>
      <ShareButtons
        url={shareLink}
        title={`Hi there! I'm sharing the link of ${shareTitle} with you. Hope it helps!`}
      />
      <h4 className="font-semibold text-gray-700 mt-4 mb-3">Share this link</h4>
      <div className="share-link flex items-center gap-2">
        <input
          type="text"
          value={shareLink}
          disabled
          className="border border-indigo-300 p-2 rounded-lg w-full bg-gray-100 text-gray-500"
        />
        <button
          className="copy-btn bg-indigo-600 hover:bg-indigo-700 py-2 px-5 text-white text-sm rounded-lg transition-colors"
          onClick={handleCopyClipboard}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ShareMenu;
