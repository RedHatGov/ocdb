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
    {label: 'NIST-800-53', productTo: '/ato/products/select/NIST-800-53'},
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
