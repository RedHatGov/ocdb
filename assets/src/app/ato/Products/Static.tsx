export interface ProductTemplate {
    overviewText?: any
    image?: string;
};

const ProductInfo: {[Identifier: string]: ProductTemplate } = {
    'ansible-tower': {
        image: require('@app/assets/images/ansible-tower-logo.png'),
        overviewText: require('@app/assets/markdown/products/ansible-tower.md').default
    },
    coreos4: {
        image: require('@app/assets/images/coreos-logo.png'),
        overviewText: require('@app/assets/markdown/products/coreos4.md').default
    },
    idm: {
        overviewText: require('@app/assets/markdown/products/idm.md').default
    },
    insights: {
        overviewText: require('@app/assets/markdown/products/insights.md').default
    },
    ocp3: {
        image: require('@app/assets/images/openshift-logo.png'),
        overviewText: require('@app/assets/markdown/products/ocp3.md').default
    },
    'openshift-dedicated': {
        overviewText: require('@app/assets/markdown/products/openshift-dedicated.md').default
    },
    osp13: {
        image: require('@app/assets/images/openstack-logo.png'),
        overviewText: require('@app/assets/markdown/products/osp13.md').default
    },
};

export { ProductInfo }
