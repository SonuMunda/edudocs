import logo from "../assets/images/logo.png";

function Logo() {
  return (
    <div className="logo sm:hidden flex flex-col items-center">
      <div className="logo-img rounded-full p-4 bg-white">
        <img src={logo} alt="EduDocs" className="h-16" />
      </div>
      {/* <h2 className="text-3xl font-bold text-blue-500">
        <span className="text-black">Edu</span>Docs
      </h2> */}
    </div>
  );
}

export default Logo;
