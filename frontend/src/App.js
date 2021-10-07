import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from './utils/constants';
import { UsersList } from './pages';
import AddUser from "./pages/addUser";
import EditUser from "./pages/EditUser/editUser";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.ADD_USER} component={AddUser} exact />
        <Route path={routes.EDIT_USER} component={EditUser} exact />
        <Route path={routes.ROOT_PAGE} component={UsersList} exact />
        <Route path={routes.ROOT} component={UsersList} exact /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
