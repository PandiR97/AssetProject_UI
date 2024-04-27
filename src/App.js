import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import AssetForm from './Components/AssetForm';
import Login from './Components/Login';
// import { DataProvider } from './Components/UserContext';
import { Dashboard } from './Components/Dashboard';
import { Adminview } from './Components/Adminview';
import SuperAdmin from './Components/SuperAdmin';
import EmpView from './Components/EmpView';


function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path = "/" element={<Login/>}/>
        <Route path = "/assetform/:username" element={<AssetForm/>}/>
        <Route path = "/dashboard/:username" element={<Dashboard/>}/>
        <Route path = "/adminview/:username" element={<Adminview/>}/>
        <Route path = "/superadminview/:username" element={<SuperAdmin/>}/>
        <Route path = "/empview/:username" element={<EmpView/>}/>
      </Routes>
      
      
    
    </div>
    
  );
}

export default App;
