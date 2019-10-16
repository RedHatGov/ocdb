export interface ProductTemplate {
    overviewText?: any
    image?: string;
};

const ProductInfo: {[Identifier: string]: ProductTemplate } = {
    'ansible-tower': {
        image: require('@app/assets/images/ansible-tower-logo.png'),
        overviewText: require('@app/assets/markdown/products/ansible-tower/Overview.md').default
    },
    coreos4: {
        image: require('@app/assets/images/coreos-logo.png'),
        overviewText: require('@app/assets/markdown/products/coreos4/Overview.md').default
    },
    idm: {
        overviewText: require('@app/assets/markdown/products/idm/Overview.md').default
    },
    insights: {
        overviewText: require('@app/assets/markdown/products/insights/Overview.md').default
    },
    ocp3: {
        image: require('@app/assets/images/openshift-logo.png'),
        overviewText: require('@app/assets/markdown/products/ocp3/Overview.md').default
    },
    'openshift-dedicated': {
        overviewText: require('@app/assets/markdown/products/openshift-dedicated/Overview.md').default
    },
    osp13: {
        image: require('@app/assets/images/openstack-logo.png'),
        overviewText: require('@app/assets/markdown/products/osp13/Overview.md').default
    },
    rhvh: {
        overviewText: require('@app/assets/markdown/products/rhvh/Overview.md').default,
    },
    rhvm: {
        overviewText: require('@app/assets/markdown/products/rhvm/Overview.md').default,
    }
};

export { ProductInfo }
