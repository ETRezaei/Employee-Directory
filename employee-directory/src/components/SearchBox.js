import React,{useContext} from "react";
import "../styles/SearchBox.css";
import EmployeeContext from "../utils/EmployeeContext";

function SearchBox() {
  const {handleSearchChange} = useContext(EmployeeContext);
  return (
    <div className="searchbox">
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => handleSearchChange(e)}
        />
        <button className="btn my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
export default SearchBox;
