import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import "./edituser.css";

function EditUser({
  item,
  handleChangeCheckbox,
  updateEdit,
  users,
  updateUsers,
  check,
}) {
  const [name, updateName] = useState(item.name);
  const [email, updateEmail] = useState(item.email);
  const [role, updateRole] = useState(item.role);

  function handleChangeName(e) {
    updateName(e.target.value);
  }
  function handleChangeEmail(e) {
    updateEmail(e.target.value);
  }
  function handleChangeRole(e) {
    updateRole(e.target.value);
  }

  function handleClickCancel(e) {
    updateEdit(false);
  }

  function handleClickSave(e) {
    if (name.length === 0 || email.length === 0 || role.length === 0) return;

    const updatedUsersList = users.map((user) => {
      if (user.id === item.id) {
        return { id: `${item.id}`, name: name, email: email, role: role };
      }
      return user;
    });

    updateUsers(updatedUsersList);
    updateEdit(false);
    console.log("user updated succesfully");
  }

  return (
    <>
      <div className="user-checkbox">
        <input
          onChange={handleChangeCheckbox}
          id={item.id}
          type="checkbox"
          checked={check}
        />
      </div>
      <div className="user-data">
        <input
          value={name}
          type="text"
          onChange={handleChangeName}
          className="edit-input"
        />
      </div>
      <div className="user-data">
        <input
          value={email}
          type="email"
          onChange={handleChangeEmail}
          className="edit-input"
        />
      </div>
      <div className="user-data">
        <input
          value={role}
          type="text"
          onChange={handleChangeRole}
          className="edit-input"
        />
      </div>
      <div className="user-data action">
        <button onClick={handleClickSave} className="action-btn save">
          <CheckCircleIcon className="h-6 w-6 text-blue-500 action-icon saveIcon" />
        </button>
        <button onClick={handleClickCancel} className="action-btn cancel">
          <XMarkIcon className="h-6 w-6 text-blue-500 action-icon cancelIcon" />
        </button>
      </div>
    </>
  );
}

export default EditUser;
