import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Seo from 'components/layouts/Seo';

import { RoutesProps } from '../types';

import routesList from './routes';

const RouterProvider = () => {
  const renderRoutes = routesList.map(
    ({ path, component, text, withHeader, withSidebar, isBackBtn }: RoutesProps) => (
      <Route
        key={path}
        path={path}
        element={
          <Seo text={text} withHeader={withHeader} withSidebar={withSidebar} isBackBtn={isBackBtn}>
            {component}
          </Seo>
        }
      />
    ),
  );
  return (
    <BrowserRouter>
      <Routes>{renderRoutes}</Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
