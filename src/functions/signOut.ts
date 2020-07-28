import firebase from "../services/firebase";

const signOut = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          let db = firebase.firestore();
          let batch = db.batch();
          db.collection("seatingArangement")
            .get()
            .then(
              (
                resp: firebase.firestore.QuerySnapshot<
                  firebase.firestore.DocumentData
                >
              ) => {
                resp.docs.forEach(
                  (
                    userDocRef: firebase.firestore.QueryDocumentSnapshot<
                      firebase.firestore.DocumentData
                    >
                  ) => {
                    batch.update(userDocRef.ref, {
                      users: [],
                    });
                  }
                );
                return batch.commit();
              }
            )
            .then(() => {
              localStorage["remo-tableCount"] = 0;
              localStorage["remo-Counter"] = 2;
              localStorage["remo-capacity"] = 3;
              localStorage["remo-userPosition"] = 0;
              resolve("Done");
            })
            .catch((error) => {
              console.error(error);
              reject("No done");
            });
        },
        function (error) {
          console.error("Sign Out Error", error);
          reject("No done");
        }
      );
  });
}; //Creating a Promise that will logout the user and performs cleanup operations

export default signOut;
