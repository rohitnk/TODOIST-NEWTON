import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Task from "./Task";
import "../App.scss";
export default function Content() {
  const [selectTab, setSelectTab] = useState("INBOX");
  return (
    <div className={"content"}>
      <Sidebar selectTab={selectTab} setSelectTab={setSelectTab} />
      <Task selectTab={selectTab} />
    </div>
  );
}
