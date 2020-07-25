import React from "react";
import ReactToolTip from "react-tooltip";

const Avatar = ({ users, loading }) => {
  if (loading) {
    return <div class="spinner-border white-color" role="status" />;
  }
  let userArray = users.map(({ email, avatar_url }) => {
    let avatarAPI = "https://api.adorable.io/avatars/" + email;
    return (
      <span>
        <ReactToolTip />

        <img
          data-tip={email}
          className="avatar rounded-circle"
          src={avatarAPI}
          height={40}
          width={40}
        />
      </span>
    );
  });
  return userArray;
};
export default Avatar;
