import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";
import EmployeeContext from "../utils/EmployeeContext";

function DataArea(){

    const [usersState, setUsersState] = useState({
      users: [{}],
      order: "descend",
      filteredUsers: [{}],
      headings:  [ { name: "Image", width: "10%" },
                  { name: "Name", width: "10%" },
                  { name: "Phone", width: "20%" },
                  { name: "Email", width: "20%" },
                  { name: "DOB", width: "10%" }],
      
      });
    
       
    useEffect(() => {
      API.getUsers().then(results => {
        setUsersState({
          ...usersState,
          users: results.data.results,
          filteredUsers: results.data.results
        });
      });
    },[]);

   let handleSort =heading => {

      if (usersState.order === "descend") {
        setUsersState({
          ...usersState,
          order: "ascend"
        })
      } else {
        setUsersState({
          ...usersState,
          order: "descend"
        })

       
      }
    
      const compareFnc = (a, b) => {
        if (usersState.order === "ascend") {
          // account for missing values
          if (a[heading] === undefined) {
            return 1;
          } else if (b[heading] === undefined) {
            return -1;
          }
          // numerically
          else if (heading === "name") {
            return a[heading].first.localeCompare(b[heading].first);
          } else {
            return a[heading] - b[heading];
          }
        } else {
          // account for missing values
          if (a[heading] === undefined) {
            return 1;
          } else if (b[heading] === undefined) {
            return -1;
          }
          // numerically
          else if (heading === "name") {
            return b[heading].first.localeCompare(a[heading].first);
          } else {
            return b[heading] - a[heading];
          }
        }

      };
      const sortedUsers = usersState.filteredUsers.sort(compareFnc);
      setUsersState({ ...usersState,filteredUsers: sortedUsers });

    }
    const handleSearchChange = event => {
      console.log(event.target.value);
      const filter = event.target.value;
      const filteredList = usersState.users.filter(item => {
        // merge data together, then see if user input is anywhere inside
        let values = Object.values(item)
          .join("")
          .toLowerCase();
        return values.indexOf(filter.toLowerCase()) !== -1;
      });
    
      setUsersState({ ...usersState,filteredUsers: filteredList });
    }

      return (
        <EmployeeContext.Provider value={{usersState, handleSort,  handleSearchChange}}>
          <Nav />
          <div className="data-area">
            <DataTable
          
            />
          </div>
        </EmployeeContext.Provider>
      );
  }
    export default DataArea;

