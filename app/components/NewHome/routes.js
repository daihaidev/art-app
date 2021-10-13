import React from 'react';

const Services = React.lazy(() => import('./pages/home/index'));

const routes = [{ path: '/', component: Services }];

export default routes;
