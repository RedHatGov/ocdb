abstract class BaseRoute {
    abstract isGroup(): boolean;
    constructor(public label: string) { this.label = label; }
}

abstract class BaseRouteLink extends BaseRoute {
    isGroup(): boolean { return false };
    abstract routesTo(productId?: string): string;
}

class BasicRoute extends BaseRouteLink {
    constructor(label: string, public to: string) {
        super(label);
        this.to = to;
    }
    routesTo(_unused?:string): string {
        return this.to;
    }
}

class ProductRoute extends BaseRouteLink {
    constructor(label: string, public productTo: string, public subRoutes?: ProductRoute[]) {
        super(label);
        this.productTo = productTo;
        this.subRoutes = subRoutes;
    }
    routesTo(productId?:string): string {
        if (productId) {
            return this.productTo.replace('select', productId)
        } else {
            return this.productTo
        }
    }
}

class RouterGroup extends BaseRoute {
    isGroup(): boolean { return true };
    constructor(label: string, public routes: BasicRoute[]) {
        super(label);
        this.routes = routes;
    }
}

function DoesRouteMatches(route: BaseRouteLink, url : string) {
    if (route.constructor.name == "BasicRoute") {
        return (route as BasicRoute).to == url
    } else {
        const matcher = (route as ProductRoute).productTo.replace('select', '[\\w-]+');
        return url.search(matcher) != -1;
    }
}

export { BaseRoute, BaseRouteLink, BasicRoute, ProductRoute, DoesRouteMatches, RouterGroup }
