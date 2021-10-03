import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { routes } from './utils/constants';
import { UsersList } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.ROOT} component={UsersList} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
