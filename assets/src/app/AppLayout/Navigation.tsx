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
import { BaseRoute, BaseRouteLink, BasicRoute, ProductRoute, DoesRouteMatches, RouterGroup } from '@app/AppLayout/Routes'

interface NavigationState {
    activeGroup?: string;
    activeItem?: string;
    links: BaseRoute[];
    lastUrl?: string;
    productId?: string;
}


const staticNavigation:BaseRoute[] = [
    new BasicRoute('Getting Started', '/ato/getting_started'),
    new RouterGroup('FedRAMP Resources', [
        new BasicRoute('SSP Templates', '/ato/fedramp-templates'),
    ]),
    new ProductRoute('Overview', '/ato/products/select/Overview'),
    new ProductRoute('NIST-800-53', '/ato/products/select/NIST-800-53', [
        new ProductRoute('Access Control', '/ato/products/select/NIST-800-53#AC-'),
        new ProductRoute('Awareness and Training', '/ato/products/select/NIST-800-53#AT-'),
        new ProductRoute('Audit and Accountability', '/ato/products/select/NIST-800-53#AU-'),
        new ProductRoute('Security Assessment & Authorization', '/ato/products/select/NIST-800-53#CA-'),
        new ProductRoute('Configuration Management', '/ato/products/select/NIST-800-53#CM-'),
        new ProductRoute('Contingency Planning', '/ato/products/select/NIST-800-53#CP-'),
        new ProductRoute('Identification and Authentication', '/ato/products/select/NIST-800-53#IA-'),
        new ProductRoute('Incident Response', '/ato/products/select/NIST-800-53#IR-'),
        new ProductRoute('Maintenance', '/ato/products/select/NIST-800-53#MA-'),
        new ProductRoute('Media Protection', '/ato/products/select/NIST-800-53#MP-'),
        new ProductRoute('Physical & Environmental Protection', '/ato/products/select/NIST-800-53#PE-'),
        new ProductRoute('Planning', '/ato/products/select/NIST-800-53#PL-'),
        new ProductRoute('Personnel Security', '/ato/products/select/NIST-800-53#PS-'),
        new ProductRoute('Risk Management', '/ato/products/select/NIST-800-53#RA-'),
        new ProductRoute('System and Services Acquisition', '/ato/products/select/NIST-800-53#SA-'),
        new ProductRoute('Systems and Communications Protection', '/ato/products/select/NIST-800-53#SC-'),
        new ProductRoute('System and Information Integrity', '/ato/products/select/NIST-800-53#SI-'),
    ]),
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
        state.links.forEach((function(l1 : BaseRoute, i) {
            if (activeItem) {
                return
            }
            if (!l1.isGroup()) {
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
                    if (!l2.isGroup()) {
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
                          if (!l1.isGroup()) {
                              var l = (l1 as BaseRouteLink);
                              var id = 'itm-' + i;
                              if (l1.constructor.name == "ProductRoute" && (activeItem === id || activeGroup === 'grp-' + i) && (l1 as any).subRoutes !== undefined && productId != 'select') {
                                  const groupId = 'grp-' + i;
                                  return (
                                      <NavExpandable title={l1.label} groupId={groupId} isActive={true} key={groupId} isExpanded>
                                          {
                                          (l1 as any).subRoutes.map((function(l2, j) {
                                                  const id = groupId + '_itm-' + j;
                                                  return (
                                                      <NavItem groupId={groupId} itemId={id} isActive={activeItem === id} key={id}>
                                                          <NavLink exact={true} to={l2.routesTo(productId) + '1'}>
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
                                      <NavLink exact={true} to={l.routesTo(productId)}>
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
