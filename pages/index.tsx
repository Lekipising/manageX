import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  // fetch users from DB using prisma client
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users/get");
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        {users.map((usr) => (
          <p key={usr.id}>{usr.name}</p>
        ))}
      </div>
    </div>
  );
}
