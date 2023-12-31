import React from "react";
import { Image } from "react-bootstrap";

const Profile = ({ profile }) => {
  return (
    <div className="text-center">
      <Image
        src={profile ? profile.avatar : chrome.runtime.getURL("/blankUser.png")}
        roundedCircle
        style={{ height: "150px", width: "150px" }}
      />
      <h1> {profile ? profile.name : ""} </h1>
    </div>
  );
};

export default Profile;
