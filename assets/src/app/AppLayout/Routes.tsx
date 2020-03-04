import * as React from 'react';

interface BaseRouteInterface {
    label: string;
}

interface MyRoute extends BaseRouteInterface {
    to: string;
}

function IsMyRoute(obj) {
    return obj.to !== undefined
}

interface MyProductRoute extends BaseRouteInterface {
    productTo: string;
    subRoutes?: MyProductRoute[];
}

function IsMyProductRoute(obj) {
    return obj.productTo !== undefined
}

interface RouterGroup extends BaseRouteInterface {
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

export { MyRouterItem, RoutesTo, IsMyRoute, IsMyProductRoute, DoesRouteMatches, RouterGroup }
