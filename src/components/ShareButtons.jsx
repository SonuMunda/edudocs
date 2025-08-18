import {
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "react-share";

import PropTypes from "prop-types";
import { FaEnvelope, FaFacebookF, FaPaperPlane,  FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const ShareButtons = ({ url, title }) => {
  return (
    <div className="share-btns space-y-3">
      <h4 className="font-semibold text-gray-900">
        Share this link via
      </h4>
      <div className="flex items-center justify-around">
        <WhatsappShareButton url={url} title={title} >
          <div className="icon text-green-500 border-2 border-green-500 p-2 rounded-full hover:bg-green-500 hover:text-white">
            <FaWhatsapp size={24} />
          </div>
        </WhatsappShareButton>
        <FacebookShareButton url={url} title={title} >
          <div className="icon text-blue-500 border-2 border-blue-500 p-2 rounded-full hover:bg-blue-500 hover:text-white">
            <FaFacebookF size={24} />
          </div>
        </FacebookShareButton>
        <TelegramShareButton url={url} title={title}>
          <div className="icon text-neutral-500 border-2 border-neutral-500 p-2 rounded-full hover:bg-neutral-500 hover:text-white">
            <FaPaperPlane size={24} />
          </div>
        </TelegramShareButton>
        <TwitterShareButton url={url} title={title} >
          <div className="icon text-neutral-950 border-2 border-neutral-950 p-2 rounded-full hover:bg-neutral-950 hover:text-white">
            <FaXTwitter size={24} />
          </div>
        </TwitterShareButton>
        <EmailShareButton url={url} title={title} >
          <div className="icon text-orange-500 border-2 border-orange-500 p-2 rounded-full hover:bg-orange-500 hover:text-white">
            <FaEnvelope size={24} />
          </div>
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;

ShareButtons.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};
