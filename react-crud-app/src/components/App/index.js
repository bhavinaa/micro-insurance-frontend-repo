// import React, { useState, useEffect } from 'react';

// import Login from '../Login';
// import Dashboard from '../Dashboard';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
//   }, []);

//   return (
//     <>
//       {isAuthenticated ? (
//         <Dashboard setIsAuthenticated={setIsAuthenticated} />
//       ) : (
//         <Login setIsAuthenticated={setIsAuthenticated} />
//       )}
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import Login from "../Login";
import Dashboard from "../Dashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is already logged in when the app loads
  useEffect(() => {
    const authStatus = localStorage.getItem("is_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}


// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     () => localStorage.getItem("is_authenticated") === "true"
//   );

//   useEffect(() => {
//     console.log("Auth Status:", isAuthenticated);
//   }, [isAuthenticated]);

//   // Logout function to remove authentication
//   const handleLogout = () => {
//     localStorage.removeItem("is_authenticated"); // Remove from storage
//     setIsAuthenticated(false); // Update state
//   };

//   return (
//     <div>
//       {isAuthenticated ? (
//         <Dashboard handleLogout={handleLogout} />
//         // <Dashboard setIsAuthenticated={setIsAuthenticated} />
//       ) : (
//         <Login setIsAuthenticated={setIsAuthenticated} />
//       )}
//     </div>
//   );
// }

