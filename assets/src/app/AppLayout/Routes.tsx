abstract class BaseRoute {
    abstract isGroup(): boolean;
    constructor(public label: string) { this.label = label; }
}

class BasicRoute extends BaseRoute {
    isGroup(): boolean { return false };
    constructor(label: string, public to: string) {
        super(label);
        this.to = to;
    }
}

class ProductRoute extends BaseRoute {
    isGroup(): boolean { return false };
    constructor(label: string, public productTo: string, public subRoutes?: ProductRoute[]) {
        super(label);
        this.productTo = productTo;
        this.subRoutes = subRoutes;
    }
}
type FinalRouteInterface = BasicRoute | ProductRoute;

class RouterGroup extends BaseRoute {
    isGroup(): boolean { return true };
    constructor(label: string, public routes: BasicRoute[]) {
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
