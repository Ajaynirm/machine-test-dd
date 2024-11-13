// import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import "./App.css";
// import Login from "./components/login/Login";
// import AdminPanel from "./components/adminPanel/AdminPanel";
// import CreateEmp from "./components/createEmployee/CreateEmp";
// import EmployeeList from "./components/employList/EmployeeList";
// import EmployeEdit from "./components/employeeEdit/EmployeEdit";

// function App() {
//   const [logout, setLogout] = useState(false);

//   const handleLogout = () =>{
//     alert("log out successfully")
//      setLogout(true);

//   }
//   const handleLogin = () => setLogout(false);
//   return (
//     <>
//       <BrowserRouter>
//         {!logout && (
//           <Routes>
//             <Route path="/login" element={<Login onLogin={handleLogin}/>}></Route>
//             <Route path="/admin" element={<AdminPanel onLogout={handleLogout} />}></Route>
//             <Route path="/createEmp" element={<CreateEmp onLogout={handleLogout} />}></Route>
//             <Route path="/emplist" element={<EmployeeList onLogout={handleLogout}/>}></Route>
//             <Route path="/empedit" element={<EmployeEdit />}></Route>
//             <Route path="/main-page" element={<AdminPanel onLogout={handleLogout}/>}></Route>
//             {/* <Route path="/login-page" element={<Login onLogin={handleLogin}/>}></Route> */}
//             <Route path="/home-page" element={<AdminPanel onLogout={handleLogout}/>}></Route>
//           </Routes>
//            )} 
//         <Routes>
//           <Route>
//           <Route path="/login-page" element={<Login />}></Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Login from "./components/login/Login";
import AdminPanel from "./components/adminPanel/AdminPanel";
import CreateEmp from "./components/createEmployee/CreateEmp";
import EmployeeList from "./components/employList/EmployeeList";
import EmployeEdit from "./components/employeeEdit/EmployeEdit";

function App() {
  const [logout, setLogout] = useState(false);

  const handleLogout = () => {
    alert("Logged out successfully");
    setLogout(true);
  };
  
  const handleLogin = () => setLogout(false);

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* Protected routes */}
        {/* {logout ? ( */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        {/* ) : ( */}
          <>
            <Route
              path="/admin"
              element={<AdminPanel onLogout={handleLogout} />}
            />
            <Route
              path="/createEmp"
              element={<CreateEmp onLogout={handleLogout} />}
            />
            <Route
              path="/emplist"
              element={<EmployeeList onLogout={handleLogout} />}
            />
            <Route
              path="/empedit"
              element={<EmployeEdit />}
            />
            <Route
              path="/main-page"
              element={<AdminPanel onLogout={handleLogout} />}
            />
            <Route
              path="/home-page"
              element={<AdminPanel onLogout={handleLogout} />}
            />
          </>
        {/* )} */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
