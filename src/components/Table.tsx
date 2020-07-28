import React from "react";
import changeTable from "functions/changeTable";
import Avatar from "./Avatar";

const Table: React.FC<IProp> = ({
  table,
  index,
  seating,
  authUser,
  currentTable,
  setCurrentTable,
}) => {
  // Function to handle the logic of changing user's table
  const changeCurrentPositionOfUser = (table: any): void => {
    if (seating[table]?.users.length < localStorage["remo-capacity"]) {
      if (table === currentTable) {
        alert("User already sitting here");
        return;
      }
      let userObject = seating[currentTable].users.find(
        (usr: IUser) => usr.id === authUser.id
      );
      changeTable(table, currentTable, userObject);
      setCurrentTable(table);
    } else {
      alert("THE TABLE IS ALREADY FULL!");
    }
  };
  return (
    <div
      key={table.id}
      className="rt-room"
      style={{
        width: table.width,
        height: table.height,
        top: table.y,
        left: table.x,
      }}
      onDoubleClick={() => {
        changeCurrentPositionOfUser(index);
      }}
    >
      {seating[index]?.users.map((user: IUser, userIndex: any) => {
        return (
          <Avatar
            key={user.id}
            top={table.seats[userIndex]?.y}
            left={table.seats[userIndex]?.x}
            user={user}
            authUser={authUser}
          />
        );
      })}

      <div className="rt-room-name">{table.id}</div>
    </div>
  );
};

export default React.memo(Table);

interface IUser {
  id: string;
  name: string;
  email?: string;
  image: string;
}

interface Seat {
  x: number;
  y: number;
}

interface ISeating {
  id: string;
  users: IUser[];
}

interface ITable {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  seats: Seat[];
}
interface IProp {
  table: ITable;
  index: number;
  seating: ISeating[];
  authUser: IUser;
  currentTable: number;
  setCurrentTable: any;
}
