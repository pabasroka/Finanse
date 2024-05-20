import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Reports from "./components/Reports";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && (
        <Route
          path="/"
          element={
            <Navbar>
              <Main />
            </Navbar>
          }
        />
      )}
      {user && (
        <Route
          path="/stats"
          element={
            <Navbar>
              <Stats />
            </Navbar>
          }
        />
      )}
      {user && (
        <Route
          path="/reports"
          element={
            <Navbar>
              <Reports />
            </Navbar>
          }
        />
      )}

      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
