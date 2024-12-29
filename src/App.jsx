import './App.css'
import 'flowbite';
import Login from './pages/auth/Login';
import { Route, Router, Routes } from 'react-router-dom';
import routes from './constant/routes';
import Register from './pages/auth/Register';
import RouteCreate from './pages/route/routeCreate/RouteCreate';
import RouteList from './pages/route/routeList/routeList';
import RouteEdit from './pages/route/routeEdit/RouteEdit';
import Layout from './pages/Layout';
import OperatorCreate from './pages/Operator/OperatorCreate';
import OperatorList from './pages/Operator/OperatorList';
import OperatorEdit from './pages/Operator/OperatorEdit';
import OperatorView from './pages/Operator/OperatorView';
import BusList from './pages/bus/BusList/BusList';
import BusCreate from './pages/bus/BusCreate/BusCreate';
import BusEdit from './pages/bus/BusEdit/busEdit';

function App() {

  return (
   <>
     <div>
      <Routes>
        <Route path={routes.login} element={<Login/>} />
        <Route path={routes.register} element={<Register/>} />
        
       <Route element={<Layout/>}>

          <Route path={routes.operatorCreate} element={<OperatorCreate/>} />
          <Route path={routes.operatorList} element={<OperatorList/>} />
          <Route path={routes.operatorEdit} element={<OperatorEdit/>} />
          <Route path={routes.operatorView} element={<OperatorView/>} />

          <Route path={routes.routeCreate} element={<RouteCreate/>} />
          <Route path={routes.routeList} element={<RouteList/>} />
          <Route path={routes.routeEdit} element={<RouteEdit/>} />


          <Route path={routes.busCreate} element={<BusCreate/>} />
          <Route path={routes.busList} element={<BusList/>} />
          <Route path={routes.busEdit} element={<BusEdit/>} />

       </Route>
    </Routes>
     </div>
    </>
  )
}

export default App
