import { useState, useEffect } from "react";
import { signUp } from "./auth/signup";
import { login } from "./auth/login";
import { logout } from "./auth/logout";
import { supabase } from "./supabaseclient";

import Categories from "./Categoary";
import PhotoUploader from "./PhotoUploader";
import PhotoViewer from "./PhotoViewer";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    const fn = type === "signup" ? signUp : login;
    const { error } = await fn(email, password);
    setLoading(false);
    if (error) alert(error.message);
    else if (type === "signup") alert("Signup successful! Please confirm your email.");
  };

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) alert(error.message);
    else setUser(null);
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="authbox">
      {user ? (
        <>
          <p>👋 Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>

          {/* Authenticated user views */}
          <Categories />
          <PhotoUploader />
          <PhotoViewer />
        </>
      ) : (
        <>
          <p className="head">CLOUD DRIVE</p>
          <div className="au1">
            <div className="but">
              <button className="type" onClick={() => setType("signup")}>Signup</button>
              <button className="type2" onClick={() => setType("login")}>Login</button>
            </div>

            <br />
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="ema"
            />
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="pass"
            />
            <br />
            <button onClick={handleAuth} className="but2">
              {type === "signup" ? "Sign Up" : "Log In"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
