import { useEffect, useState } from "react";
import "./searchbar.css";

function SearchBar({ users, updateFilterUsers }) {
  const [inputSearch, updateInputSearch] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    updateInputSearch(value);
    // console.log(users);
    const filteredUsers = users.filter((elem) => {
      for (let key in elem) {
        if (key !== "id" && elem[key].includes(value)) return true;
      }
    });
    updateFilterUsers(filteredUsers);
  }

  return (
    <div className="search-bar-container">
      <input
        value={inputSearch}
        onChange={handleChange}
        className="search-input"
        placeholder="Search by name,email or role"
      />
    </div>
  );
}

export default SearchBar;
