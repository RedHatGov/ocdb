import * as React from 'react';
import {
  Nav,
  NavList,
  NavItem,
  NavExpandable,
} from '@patternfly/react-core';
import * as Api from '@app/lib/api'
import { NavLink, withRouter } from 'react-router-dom';
import { UserIcon } from '@patternfly/react-icons'


interface MyRoute {
    label: string;
    to: string;
    startsWithMatcher?: string;
}
interface RouterGroup {
    label: string;
    routes: MyRoute[];
}

interface NavigationState {
    activeGroup?: string;
    activeItem?: string;
    links: (MyRoute | RouterGroup)[];
    lastUrl?: string;
    showControlFamilies?: boolean;
}

const staticNavigation:(MyRoute | RouterGroup)[] = [
    {label: 'Getting Started', to: '/ato/getting_started'},
    {label: 'Documents', routes: [
        {label: 'Overview', to: '/ato/documents'},
        {label: 'Vulnerability Management', to: '/ato/documents/vulnerability-management-plan'},
        {label: 'Security Awareness', to: '/ato/documents/security-awareness-and-training-plan'},
        {label: 'FedRAMP Templates', to: '/ato/documents/fedramp-templates'},
    ]},
    {label: 'Products', routes: [
        {label: 'Overview', to: '/ato/products'}]}
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
        Api.components().then(data => this.finalizeMenu(data));
        this.onSelect = this.onSelect.bind(this);
    }

    finalizeMenu(components) {
        var links = staticNavigation;
        (links[2] as RouterGroup).routes = (links[2] as RouterGroup).routes.concat(
            components.map((function(c, _) {
                return { label: c['name'], to: '/ato/products/' + c['key'], startsWithMatcher: '/ato/products/' + c['key']};
            }))
        );
        this.setState({links: links});
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
        var showControlFamilies = false;
        state.links.forEach((function(l1, i) {
            if ((l1 as any).to !== undefined) {
                if ((l1 as MyRoute).to == currentUrl) {
                    activeGroup = '';
                    activeItem = 'itm-' + i;
                }
            } else {
                (l1 as RouterGroup).routes.forEach((function(l2, j) {
                    if (l2.to == currentUrl || l2.startsWithMatcher != undefined && currentUrl.startsWith(l2.startsWithMatcher)) {
                        activeGroup = 'grp-' + i;
                        activeItem = activeGroup + '_itm-' + j;
                        if (i == 2 && currentUrl.endsWith('/NIST-800-53')) {
                            showControlFamilies = true;

                        }
                    }
                }))
            }
        }));
        if (activeItem !== undefined) {
            return {links: state.links, activeGroup: activeGroup, activeItem: activeItem, showControlFamilies: showControlFamilies};
        }
        return null;
    }

    static renderControlFamilies(productUrl) {
        productUrl += '/NIST-800-53';
        return (
            <Nav>
                <NavList variant="default">
                    <NavItem groupId="familiesGroup-AC" isActive={false} key={'AC'}>
                        <NavLink exact={true} to={productUrl + '#ac'}>
                            <UserIcon/> Access Control
                        </NavLink>
                    </NavItem>
                    <NavItem groupId="familiesGroup-AT" isActive={false} key={'AT'}>
                        <NavLink exact={true} to={productUrl + '#at'}>
                            <UserIcon/> Awarness and Training
                        </NavLink>
                    </NavItem>
                    <NavItem groupId="familiesGroup-AT" isActive={false} key={'AU'}>
                        <NavLink exact={true} to={productUrl + '#au'}>
                            <UserIcon/> Audit and Accountability
                        </NavLink>
                    </NavItem>
                </NavList>
            </Nav>
        )
    }

    render() {
        const { activeGroup, activeItem, showControlFamilies } = this.state;
        console.log("activeGroup=", activeGroup, ", activeItem=", activeItem);
        if (showControlFamilies) {
            console.log("SHOW FAMILIES")
        }
        return (
            <Nav onSelect={this.onSelect} theme="dark">
                <NavList>
                    { this.state.links.map((function(l1, i){
                          if ((l1 as any).to !== undefined) {
                              var id = 'itm-' + i;
                              return (
                                  <NavItem itemId={id} isActive={activeItem === id} key={id}>
                                      <NavLink exact={true} to={(l1 as MyRoute).to}>
                                          {l1.label}
                                      </NavLink>
                                  </NavItem>
                              );
                          } else {
                              var groupId = 'grp-' + i;
                              return (
                                  <NavExpandable title={l1.label} groupId={groupId} isActive={activeGroup === groupId} key={groupId} isExpanded>
                                      {
                                          (l1 as RouterGroup).routes.map((function(l2, j) {
                                              var id = groupId + '_itm-' + j;
                                              if (activeItem === id && showControlFamilies) {
                                                  return (
                                                      <NavExpandable title={l2.label} groupId="familiesGroup" isActive={true} key={id} isExpanded>
                                                          { Navigation.renderControlFamilies(l2.to) }
                                                      </NavExpandable>
                                                  )

                                              }
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
