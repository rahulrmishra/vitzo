import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { routes } from './utils/constants';

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
