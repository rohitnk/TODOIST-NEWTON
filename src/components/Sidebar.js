import React from "react";
import "../App.scss";
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";

export default function Sidebar({ selectTab, setSelectTab }) {
  console.log(selectTab + "hahha");

  return (
    <div className={"sidebar"}>
      <div
        className={selectTab === "INBOX" && "active"}
        onClick={() => setSelectTab("INBOX")}
      >
        <FaInbox className={"icon"} /> Inbox
      </div>
      <div
        className={selectTab === "TODAY" && "active"}
        onClick={() => setSelectTab("TODAY")}
      >
        <FaRegCalendarAlt className={"icon"} />
        Today
      </div>
      <div
        className={selectTab === "NEXT_7" && "active"}
        onClick={() => setSelectTab("NEXT_7")}
      >
        <FaRegCalendar className={"icon"} />
        Next 7 days
      </div>
    </div>
  );
}
