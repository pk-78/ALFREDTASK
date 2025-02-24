import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import Signup from "./pages/signup";
import FlashCard from "./pages/FlashCard";
import AddQuestion from "./components/AddQuetion";

function App() {
  return (
    <div className=" bg-gradient-to-r from-blue-500 to-purple-600">
      <Toaster />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:id" element={<FlashCard />} />
        {/* <Route path="/:id" element={<FlashCard />} /> */}
        <Route path="/addQuestion/:id" element={<AddQuestion />} />
      </Routes>
    </div>
  );
}

export default App;
