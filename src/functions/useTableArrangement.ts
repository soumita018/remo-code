import { useState, useEffect } from "react";
import Firebase from "../services/firebase";

const useTableArrangement = () => {
  const [seating, setSeating]: [ISeating[], any] = useState((): ISeating[] => [
    {
      id: "first-table",
      users: [],
    },
    {
      id: "second-table",
      users: [],
    },
    {
      id: "third-table",
      users: [],
    },
    {
      id: "fourth-table",
      users: [],
    },
    {
      id: "fifth-table",
      users: [],
    },
    {
      id: "sixth-table",
      users: [],
    },
    {
      id: "seventh-table",
      users: [],
    },
    {
      id: "eighth-table",
      users: [],
    },
    {
      id: "ninth-table",
      users: [],
    },
    {
      id: "tenth-table",
      users: [],
    },
    {
      id: "eleventh-table",
      users: [],
    },
    {
      id: "twelfth-table",
      users: [],
    },
    {
      id: "thirteenth-table",
      users: [],
    },
    {
      id: "fourteenth-table",
      users: [],
    },
    {
      id: "fifteenth-table",
      users: [],
    },
    {
      id: "left-top-table",
      users: [],
    },
    {
      id: "right-top-table",
      users: [],
    },
    {
      id: "left-bottom-table",
      users: [],
    },
    {
      id: "right-bottom-table",
      users: [],
    },
  ]);

  useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection("seatingArangement")
      .onSnapshot(
        (
          snapshot: Firebase.firestore.QuerySnapshot<
            Firebase.firestore.DocumentData
          >
        ) => {
          const data = snapshot.docs
            .map(
              (
                doc: Firebase.firestore.QueryDocumentSnapshot<
                  Firebase.firestore.DocumentData
                >
              ) => ({
                id: doc.id,
                ...doc.data(),
              })
            )
            .sort((a: any, b: any) => a.id - b.id);
          setSeating(data);
        }
      );
    return () => unsubscribe();
  }, []); //Custom hook that fetches and returns seating arrangement data from Firestore

  return seating;
};

export default useTableArrangement;

interface ISeating {
  id: string;
  users: IUsers[];
}

interface IUsers {
  id: string;
  name: string;
  email?: string;
  image: string;
}
