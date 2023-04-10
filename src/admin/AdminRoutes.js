import { Paper } from '@mui/material';
import { Routes,Route } from 'react-router-dom';
import AdminLogin from './adminlogin';
import AdminDashboard from './Dashboard/admindashboard';

const AdminRoutes = () => {
  return (
    
    <Routes>     {/* it is taking all the routes because of * */}
        <Route path='/dash/*' element={<AdminDashboard />}></Route>
        <Route path='/' element={<AdminLogin/>}></Route>
    </Routes>
 
  )
}

export default AdminRoutes