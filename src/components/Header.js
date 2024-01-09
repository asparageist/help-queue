import React from "react";
import mushImage from "./../img/fly-mush.webp"

function Header(){
  return (
    <React.Fragment>
    <h1>Help Queue</h1>
    <h3>get ye some help</h3>
    <img src={mushImage} alt="An image of fly amanita" class = "medium"/>

    </React.Fragment>
  );
}

export default Header;

