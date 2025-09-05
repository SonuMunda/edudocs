import { useEffect } from "react";
import { fetchLeaderboard } from "../store/slices/leaderboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader"
import { LuTrophy } from "react-icons/lu";

const Leaderboard = () => {
  const { users, status, error } = useSelector((state) => state.leaderboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const sortedUsers = [...users].sort(
    (a, b) => b.uploads.length - a.uploads.length
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main>
      {
        status === "loading" ? (
          <Loader />
        ) : (
          <section className="leader-board min-h-screen  flex items-center justify-center">
            <div className="container max-w-7xl mx-auto px-4 py-24 space-y-8">
              <div className="flex items-center justify-center gap-3">
                <LuTrophy size={28} className="text-yellow-500" />
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Leaderboard
                </h1>
              </div>
              <div className="w-full relative overflow-x-auto">
                <table className="w-full text-sm sm:text-base table-auto bg-white overflow-hidden rounded-3xl shadow-md">
                  <thead>
                    <tr className="uppercase border-b border-gray-200 bg-gray-50">
                      <th scope="col" className="p-4 font-semibold text-gray-800 min-w-[80px]">Rank</th>
                      <th scope="col" className="p-4 font-semibold text-gray-800 text-left min-w-[150px]">Name</th>
                      <th scope="col" className="p-4 font-semibold text-gray-800 text-left min-w-[120px]">Username</th>
                      <th scope="col" className="p-4 font-semibold text-gray-800 text-left min-w-[200px]">University</th>
                      <th scope="col" className="p-4 font-semibold text-gray-800 text-center min-w-[120px]">Contributions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedUsers.map((user, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="p-4 font-medium text-gray-900 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${index === 0
                                ? "bg-yellow-100 text-yellow-600"
                                : index === 1
                                  ? "bg-gray-200 text-gray-600"
                                  : index === 2
                                    ? "bg-amber-100 text-amber-600"
                                    : "text-gray-600"
                              }`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-gray-900" scope="row">
                          {user?.firstName || "N/A"}
                        </td>
                        <td className="p-4 text-gray-600">
                          <Link
                            to={`/profile/${user?.username}`}
                            className="hover:text-blue-600 focus:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-colors duration-200"
                          >
                            {user?.username || "N/A"}
                          </Link>
                        </td>
                        <td className="p-4 text-gray-600">
                          {user?.university || "Not mentioned"}
                        </td>
                        <td className="p-4 text-gray-600 text-center">
                          {user?.uploads?.length || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )
      }
    </main>
  );
};

export default Leaderboard;
