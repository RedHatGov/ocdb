abstract class BaseRoute {
    label: string;
    abstract isGroup(): boolean;
    constructor(label) { this.label = label; }
}

class BasicRoute extends BaseRoute {
    to: string
    isGroup(): boolean { return false };
    constructor(label, to) {
        super(label);
        this.to = to;
    }
}

class ProductRoute extends BaseRoute {
    productTo: string;
    subRoutes?: ProductRoute[];

    isGroup(): boolean { return false };
    constructor(label, productTo, subRoutes?) {
        super(label);
        this.productTo = productTo;
        this.subRoutes = subRoutes;
    }
}
type FinalRouteInterface = BasicRoute | ProductRoute;

class RouterGroup extends BaseRoute {
    routes: BasicRoute[];
    isGroup(): boolean { return true };
    constructor(label, routes) {
        super(label);
        this.routes = routes;
    }
}

function DoesRouteMatches(route: FinalRouteInterface, url : string) {
    if (route.constructor.name == "BasicRoute") {
        return (route as BasicRoute).to == url
    } else {
        const matcher = (route as ProductRoute).productTo.replace('select', '[\\w-]+');
        return url.search(matcher) != -1;
    }
}

function RoutesTo(route : (FinalRouteInterface), productId:string|undefined) {
    if (route.constructor.name == "BasicRoute") {
        return (route as BasicRoute).to
    } else {
        if (productId) {
            return (route as ProductRoute).productTo.replace('select', productId)
        } else {
            return (route as ProductRoute).productTo
        }
    }
}

export { BaseRoute, BasicRoute, ProductRoute, RoutesTo, DoesRouteMatches, RouterGroup }
