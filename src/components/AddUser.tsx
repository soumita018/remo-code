import React from "react";
import useTableArrangement from "../functions/useTableArrangement";
import Firebase from "../services/firebase";
import MockData from "../data/mockData.json";
import useSessionState from "../functions/useSessionState";

const AddUser: React.FC = () => {
  const [maxCapacity, setMaxCapacity]: [number, any] = useSessionState(
    "remo-capacity",
    3
  ); //Hook to get and set no of users on the table
  const [count, setCount]: [number, any] = useSessionState(
    "remo-tableCount",
    0
  ); //Hook to get and set no table
  const [counter, setCounter]: [number, any] = useSessionState(
    "remo-Counter",
    2
  ); //Hook to get and set no of users

  const seating = useTableArrangement();
  const addUser = () => {
    let limit = maxCapacity * 19;
    if (counter <= 100) {
      if (counter > limit) {
        alert("Table capacity full");
        return;
      }
      const tableIndex = count % 19;
      if (seating[tableIndex].users.length === +maxCapacity) {
        setCount(count + 1);
        return;
      }
      if (seating[tableIndex].users.length >= 1) {
        setCount(count + 1);
      }
      setCounter(counter + 1);
      let copyState = [...seating[tableIndex].users, MockData[counter]];
      Firebase.firestore()
        .collection("seatingArangement")
        .doc(`${tableIndex}`)
        .update({
          users: copyState,
        });
    } else {
      alert(`Theater Capacity Full, Cannot add more then 100 users!`);
    }
  }; //Function to assign table to the users
  return (
    <>
      <div className="rt-add-user-btn" onClick={addUser}>
        +
      </div>
      <select
        value={maxCapacity}
        className="rt-table-limit"
        onChange={(e) => {
          setMaxCapacity(parseInt(e.target.value));
        }}
      >
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </>
  );
};

export default AddUser;
