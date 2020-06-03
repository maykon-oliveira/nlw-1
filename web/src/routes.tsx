import { Route, BrowserRouter } from 'react-router-dom';

import React from 'react';
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

export const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" component={Home} exact />
            <Route path="/cadastrar-ponto" component={CreatePoint} />
        </BrowserRouter>
    );
};
