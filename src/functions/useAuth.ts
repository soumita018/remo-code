import Firebase from "../services/firebase";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const useAuth = (): IUser => {
  const history = useHistory();
  const [user, setUser]: [IUser, any] = useState<IUser>({
    id: "",
    name: "",
    image: "",
    email: "",
  });

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(function (user: Firebase.User | null) {
      if (user) {
        setUser({
          email: user.email,
          name: user.displayName,
          id: user.uid,
          image: user.photoURL,
        });
      } else {
        history.push("/");
      }
    });
  }, [history]);
  return user;
}; //Custom hook that returns user object of loggedIn user.

export default useAuth;

interface IUser {
  id: string;
  name: string;
  image: string;
  email: string;
}
