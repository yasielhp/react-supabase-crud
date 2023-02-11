import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import NavBar from "./components/NavBar";
import ContactProvider from "./context/ContactProvider";
import ContactList from "./pages/ContactList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword";

const App = () => {
  return (
    <>
      <NavBar />
      <Container className="d-flex justify-content-center">
        <div className="w-100">
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/contacts"
                element={
                  <ContactProvider>
                    <ContactList />
                  </ContactProvider>
                }
              />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Routes>
        </div>
      </Container>
    </>
  );
};

export default App;
