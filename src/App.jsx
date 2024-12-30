import './App.css'
import 'flowbite';
import Login from './pages/auth/Login';
import { Route, Routes } from 'react-router-dom';
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
import ScheduleCreate from './pages/schedule/ScheduleCreate';
import ScheduleList from './pages/schedule/ScheduleList';
import ScheduleUpdate from './pages/schedule/ScheduleUpdate';
import PermitCreate from './pages/permit/PermitCreate';
import PermitList from './pages/permit/PermitList';
import PermitEdit from './pages/permit/PermitEdit';

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

          <Route path={routes.scheduleCreate} element={<ScheduleCreate/>} />
          <Route path={routes.scheduleList} element={<ScheduleList/>} />
          <Route path={routes.scheduleEdit} element={<ScheduleUpdate/>} />

          <Route path={routes.permitCreate} element={<PermitCreate/>} />
          <Route path={routes.permitList} element={<PermitList/>} />
          <Route path={routes.permitEdit} element={<PermitEdit/>} />

       </Route>
    </Routes>
     </div>
    </>
  )
}

export default App
