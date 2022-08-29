import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(" ");
  const [searched, setSearched] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")

      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (search) {
      setSearched(
        users.filter((user) => {
          return Object.values(user)

            .join("")
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      );
    } else {
      setUsers(users);
    }
  }, [search]);
  return (
    <div className="App">
      <h1>Fetch Data from API</h1>
      <input
        onChange={(event) => setSearch(event.target.value)}
        placeholder="search the data from list....."
        className="search"
      />
      <div className="grid-main">
        {search.length > 0
          ? searched.map((sach) => {
              return (
                <div className="grid-child">
                  <h3>Name:-{sach.username}</h3>
                  <p style={{ color: "blue" }}>Skin_Color:-{sach.name}</p>
                  <p style={{ color: "red" }}>Eye_Color:-{sach.email}</p>
                </div>
              );
            })
          : users?.map((people) => {
              return (
                <div className="grid-child">
                  <h3>User_Name:-{people.username}</h3>
                  <p style={{ color: "blue" }}>Name:-{people.name}</p>
                  <p style={{ color: "red" }}>Email_Id:-{people.email}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}
