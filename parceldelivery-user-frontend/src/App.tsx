import { Routes, Route } from "react-router-dom";
import Home from "./views/home";
import SentParcels from "./views/sentParcels";
import ReceivedParcels from "./views/receivedParcels";
import MyAccount from "./views/myAccount";
import SendNewParcel from "./views/sendNewParcel";
import Navbar from "./components/navbar";
import FrontPage from "./views/frontPage";
import Footer from "./components/Footer";
import Signin from "./views/Signin"; // Corrected import statement
import Register from "./views/Register";
import './App.css';


function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/sentParcels" element={<SentParcels />} />
        <Route path="/receivedParcels" element={<ReceivedParcels />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/sendNewParcel" element={<SendNewParcel />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
