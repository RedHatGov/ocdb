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
    ocp3: {
        image: require('@app/assets/images/openshift-logo.png'),
        overviewText: require('@app/assets/markdown/products/ocp3.md').default
    },
    osp13: {
        image: require('@app/assets/images/openstack-logo.png')
    },
};

export { ProductInfo }
