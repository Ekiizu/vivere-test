import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./context/useAuth";


function App() {

  const location = useLocation(); 

  const isLoginPage = location.pathname === "/login";

  return (
    <AuthProvider>
      <div className="flex">
        { !isLoginPage && <Sidebar /> } 
        {/* no sidebar on login page */}
        <div className="w-full">
        { !isLoginPage && <Navbar /> } 
        {/* no navbar either */}

          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile" element={<Profile initialSize={window.innerWidth * 0.3} />} />
            
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
          </Routes>
         
        </div>
        
      </div>
    </AuthProvider>
    
  );
}




export default App;

