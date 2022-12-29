import SearchBar from "./SearchBar";
import UserList from "./UserList";

import "./adminpage.css";
import axios from "axios";
import { useEffect, useState } from "react";

function AdminPage() {
  const [users, updateUsers] = useState([]);
  const [filterUsers, updateFilterUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    updateFilterUsers(users);
  }, [users]);

  async function getUsers() {
    try {
      const responce = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      // console.log(responce.data);
      updateUsers(responce.data);
      updateFilterUsers(responce.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <SearchBar users={users} updateFilterUsers={updateFilterUsers} />
      <UserList
        filterUsers={filterUsers}
        users={users}
        updateUsers={updateUsers}
      />
    </div>
  );
}

export default AdminPage;
