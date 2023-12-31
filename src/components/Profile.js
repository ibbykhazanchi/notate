import React from "react";
import { Image } from "react-bootstrap";

const Profile = ({ profile }) => {

  const getAvatar = (profile) =>{
    if(!profile || !profile.avatar){
      return chrome.runtime.getURL("/blankUser.png")
    }
    return profile.avatar
  }

  return (
    <div className="text-center">
      <Image
        src={getAvatar(profile)}
        roundedCircle
        style={{ height: "150px", width: "150px" }}
      />
      <h1> {profile ? profile.name : ""} </h1>
    </div>
  );
};

export default Profile;
