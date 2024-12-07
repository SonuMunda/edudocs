import {
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  XIcon,
} from "react-share";

import PropTypes from "prop-types";

const ShareButtons = ({ url, title }) => {
  return (
    <div className="flex items-center justify-around my-6">
      <WhatsappShareButton url={url} title={title} className="center flex-col">
        <WhatsappIcon size={36} round />
        <p className="text-sm text-gray-600">Whatsapp</p>
      </WhatsappShareButton>
      <FacebookShareButton url={url} title={title} className="center flex-col">
        <FacebookIcon size={36} round />
        <p className="text-sm text-gray-600">Facebook</p>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} className="center flex-col">
        <XIcon size={36} round />
        <p className="text-sm text-gray-600">X</p>
      </TwitterShareButton>
      <EmailShareButton url={url} title={title} className="center flex-col">
        <EmailIcon size={36} round />
        <p className="text-sm text-gray-600">Email</p>
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;

ShareButtons.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};
