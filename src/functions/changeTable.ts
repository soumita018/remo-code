import Firebase from "./../services/firebase";

const changeTable = (
  toTable: number,
  currentTable: number,
  userObject: any
) => {
  Firebase.firestore()
    .collection("seatingArangement")
    .doc(`${toTable}`)
    .update({
      users: Firebase.firestore.FieldValue.arrayUnion(userObject),
    }); //Inserting user object into array of given table
  Firebase.firestore()
    .collection("seatingArangement")
    .doc(`${currentTable}`)
    .update({
      users: Firebase.firestore.FieldValue.arrayRemove(userObject),
    }); //Removing user object which has moved to another table
};

export default changeTable;
