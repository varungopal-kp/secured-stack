import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./containers/AuthPage";
import HomePage from "./containers/HomePage";
import "./App.css";
import "react-notifications/lib/notifications.css";
import { PrivateRoute } from "./hoc/PrivateRoute";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            name="Home"
            element={<PrivateRoute Component={HomePage} />}
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;
