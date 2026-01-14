import Appbar from '../components/Appbar';
import Users from '../components/Users';

const Dashboard = () => {
  return (
    <div className="h-screen w-full">
      <Appbar />
      {/* Balance */}
      <div className="mt-4 font-bold text-3xl ml-4">
        <h2>Your Balance $5000</h2>
      </div>

      {/* Search Section */}
      <div className="p-4 w-full">
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
