import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { ATODocuments } from '@app/ato/Documents/Overview';
import { ATOTrainingPlan, ATOVulnerabilityManagementPlan } from '@app/ato/Documents/Documents';
import { Product } from '@app/ato/Products/Product';
import { Products } from '@app/ato/Products/Products';
import { GettingStarted } from '@app/ato/GettingStarted';
import { NotFound } from '@app/NotFound/NotFound';
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
}

const routes: IAppRoute[] = [
  {
    component: GettingStarted,
    exact: true,
    icon: null,
    label: 'Getting Started',
    path: '/',
    title: 'Getting Started',
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
        component: ATODocuments,
        exact: true,
        icon: null,
        label: 'ATO Documents',
        path: '/ato/documents',
        title: 'ATO Documents',
    },
    {
        component: ATOVulnerabilityManagementPlan,
        exact: true,
        icon: null,
        label: 'Vulnerability Management Plan',
        path: '/ato/documents/vulnerability-management-plan',
        title: 'Vulnerability Management Plan',
    },
    {
        component: ATOTrainingPlan,
        exact: true,
        icon: null,
        label: 'Security Awareness and Training Plan',
        path: '/ato/documents/security-awareness-and-training-plan',
        title: 'Security Awareness and Training Plan',
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
        path: '/ato/products/:productId/:tabId?',
        title: 'Product Document',
    },
    {
        component: Product,
        exact: true,
        icon: null,
        isAsync: true,
        label: 'Product',
        path: '/product-documents/:productId/:tabId/:garbage/', // Maintain the same links that lead to the old site.
        title: 'Product Document',
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
