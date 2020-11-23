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
import { BaseRoute, BaseRouteLink, BasicRoute, ProductRoute, RouterGroup } from '@app/AppLayout/Routes'
import { ProductInfo } from '@app/ato/Products/Static'
import { Memoize } from '@app/lib/Memoize'

interface NavigationState {
    activeGroup?: string;
    activeItem?: string;
    lastUrl?: string;
    productId?: string;
}


const staticNavigation: BaseRoute[] = [
    new BasicRoute('Getting Started', '/ato/getting_started'),
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
        new ProductRoute('Program Management', '/ato/products/select/NIST-800-53#PM-'),
        new ProductRoute('Risk Management', '/ato/products/select/NIST-800-53#RA-'),
        new ProductRoute('System and Services Acquisition', '/ato/products/select/NIST-800-53#SA-'),
        new ProductRoute('Systems and Communications Protection', '/ato/products/select/NIST-800-53#SC-'),
        new ProductRoute('System and Information Integrity', '/ato/products/select/NIST-800-53#SI-'),
    ]),
    new ProductRoute('SCAP', '/ato/products/select/SCAP'),
    new ProductRoute('SSP Templates', '/ato/products/select/ssp-templates'),
    new ProductRoute('Certification Progress', '/ato/products/select/Charts'),
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
        this.state = {};
        this.onSelect = this.onSelect.bind(this);
    }

    static links() {
        return staticNavigation.concat(Navigation.productSpecificLinks(GetActiveProductIdFromUrl()))
    }

    static productSpecificLinks = Memoize((productId?: string) => {
        var res = [] as BaseRoute[]
        if (productId !== undefined) {
            var info = ProductInfo[productId]
            if (info !== undefined) {
                Object.keys(info.texts).forEach((key) => {
                    if (key != "Overview" && key != "SCAP") {
                        res.push(new BasicRoute(key, '/ato/products/' + productId + '/' + key))
                    }
                })
            }
        }

        return res;
    })

    static getDerivedStateFromProps(props, state) {
        var currentUrl = window.location.pathname;
        if (currentUrl == '/') {
            currentUrl = '/ato/getting_started'
        }
        if (currentUrl == state.lastUrl && state.activeItem !== undefined) {
            return null;
        }
        var activeGroup, activeItem;
        Navigation.links().forEach((function (l1: BaseRoute, i) {
            if (activeItem) {
                return
            }
            if (!l1.isGroup()) {
                var l = l1 as BaseRouteLink;
                if (l.hasChilds()) {
                    const subroute = currentUrl + window.location.hash;
                    (l1 as any).subRoutes.forEach((function (l2, j) {
                        if (l2.matches(subroute)) {
                            activeGroup = 'grp-' + i;
                            activeItem = activeGroup + '_itm-' + j;
                        }
                    }))
                }
                if (activeItem) {
                    return
                }
                if (l.matches(currentUrl)) {
                    activeGroup = '';
                    activeItem = 'itm-' + i;
                }
            } else {
                (l1 as RouterGroup).routes.forEach((function (l2, j) {
                    if (!l2.isGroup()) {
                        if (l2.matches(currentUrl)) {
                            activeGroup = 'grp-' + i;
                            activeItem = activeGroup + '_itm-' + j;
                        }
                    }
                }))
            }
        }));
        if (activeItem !== undefined) {
            return {
                activeGroup: activeGroup,
                activeItem: activeItem,
                productId: GetActiveProductIdFromUrl()
            };
        }
        return null;
    }

    render() {
        const { activeGroup, activeItem, productId } = this.state;
        return (
            <Nav onSelect={this.onSelect} theme="dark">
                <NavList>
                    {Navigation.links().map((function (l1, i) {
                        if (!l1.isGroup()) {
                            var l = (l1 as BaseRouteLink);
                            var id = 'itm-' + i;
                            if ((activeItem === id || activeGroup === 'grp-' + i) && l.hasChilds() && productId != 'select') {
                                const groupId = 'grp-' + i;
                                return (
                                    <NavExpandable title={l1.label} groupId={groupId} isActive={true} key={groupId} isExpanded>
                                        {
                                            (l1 as any).subRoutes.map((function (l2, j) {
                                                const id = groupId + '_itm-' + j;
                                                return (
                                                    <NavItem to={l2.routesTo(productId) + '1'} groupId={groupId} itemId={id} isActive={activeItem === id} key={id}>
                                                        {l2.label}
                                                    </NavItem>
                                                );
                                            }
                                            ))
                                        }
                                    </NavExpandable>
                                )
                            } else {
                                //   Add NavGroup Title after first iteration "Getting Started"
                                    if (id === "itm-1") {
                                        return (
                                            <React.Fragment>
                                                <NavGroup title="Product Specific Assets" />
                                                <NavItem itemId={id} to={l.routesTo(productId)} isActive={activeItem === id} key={id}>
                                                    {l1.label}
                                                </NavItem>
                                            </React.Fragment>
                                        )
                                    }
                                    return (
                                        <NavItem itemId={id} to={l.routesTo(productId)} isActive={activeItem === id} key={id}>
                                            {l1.label}
                                        </NavItem>
                                    );
                              }
                            } else {
                            var groupId = 'grp-' + i;
                            return (
                                <React.Fragment key={groupId}>
                                    <NavExpandable title={l1.label} groupId={groupId} isActive={activeGroup === groupId} key={groupId} isExpanded>
                                        {
                                            (l1 as RouterGroup).routes.map((function (l2, j) {
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
                                    <br />
                                    <NavGroup title="Product Specific Assets" />
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
