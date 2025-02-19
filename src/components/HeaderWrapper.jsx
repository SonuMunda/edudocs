import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const HeaderWrapper = (props) => {
  const location = useLocation();
  return props.noRenderPaths &&
    props.noRenderPaths.includes(location.pathname) ? (
    <></>
  ) : (
    <>{props.children}</>
  );
};

export default HeaderWrapper;

HeaderWrapper.propTypes = {
  noRenderPaths: PropTypes.array,
  children: PropTypes.node,
};
