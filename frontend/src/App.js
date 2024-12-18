import React, { useState, useEffect } from 'react';
import AllRoutes from './allRoutes';

const App = () => {
 

  return (
    <div className="App">
      {/* Pass token and setToken to AllRoutes */}
      <AllRoutes  />
    </div>
  );
};

export default App;
