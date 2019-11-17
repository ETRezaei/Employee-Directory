import React from "react";

const EmployeeContext = React.createContext({
    users: [{}],
    order: "",
    filteredUsers: [{}],
    headings:[{}],
    handleSort: () => undefined,
    handleSearchChange: () => undefined
    

});

export default EmployeeContext;