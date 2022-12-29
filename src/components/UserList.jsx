import "./userlist.css";
import Pagination from "./Pagination";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import EditUser from "./EditUser";

function UserList({ filterUsers, users, updateUsers }) {
  let list = [];

  const [checkAll, updateCheckAll] = useState(false);
  const [select, updateSelected] = useState([]);
  const [pageNo, updatePageNo] = useState(1);
  const [edit, updateEdit] = useState(false);

  useEffect(() => {
    // deSelect();
    updateSelected([]);
    document.querySelector(".user-all-checkbox").childNodes[0].checked = false;
    updateCheckAll(false);
  }, [pageNo, filterUsers]);
  // useEffect(() => {
  //   console.log(select);
  // });
  useEffect(() => {
    if (
      select.length === usersDisplayedThisPage().length &&
      usersDisplayedThisPage().length !== 0
    ) {
      document.querySelector(".user-all-checkbox").childNodes[0].checked = true;
      updateCheckAll(true);
    } else {
      document.querySelector(
        ".user-all-checkbox"
      ).childNodes[0].checked = false;
      updateCheckAll("partial");
    }
  }, [select]);

  useEffect(() => {
    if (checkAll === true) selectAll();
    else if (checkAll === false) {
      deSelectAll();
      updateSelected([]);
    }
  }, [checkAll]);

  function selectAll() {
    select.forEach((id) => {
      // console.log(`user${id}`);
      document.getElementById(`user${id}`).classList.add("checked");
      document.getElementById(id).checked = true;
    });
  }

  function deSelectAll() {
    select.forEach((id) => {
      document.getElementById(`user${id}`).classList.remove("checked");
      document.getElementById(id).checked = false;
    });
  }

  // function deSelect() {
  //   select.forEach((id) => {
  //     try {
  //       document.getElementById(`user${id}`).classList.remove("checked");
  //       document.getElementById(id).checked = false;
  //     } catch (e) {}
  //   });
  // }

  function handleSelectAllChange(e) {
    // console.log(e.target.checked);
    if (e.target.checked) {
      const selAll = usersDisplayedThisPage().map((item) => +item.id);
      updateSelected([...selAll]);
      updateCheckAll(true);
    } else {
      updateCheckAll(false);
    }
  }

  function pagesCount() {
    if (filterUsers.length === 0) return 1;
    else if (filterUsers.length % 10 === 0) return filterUsers.length / 10;
    else return Math.floor(filterUsers.length / 10) + 1;
  }

  function usersDisplayedThisPage() {
    if (pageNo === 1) {
      list = filterUsers.slice(0, 10);
    } else if (filterUsers.length < pageNo * 10) {
      list = filterUsers.slice((pageNo - 1) * 10);
    } else {
      list = filterUsers.slice((pageNo - 1) * 10, pageNo * 10);
    }
    return list;
  }

  function handleChangeCheckbox(e) {
    const id = +e.target.id;
    const userTab = document.getElementById(`user${id}`);
    if (userTab.classList.contains("checked")) {
      // console.log(select, "constains");
      const updatedlist = select.filter((itemId) => itemId !== id);
      updateSelected([...updatedlist]);
      userTab.classList.remove("checked");
    } else {
      updateSelected([...select, id]);
      userTab.classList.add("checked");
    }
  }

  function handleDeleteEditUser(e) {
    if (e.target.classList.contains("delete-user")) {
      // console.log(+e.target.parentNode.parentNode.id.split("user")[1]);
      const id = e.target.parentNode.parentNode.id.split("user")[1];
      const updatedUsersList = users.filter((user) => user.id !== id);
      updateUsers(updatedUsersList);
    } else if (e.target.classList.contains("edit-user")) {
      const id = e.target.parentNode.parentNode.id;
      updateEdit(id);
      // console.log(id);
    } else return;
  }

  function check(id) {
    return select.includes(+id);
  }

  return (
    <>
      <div className="users">
        <div className="user-titles">
          <div className="user-all-checkbox">
            <input onChange={handleSelectAllChange} type="checkbox" />
          </div>
          <div className="title">
            <p>Name</p>
          </div>
          <div className="title">
            <p>Email</p>
          </div>
          <div className="title">
            <p>Role</p>
          </div>
          <div className="title">
            <p>Actions</p>
          </div>
        </div>
        <div onClick={handleDeleteEditUser} className="user-list">
          {usersDisplayedThisPage().map((item) => {
            return (
              <div className="user" id={`user${item.id}`} key={item.id}>
                {`user${item.id}` === edit ? (
                  <EditUser
                    users={users}
                    updateUsers={updateUsers}
                    updateEdit={updateEdit}
                    handleChangeCheckbox={handleChangeCheckbox}
                    item={item}
                    check={check(item.id)}
                  />
                ) : (
                  <>
                    <div className="user-checkbox">
                      <input
                        onChange={handleChangeCheckbox}
                        id={item.id}
                        type="checkbox"
                        checked={check(item.id)}
                      />
                    </div>
                    <div className="user-data">
                      <p>{item.name}</p>
                    </div>
                    <div className="user-data">
                      <p>{item.email}</p>
                    </div>
                    <div className="user-data">
                      <p>{item.role}</p>
                    </div>
                    <div className="user-data action">
                      <button className="action-btn edit-user">
                        <PencilSquareIcon className="h-6 w-6 text-blue-500 action-icon" />
                      </button>
                      <button className="action-btn delete-user">
                        <TrashIcon className="h-6 w-6 text-blue-500 action-icon trash" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        pageNo={pageNo}
        updatePageNo={updatePageNo}
        pagesCount={pagesCount()}
        users={users}
        updateUsers={updateUsers}
        select={select}
      />
    </>
  );
}

export default UserList;
