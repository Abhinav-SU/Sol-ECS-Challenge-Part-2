import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route, //change
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import QRCode, { QRCodeSVG } from "qrcode.react";
import "./styles.css";

const initializeUserData = () => {
  try {
    const data = localStorage.getItem("userData");
    if (!data) {
      const defaultData = {
        "user1@example.com": { password: "password123", grade: null },
        "user2@example.com": { password: "password456", grade: null },
      };
      localStorage.setItem("userData", JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error initializing user data: ", error);
    return {};
  }
};

const saveUserData = (data) => {
  try {
    localStorage.setItem("userData", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving user data: ", error);
  }
};

const userData = initializeUserData();

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userData[email] && userData[email].password === password) {
      setUser({ email });
      navigate("/grade");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Grade = ({ user }) => {
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setGrade(userData[user.email]?.grade ?? ""); // Ensures state is set properly
    }
  }, [user, navigate]);

  const saveGrade = () => {
    if (grade !== "" && grade >= 0 && grade <= 10) {
      userData[user.email] = { ...userData[user.email], grade };
      saveUserData(userData);
      navigate("/score");
    } else {
      alert("Enter a valid grade (0-10)");
    }
  };

  return user ? (
    <div className="container">
      <h2>Enter your score</h2>
      <input
        type="number"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        min="0"
        max="10"
      />
      <button onClick={saveGrade}>Submit</button>
    </div>
  ) : null;
};

// const Grade = ({ user }) => {
//   const [grade, setGrade] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     } else if (userData[user.email]?.grade === null) {
//       setGrade("");
//     } else {
//       navigate("/score");
//     }
//   }, [user, navigate]);

//   const saveGrade = () => {
//     if (grade !== null && grade >= 0 && grade <= 10) {
//       userData[user.email] = { ...userData[user.email], grade };
//       saveUserData(userData);
//       navigate("/score");
//     } else {
//       alert("Enter a valid grade (0-10)");
//     }
//   };

//   return user ? (
//     <div className="container">
//       <h2>Enter your score</h2>
//       <input
//         type="number"
//         value={grade || ""}
//         onChange={(e) => setGrade(e.target.value)}
//         min="0"
//         max="10"
//       />
//       <button onClick={saveGrade}>Submit</button>
//     </div>
//   ) : null;
// };

const Score = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleGrade = () => {
    navigate("/grade");
  };

  return user ? (
    <div className="container">
      <h2>Your Score: {userData[user.email].grade}</h2>
      <button
        onClick={async () => {
          await navigate("/grade");
          console.log("hello");
        }}
      >
        Modify Score
      </button>
      <button
        onClick={handleLogout}
        style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
      >
        Logout
      </button>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

const QRCodeGenerator = () => {
  const url = "https://pzxs99.csb.app/"; // Replace with actual deployed URL
  return (
    <div className="container">
      <h2>Scan to Access</h2>
      <QRCodeSVG value={url} />
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/grade" element={<Grade user={user} />} />
        <Route
          path="/score"
          element={<Score user={user} setUser={setUser} />}
        />
        <Route path="/qrcode" element={<QRCodeGenerator />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
