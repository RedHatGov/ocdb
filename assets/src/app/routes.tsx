import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { Dashboard } from '@app/Dashboard/Dashboard';
import { Product } from '@app/Products/Product';
import { Products } from '@app/Products/Products';
import { GettingStarted } from '@app/ato/GettingStarted';
import { NotFound } from '@app/NotFound/NotFound';
import { Support } from '@app/Support/Support';
import DocumentTitle from 'react-document-title';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
let routeFocusTimer: number;


const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }) => {
  const lastNavigation = useLastLocation();

  function routeWithTitle(routeProps: RouteComponentProps) {
    return (
      <DocumentTitle title={title}>
        <Component {...rest} {...routeProps} />
      </DocumentTitle>
    );
  }

  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      clearTimeout(routeFocusTimer);
    };
  }, []);

  return <Route render={routeWithTitle} />;
};

export interface IAppRoute {
  label: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  icon: any;
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
  hidden?: boolean;
}

const routes: IAppRoute[] = [
  {
    component: Dashboard,
    exact: true,
    icon: null,
    label: 'Dashboard',
    path: '/',
    title: 'Main Dashboard Title'
  },
  {
    component: GettingStarted,
    exact: true,
    icon: null,
    label: 'Getting Started',
    path: '/ato/getting_started',
    title: 'Getting Started',
  },
  {
    component: Products,
    exact: true,
    icon: null,
    isAsync: true,
    label: 'Products',
    path: '/ato/products',
    title: 'Product Documents'
  },
    {
        component: Product,
        exact: true,
        icon: null,
        isAsync: true,
        label: 'Product',
        path: '/ato/products/:productId',
        title: 'Product Document',
        hidden: true,
    },
  {
    component: Support,
    exact: true,
    icon: null,
    isAsync: true,
    label: 'Delme Wireframe',
    path: '/support',
    title: 'Support Page Title'
  }
];

const AppRoutes = () => (
  <LastLocationProvider>
    <Switch>
      {routes.map(({ path, exact, component, title, isAsync, icon }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          icon={icon}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <RouteWithTitleUpdates component={NotFound} title={'404 Page Not Found'} />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
