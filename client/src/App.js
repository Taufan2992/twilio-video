import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Prejoin from "./pages/Prejoin";
import Check from "./pages/check";
import Room from "./pages/Room";
import Join from "./pages/Join";
import StatisPrejoin from "./pages/StatisPrejoin";
import StatisRoom from "./pages/StatisRoom";
function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/prejoin' element={<Prejoin/>}/>
      <Route exact path='/check' element={<Check/>}/>
      <Route exact path='/room' element={<Room/>}/>
      <Route exact path='/join' element={<Join/>}/>

      <Route exact path='/statisprejoin' element={<StatisPrejoin/>}/>
      <Route exact path='/statisroom' element={<StatisRoom/>}/>
    </Routes>
  );
}

export default App;
