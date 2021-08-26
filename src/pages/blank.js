import React from "react";

function blank({ match, location, history }){
return(
  <>
      <h1>About</h1>
      {/* <div>{JSON.stringify(match, null, 2)}</div>
      <div>{JSON.stringify(location, null, 2)}</div>
      <div>{JSON.stringify(history, null, 2)}</div> */}
       <h1>Users</h1>
      {/* <Route exact path={match.path} component={UserList} /> */}
      {/* <Route path={`${match.path}/:id`} component={UserDetail} /> */}
    </>
)
}

export default blank;
