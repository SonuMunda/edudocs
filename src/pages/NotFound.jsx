
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="center min-h-screen">
      <div className="container max-w-lg md:max-w-6xl flex flex-col-reverse items-center justify-around md:flex-row gap-10 p-4">
        <div className="content p-4">
          <h1 className="text-4xl font-bold text-gray-800">So Sorry</h1>
          <p className="text-gray-700 text-3xl font-bold my-4">
            The page you are looking for cannot be found
          </p>

          <p className="text-gray-700 font-semibold mb-2">Possible reasons</p>

          <ul className="list-disc px-6">
            <li className="text-gray-600">
              The address may have been typed incorrectly.
            </li>
            <li className="text-gray-600">
              The page may have been moved or deleted.
            </li>
            <li className="text-gray-600">Go back to the previous page.</li>
          </ul>

          <button className="btn py-2 px-4 rounded mt-4 bg-gray-700 text-gray-200 hover:bg-gray-500 ">
            <Link to="/">EduDocs Home</Link>
          </button>
        </div>
        <img
          src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif"
          alt="404"
          className="rounded-lg  md:w-2/4 mx-auto"
        />
      </div>
    </div>
  );
};

export default NotFound;
