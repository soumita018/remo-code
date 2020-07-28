import React from "react";
import "./../css/Theater.scss";
import MapImage from "../assets/conference-map.svg";
import TableConfig from "./../data/tableConfig.json";
import useTableArrangement from "../functions/useTableArrangement";
import AddUser from "./AddUser";
import useAuth from "functions/useAuth";
import AppBar from "./AppBar";
import Table from "./Table";
import useSessionState from "functions/useSessionState";

const Theater: React.FC = () => {
  const authUser: IUser = useAuth(); //Hook to return authenticated user
  const seating: ISeating[] = useTableArrangement(); // Hook to fetch seating arrangement data
  const [currentTable, setCurrentTable]: [number, any] = useSessionState(
    "remo-userPosition",
    0
  ); //Hook to get and set user's current position

  return (
    <div
      className="remo-theater"
      style={{ width: TableConfig.width, height: TableConfig.height }}
    >
      <AppBar user={authUser} />
      <div className="rt-rooms">
        {TableConfig.tables.map((table, index) => (
          <Table
            key={table.id}
            table={table}
            index={index}
            seating={seating}
            authUser={authUser}
            currentTable={currentTable}
            setCurrentTable={setCurrentTable}
          />
        ))}
      </div>
      <div className="rt-background">
        <img src={MapImage} alt="Conference background" />
      </div>
      <AddUser />
    </div>
  );
};

export default Theater;

interface ISeating {
  id: string;
  users: IUser[];
}

interface IUser {
  id: string;
  name: string;
  email?: string;
  image: string;
}
