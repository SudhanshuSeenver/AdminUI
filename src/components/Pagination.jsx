import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import "./pagination.css";

function Pagination({
  pageNo,
  updatePageNo,
  pagesCount,
  users,
  select,
  updateUsers,
}) {
  const [prevPage, updatePrevPage] = useState(pageNo);

  useEffect(() => {
    if (pagesCount === 1) {
      disableButton();
      updatePageNo(1);
      updatePrevPage(1);
      document.getElementById(`pg1`).classList.add("active-page");
    } else if (prevPage > pagesCount) {
      document.getElementById(`pg${pagesCount}`).classList.add("active-page");
      disableButton("next");
      updatePageNo(pagesCount);
      updatePrevPage(pagesCount);

      // console.log(pageNo, prevPage);
    } else if (prevPage === pagesCount) {
      disableButton("next");
    } else disableButton("prev");
    // console.log("pagesCount");
  }, [pagesCount]);

  // useEffect(() => {

  // }, [pagesCount]);

  function handleClickDeleteSelected(e) {
    if (select.length === 0) return;
    const updatedUsersList = users.filter((user) => !select.includes(+user.id));
    updateUsers(updatedUsersList);
  }

  function disableButton(val) {
    const elemPrev = document.getElementsByClassName("page-prev")[0].childNodes;
    const elemNext = document.getElementsByClassName("page-next")[0].childNodes;
    // console.log(elemPrev);
    if (val === "prev") {
      for (let i = 0; i < elemPrev.length; i++) {
        elemPrev[i].disabled = true;
        elemPrev[i].classList.add("disabled");
        elemNext[i].disabled = false;
        elemNext[i].classList.remove("disabled");
      }
    } else if (val === "next") {
      for (let i = 0; i < elemPrev.length; i++) {
        elemNext[i].disabled = true;
        elemNext[i].classList.add("disabled");
        elemPrev[i].disabled = false;
        elemPrev[i].classList.remove("disabled");
      }
    } else {
      if (pagesCount === 1) {
        for (let i = 0; i < elemPrev.length; i++) {
          elemNext[i].disabled = true;
          elemNext[i].classList.add("disabled");
          elemPrev[i].disabled = true;
          elemPrev[i].classList.add("disabled");
        }
      } else {
        for (let i = 0; i < elemPrev.length; i++) {
          elemNext[i].disabled = false;
          elemNext[i].classList.remove("disabled");
          elemPrev[i].disabled = false;
          elemPrev[i].classList.remove("disabled");
        }
      }
    }
  }

  function handlePagePrevClick(e) {
    e.stopPropagation();
    if (e.target.className === "page-prev") return;
    const prevEl = document.getElementById(`pg${prevPage}`);

    if (e.target.id === "toPg_first") {
      prevEl.classList.remove("active-page");
      document.getElementById(`pg1`).classList.add("active-page");
      updatePageNo(1);
      updatePrevPage(1);
      disableButton("prev");
    } else {
      prevEl.classList.remove("active-page");
      document.getElementById(`pg${pageNo - 1}`).classList.add("active-page");
      updatePageNo(pageNo - 1);
      updatePrevPage(pageNo - 1);
      if (pageNo - 1 === 1) {
        disableButton("prev");
      } else disableButton();
    }
  }

  function handlePagesClick(e) {
    e.stopPropagation();
    if (e.target.className === "pages") return;

    const pageClicked = parseInt(e.target.textContent);

    updatePageNo(pageClicked);
    if (prevPage !== pageClicked) {
      const pChilds = e.target.parentNode.childNodes;
      // console.log(pChilds);
      pChilds[prevPage - 1].classList.remove("active-page");
      pChilds[pageClicked - 1].classList.add("active-page");
      updatePrevPage(pageClicked);
      if (pageClicked === 1) disableButton("prev");
      else if (pageClicked === pChilds.length) disableButton("next");
      else disableButton();
    }
  }

  function handlePageNextClick(e) {
    e.stopPropagation();
    // console.log(e);
    if (e.target.className === "page-next") return;
    const prevEl = document.getElementById(`pg${prevPage}`);
    const pChilds = document.getElementsByClassName("pages")[0].childNodes;

    if (e.target.id === "toPg_last") {
      prevEl.classList.remove("active-page");
      document
        .getElementById(`pg${pChilds.length}`)
        .classList.add("active-page");
      updatePageNo(pChilds.length);
      updatePrevPage(pChilds.length);
      disableButton("next");
    } else {
      prevEl.classList.remove("active-page");
      document.getElementById(`pg${pageNo + 1}`).classList.add("active-page");
      updatePageNo(pageNo + 1);
      updatePrevPage(pageNo + 1);
      if (pageNo + 1 === pChilds.length) {
        disableButton("next");
      } else disableButton();
    }
  }

  function displayPageButtons() {
    const pageButton = [
      <button id="pg1" key="pg1" className="page btn active-page">
        1
      </button>,
    ];

    for (let i = 2; i <= pagesCount; i++) {
      pageButton.push(
        <button id={"pg" + i} key={"pg" + i} className="page btn">
          {i}
        </button>
      );
    }

    return pageButton;
  }

  return (
    <div className="pagi-container">
      <div className="delete">
        <button onClick={handleClickDeleteSelected} className="btn">
          Delete Selected
        </button>
      </div>
      <div className="page-select">
        <div onClick={handlePagePrevClick} className="page-prev">
          <button id="toPg_first" className="page prev btn">
            <ChevronDoubleLeftIcon className="h-6 w-6 text-blue-500 page-icon" />
          </button>
          <button className="page prev btn">
            <ChevronLeftIcon className="h-6 w-6 text-blue-500 page-icon" />
          </button>
        </div>
        <div onClick={handlePagesClick} className="pages">
          {displayPageButtons()}
        </div>
        <div onClick={handlePageNextClick} className="page-next">
          <button className="page next btn">
            <ChevronRightIcon className="h-6 w-6 text-blue-500 page-icon" />
          </button>
          <button id="toPg_last" className="page last btn">
            <ChevronDoubleRightIcon className="h-6 w-6 text-blue-500 page-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
