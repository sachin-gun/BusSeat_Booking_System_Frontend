import './App.css'
import 'flowbite';
import Login from './pages/auth/Login';
import { Route, Router, Routes } from 'react-router-dom';
import routes from './constant/routes';
import Register from './pages/auth/Register';
import BusOperatorCreate from './pages/busOperator/Create/BusOperatorCreate';
import BusOperatorList from './pages/busOperator/List/BusOperatorList';
import BusOperatorEdit from './pages/busOperator/Edit/BusOperatorEdit';
import RouteCreate from './pages/route/routeCreate/RouteCreate';
import RouteList from './pages/route/routeList/routeList';
import RouteEdit from './pages/route/routeEdit/RouteEdit';

function App() {

  return (
    <Routes>
        <Route path={routes.login} element={<Login/>} />
        <Route path={routes.register} element={<Register/>} />
        
        <Route path={routes.busOperatorCreate} element={<BusOperatorCreate/>} />
        <Route path={routes.busOperatorList} element={<BusOperatorList/>} />
        <Route path={routes.busOperatorEdit} element={<BusOperatorEdit/>} />

        <Route path={routes.routeCreate} element={<RouteCreate/>} />
        <Route path={routes.routeList} element={<RouteList/>} />
        <Route path={routes.routeEdit} element={<RouteEdit/>} />


        <Route path={routes.busList} element={<Login/>} />
        <Route path={routes.busCreate} element={<Login/>} />
        <Route path={routes.busEdit} element={<Login/>} />
    </Routes>
  )
}

export default App
