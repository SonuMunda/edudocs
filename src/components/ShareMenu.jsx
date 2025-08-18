
import { toast } from "react-toastify";
import ShareButtons from "./ShareButtons";
import { FaCopy } from "react-icons/fa6";
import { LuX } from "react-icons/lu"
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
      className="h-full w-full fixed top-0 left-0 center p-4 z-10 bg-neutral-950/50 backdrop-blur"
      onClick={() => setMenuOpen(false)}
    >
      <div className="share-menu relative p-6 w-full max-w-md space-y-6 bg-white border rounded-3xl">
        <div className="flex items-center justify-between border-b border-gray-400">
          <h4 className="font-semibold text-2xl text-neutral-700">Share</h4>
          <button
            className="close-btn text-gray-600 hover:text-gray-700 transition-colors  p-4  rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            <LuX size={24} />
          </button>
        </div>
        <ShareButtons
          url={shareLink}
          title={`Hi there! I'm sharing the link of ${shareTitle} with you. Hope it helps!`}
        />

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">
            Or copy
          </h4>

          <div className="share-link flex items-center gap-2">
            <input
              type="text"
              value={shareLink}
              disabled
              className="ring-1 ring-gray-300 p-4 rounded-full w-full bg-gray-100 text-gray-500"
            />
            <button
              className="copy-btn bg-blue-600 hover:bg-blue-700 py-4 px-5 text-white text-sm rounded-full transition-colors"
              onClick={handleCopyClipboard}
            >
              <FaCopy size={20} />
            </button>
          </div>
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
