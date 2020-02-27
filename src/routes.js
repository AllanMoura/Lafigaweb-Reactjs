import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { isAuthenticated } from './services/auth';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/dashboard';
import CreateNpc from './pages/npc/create';
import EditNpc from './pages/npc/edit';
import Search from './pages/npc/search';
import Header from './Component/Header';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={ props => 
        (isAuthenticated() ? 
            (<Component {...props}/>) : (<Redirect to={{ pathname: '/', state: {from: props.location}}} />))}/>
);

const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <>
                <Header />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/npc/create" component={CreateNpc} />
                <PrivateRoute exact path="/npcs/:id" component={EditNpc} />
                <PrivateRoute path="/npcs/search/:searchquery" component={Search} />
            </>
            <Route path="*" component={() => <h1>Pagina não encontrada</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;