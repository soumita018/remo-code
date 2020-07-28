import React, { useState } from "react";

const Avatar: React.FC<IProps> = ({ top, left, user, authUser }) => {
  const [animate, setAnimate]: [boolean, any] = useState<boolean>(false); //Hook to get and set animation state
  return (
    <>
      <span
        className={`rt-avatar ${animate ? "animate" : ""}`}
        style={{
          position: "absolute",
          top: top,
          left: left,
        }}
      >
        <img src={user.image} alt={user.name} />
      </span>
      {user.id === authUser.id ? (
        <button
          className="find-me"
          onClick={(): void => {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 600);
          }}
        >
          Find Me
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default React.memo(Avatar);

interface IProps {
  top: number;
  left: number;
  user: IUser;
  authUser: IUser;
}
interface IUser {
  id: string;
  name: string;
  email?: string;
  image: string;
}
