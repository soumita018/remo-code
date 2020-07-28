import React from "react";
import { useHistory } from "react-router-dom";
import signOut from "../functions/signOut";

const AppBar: React.FC<IProp> = ({ user }) => {
  const history = useHistory();
  const logOut = (): void => {
    signOut()
      .then(() => {
        history.push("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="rt-app-bar">
      <img src={user.image} alt={user.name} className="rt-profile-image" />
      <div className="rt-user-detail">
        <span>{user.name}</span>
        <span className="rt-logout-button" onClick={logOut}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default AppBar;
interface IProp {
  user: IUser;
}

interface IUser {
  id: string;
  name: string;
  email?: string;
  image: string;
}
