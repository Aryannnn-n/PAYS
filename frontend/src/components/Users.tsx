import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/user/get-friends?filter=' + filter)
      .then((res) => {
        setUsers(res.data.users);
      });
  }, [filter]);

  return (
    <>
      <div className="w-full text-center">
        <div className="text-lg font-semibold">Users</div>
        <div className=" text-center">
          <input
            placeholder="Search friends"
            className="w-[90%] border rounded p-2"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </div>
        {users.map((user) => (
          <User key={user.firstName} user={user} />
        ))}
      </div>
    </>
  );
};

export default Users;

const User = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={() => {
            navigate('/send?id=' + user._id + '&name=' + user.firstName);
          }}
          label={'Send Money'}
        />
      </div>
    </div>
  );
};
