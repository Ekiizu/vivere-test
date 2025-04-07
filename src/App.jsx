import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react"; 
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PostView from "./pages/posts/View";
import ViewProfile from "./pages/profile/View";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./context/useAuth";
import Edit from "./pages/profile/Edit";

function App() {
  const location = useLocation();
  const [postStyle, setPostStyle] = useState("full"); // state for post style

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <AuthProvider>
      <div className="flex">
        {/* Render Sidebar only if not on login or register pages */}
        {!isAuthPage && <Sidebar setPostStyle={setPostStyle} />}

        <div className="w-full">
          {/* Render Navbar only if not on login or register pages */}
          {!isAuthPage && <Navbar />}

          <Routes>
            <Route path="/" element={<Home postStyle={postStyle} />} /> 
            {/* <Route path="/profile/:id" element={<Profile />} /> */} 
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<Edit />} />
            
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
             <Route path="/profile/:id" element={<ViewProfile />} />
             
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;

