import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Seo, ProtectedRoute, PublicRoute } from 'components';

import { RoutesProps } from '../types';

import routes from './routes';

const RouterProvider = () => {
  const renderRoutes = routes.map(
    ({ path, component, text, isProtected, withHeader, isBackBtn }: RoutesProps) => {
      const RouteWrapper = isProtected ? ProtectedRoute : PublicRoute;

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
