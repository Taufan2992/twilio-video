import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Prejoin from "./pages/Prejoin";
import Check from "./pages/check";
import Room from "./pages/Room";
import VideoComponent from "./pages/test";
import Join from "./pages/Join";
function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/prejoin' element={<Prejoin/>}/>
      <Route exact path='/check' element={<Check/>}/>
      <Route exact path='/room' element={<Room/>}/>
      <Route exact path='/join' element={<Join/>}/>
      <Route exact path='/video' element={<VideoComponent/>}/>
    </Routes>
  );
}

export default App;
