import React, { useEffect } from "react";
import Firebase from "../services/firebase";
import { useHistory } from "react-router-dom";
// import { sendGetRequest, sendPostRequest } from "../apis";

const Auth: React.FC = () => {
  const history = useHistory();
  //Hook to handle user authentication
  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Firebase.firestore()
          .collection("seatingArangement")
          .doc("0")
          .set({
            users: [
              {
                email: user.email,
                name: user.displayName,
                id: user.uid,
                image: user.photoURL,
              },
            ],
          });
        history.push("/theater");
      } else {
        console.log("no user selected");
      }
    });

    // Sample API requests
    // sendGetRequest(`sample-get-request?param=1`).then((response) =>
    //   console.log(response)
    // );
    // sendPostRequest(`sample-post-request`, { postParam: 1 }).then((response) =>
    //   console.log(response)
    // );
  }, [history]);
  const redirect = () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    Firebase.auth().signInWithPopup(provider);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1> Remo Coding Challenge Join Room </h1>
      <button className="login-button" onClick={redirect}>
        Login With Google
      </button>
    </div>
  );
};

export default Auth;
