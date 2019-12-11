import * as React from 'react';
import {
  Nav,
  NavGroup,
  NavList,
  NavItem,
  NavExpandable,
} from '@patternfly/react-core';
import { NavLink, withRouter } from 'react-router-dom';
import { GetActiveProductIdFromUrl } from '@app/AppLayout/ProductSelector'

interface MyRoute {
    label: string;
    to: string;
}

function IsMyRoute(obj) {
    return obj.to !== undefined
}

interface MyProductRoute {
    label: string;
    productTo: string;
    subRoutes?: MyProductRoute[];
}

function IsMyProductRoute(obj) {
    return obj.productTo !== undefined
}

interface RouterGroup {
    label: string;
    routes: MyRoute[];
}

type MyRouterItem = MyRoute | MyProductRoute | RouterGroup;

function DoesRouteMatches(route: (MyRoute | MyProductRoute), url : string) {
    if (IsMyRoute(route)) {
        return (route as MyRoute).to == url
    } else {
        const matcher = (route as MyProductRoute).productTo.replace('select', '[\\w-]+');
        return url.search(matcher) != -1;
    }
}

function RoutesTo(route : (MyRoute | MyProductRoute), productId:string|undefined) {
    if (IsMyRoute(route)) {
        return (route as MyRoute).to
    } else {
        if (productId) {
            return (route as MyProductRoute).productTo.replace('select', productId)
        } else {
            return (route as MyProductRoute).productTo
        }
    }
}

interface NavigationState {
    activeGroup?: string;
    activeItem?: string;
    links: (MyRouterItem)[];
    lastUrl?: string;
    productId?: string;
}


const staticNavigation:(MyRouterItem)[] = [
    {label: 'Getting Started', to: '/ato/getting_started'},
    {label: 'Documents', routes: [
        {label: 'Overview', to: '/ato/documents'},
        {label: 'Vulnerability Management', to: '/ato/documents/vulnerability-management-plan'},
        {label: 'Security Awareness', to: '/ato/documents/security-awareness-and-training-plan'},
        {label: 'FedRAMP Templates', to: '/ato/documents/fedramp-templates'},
    ]},
    {label: 'Overview', productTo: '/ato/products/select/Overview'},
    {label: 'NIST-800-53', productTo: '/ato/products/select/NIST-800-53', subRoutes: [
        {label: 'Access Control', productTo: '/ato/products/select/NIST-800-53#AC-1'},
        {label: 'Awareness and Training', productTo: '/ato/products/select/NIST-800-53#AT-1'},
        {label: 'Audit and Accountability', productTo: '/ato/products/select/NIST-800-53#AU-1'},
        {label: 'Security Assessment & Authorization', productTo: '/ato/products/select/NIST-800-53#CA-1'},
        {label: 'Configuration Management', productTo: '/ato/products/select/NIST-800-53#CM-1'},
        {label: 'Contingency Planning', productTo: '/ato/products/select/NIST-800-53#CP-1'},
        {label: 'Identification and Authentication', productTo: '/ato/products/select/NIST-800-53#IA-1'},
        {label: 'Incident Response', productTo: '/ato/products/select/NIST-800-53#IR-1'},
        {label: 'Maintenance', productTo: '/ato/products/select/NIST-800-53#MA-1'},
        {label: 'Media Protection', productTo: '/ato/products/select/NIST-800-53#MP-1'},
        {label: 'Physical & Environmental Protection', productTo: '/ato/products/select/NIST-800-53#PE-1'},
        {label: 'Planning', productTo: '/ato/products/select/NIST-800-53#PL-1'},
        {label: 'Personnel Security', productTo: '/ato/products/select/NIST-800-53#PS-1'},
        {label: 'Risk Management', productTo: '/ato/products/select/NIST-800-53#RA-1'},
        {label: 'System and Services Acquisition', productTo: '/ato/products/select/NIST-800-53#SA-1'},
        {label: 'Systems and Communications Protection', productTo: '/ato/products/select/NIST-800-53#SC-1'},
        {label: 'System and Information Integrity', productTo: '/ato/products/select/NIST-800-53#SI-1'},
    ]},
    {label: 'FedRAMP', productTo: '/ato/products/select/FedRAMP'},
];

class Navigation extends React.Component<any, NavigationState> {
    onSelect(result) {
        this.setState({
            activeGroup: result.groupId,
            activeItem: result.itemId
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            links: staticNavigation
        };
        this.onSelect = this.onSelect.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        var currentUrl = window.location.pathname;
        if (currentUrl == '/') {
            currentUrl = '/ato/getting_started'
        }
        if (currentUrl == state.lastUrl && state.activeItem !== undefined) {
            return null;
        }
        var activeGroup, activeItem;
        state.links.forEach((function(l1 : MyRouterItem, i) {
            if (activeItem) {
                return
            }
            if (IsMyRoute(l1) || IsMyProductRoute(l1)) {
                if ((l1 as any).subRoutes !== undefined) {
                    const subroute = currentUrl + window.location.hash;
                    (l1 as any).subRoutes.forEach((function(l2, j) {
                        if (DoesRouteMatches(l2 as any, subroute)) {
                            activeGroup = 'grp-' + i;
                            activeItem = activeGroup + '_itm-' + j;
                        }
                    }))
                }
                if (activeItem) {
                    return
                }
                if (DoesRouteMatches(l1 as any, currentUrl)) {
                    activeGroup = '';
                    activeItem = 'itm-' + i;
                }
            } else {
                (l1 as RouterGroup).routes.forEach((function(l2, j) {
                    if (IsMyRoute(l2) || IsMyProductRoute(l2)) {
                        if (DoesRouteMatches(l2 as any, currentUrl)) {
                            activeGroup = 'grp-' + i;
                            activeItem = activeGroup + '_itm-' + j;
                        }
                    }
                }))
            }
        }));
        if (activeItem !== undefined) {
            return {links: state.links,
                    activeGroup: activeGroup,
                    activeItem: activeItem,
                    productId: GetActiveProductIdFromUrl()};
        }
        return null;
    }

    render() {
        const { activeGroup, activeItem, productId } = this.state;
        return (
            <Nav onSelect={this.onSelect} theme="dark">
                <NavList>
                    { this.state.links.map((function(l1, i){
                          if (IsMyRoute(l1) || IsMyProductRoute(l1)) {
                              var id = 'itm-' + i;
                              if (IsMyProductRoute(l1) && (activeItem === id || activeGroup === 'grp-' + i) && (l1 as any).subRoutes !== undefined) {
                                  const groupId = 'grp-' + i;
                                  return (
                                      <NavExpandable title={l1.label} groupId={groupId} isActive={true} key={groupId} isExpanded>
                                          {
                                          (l1 as any).subRoutes.map((function(l2, j) {
                                                  const id = groupId + '_itm-' + j;
                                                  return (
                                                      <NavItem groupId={groupId} itemId={id} isActive={activeItem === id} key={id}>
                                                          <NavLink exact={true} to={RoutesTo(l2 as any, productId)}>
                                                              {l2.label}
                                                          </NavLink>
                                                      </NavItem>
                                                  );
                                              }
                                          ))
                                          }
                                      </NavExpandable>
                                  )
                              }
                              return (
                                  <NavItem itemId={id} isActive={activeItem === id} key={id}>
                                      <NavLink exact={true} to={RoutesTo((l1 as any), productId)}>
                                          {l1.label}
                                      </NavLink>
                                  </NavItem>
                              );
                          } else {
                              var groupId = 'grp-' + i;
                              return (
                                  <React.Fragment key={groupId}>
                                  <NavExpandable title={l1.label} groupId={groupId} isActive={activeGroup === groupId} key={groupId} isExpanded>
                                      {
                                          (l1 as RouterGroup).routes.map((function(l2, j) {
                                              var id = groupId + '_itm-' + j;
                                              return (
                                                  <NavItem groupId={groupId} itemId={id} isActive={activeItem === id} key={id}>
                                                      <NavLink exact={true} to={l2.to}>
                                                          {l2.label}
                                                      </NavLink>
                                                  </NavItem>
                                              );
                                          }))
                                      }
                                  </NavExpandable>
                                  <br/>
                                  <NavGroup title="Product Specific Assets"/>
                                  </React.Fragment>
                              );
                          }
                      }))}
                </NavList>
            </Nav>
        );
    }
}
const InteractiveNavigation = withRouter(Navigation);

export { InteractiveNavigation };
