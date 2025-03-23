import { useEffect } from "react";
import { fetchLeaderboard } from "../store/slices/leaderboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { users, status, error } = useSelector((state) => state.leaderboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const sortedUsers = [...users].sort(
    (a, b) => b.uploads.length - a.uploads.length
  );

  const getRankDisplay = (index) => {
    const medals = ["🥇", "🥈", "🥉"];
    return index < 3 ? (
      <span className="text-2xl">{medals[index]}</span>
    ) : (
      index + 1
    );
  };

  return (
    <section className="leader-board flex justify-center">
      <div className="container max-w-full sm:max-w-6xl min-h-screen bg-white rounded p-4 mt-16">
        <h1 className="text-3xl font-bold text-center text-gray-800 my-6">
          🏆 Leaderboard
        </h1>
        <div className="w-full relative overflow-x-auto">
          <table className="w-full text-sm table-auto border">
            <thead>
              <tr className="uppercase border-b bg-gray-100">
                <th className="p-2">Rank</th>
                <th className="p-2">User</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Username</th>
                <th className="p-2 text-left">University</th>
                <th className="p-2">Contributions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-2 font-semibold text-gray-800 flex items-center justify-center gap-2">
                    {getRankDisplay(index)}
                  </td>
                  <td className="p-2 text-gray-800 font-semibold text-center">
                    <div className="profile-image bg-blue-600 rounded-full h-10 w-10 center mx-auto text-white">
                      <span>{user?.firstName.charAt(0)}</span>
                      <span>{user?.lastName.charAt(0)}</span>
                    </div>
                  </td>
                  <td className="p-2 text-gray-800 font-semibold">
                    <span>{user?.firstName}</span>
                  </td>
                  <td className="p-2 text-gray-600">
                    <Link to={`/profile/${user?.username}`} className="hover:text-blue-600">{user?.username}</Link>
                  </td>
                  <td className="p-2 text-gray-600">
                   {user?.university || "Not mentioned"}
                  </td>
                  <td className="p-2 text-gray-600 text-center">
                    {user?.uploads.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
