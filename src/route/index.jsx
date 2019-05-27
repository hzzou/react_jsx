import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const Home = lazy(()=>import('../components/Home/Home'));
const HookCom = lazy(()=>import('../components/HookCom/HookCom'));

const Routes = () => {
  return (
    <div className="app">
      <Router>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route path='/hookcom' component={HookCom}></Route>
            <Route path='/' component={Home} />
            <Redirect from='*' to='/' />
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
}

export default Routes;