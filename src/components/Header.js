import React from "react";
import Logo from "../images/Logo.jpg";
import "../App.scss";

export default function Header() {
  return (
    <header className={"header"}>
      <nav>
        <img alt={"Logo"} src={Logo} />
      </nav>
    </header>
  );
}
