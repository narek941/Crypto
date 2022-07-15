import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';

import { Seo, ProtectedRoute } from 'components';

import { RoutesProps } from '../types';

import routes from './routes';

const RouterProvider = () => {
  const renderRoutes = routes.map(
    ({ path, component, text, isProtected, withHeader, isBackBtn }: RoutesProps) => {
      const RouteWrapper = isProtected ? ProtectedRoute : Fragment;

      return (
        <Route
          key={path}
          path={path}
          element={
            <RouteWrapper>
              <Seo text={text} withHeader={withHeader} isBackBtn={isBackBtn}>
                {component}
              </Seo>
            </RouteWrapper>
          }
        />
      );
    },
  );

  return (
    <BrowserRouter>
      <Routes>{renderRoutes}</Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
