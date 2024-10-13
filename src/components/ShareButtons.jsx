import {
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
const ShareButtons = ({ url, title }) => {
  return (
    <div className="flex items-center justify-around gap-8 my-4">
      <WhatsappShareButton url={url} title={title} className="center flex-col">
        <WhatsappIcon size={36} round />
        <p className="text-sm text-gray-600">Whatsapp</p>
      </WhatsappShareButton>
      <FacebookShareButton url={url} title={title} className="center flex-col">
        <FacebookIcon size={36} round />
        <p className="text-sm text-gray-600">Facebook</p>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} className="center flex-col">
        <TwitterIcon size={36} round />
        <p className="text-sm text-gray-600">Twitter</p>
      </TwitterShareButton>
      <EmailShareButton url={url} title={title} className="center flex-col">
        <EmailIcon size={36} round />
        <p className="text-sm text-gray-600">Email</p>
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;
