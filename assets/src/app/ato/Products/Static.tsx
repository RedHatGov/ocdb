interface ProductText {
    name: string;
    text: any;
}

export interface ProductTemplate {
    image?: string;
    texts: ProductText[];
    disableFedrampDownload?: boolean,
};

const ProductInfo: {[Identifier: string]: ProductTemplate } = {
    'ansible-tower': {
        image: require('@app/assets/images/ansible-tower-logo.png'),
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/ansible-tower/Overview.md').default
            },
            {
                name: 'ICS-500-27',
                text: require('@app/assets/markdown/products/ansible-tower/ICS-500-27.md').default
            }
        ]
    },
    coreos4: {
        image: require('@app/assets/images/coreos-logo.png'),
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/coreos4/Overview.md').default
            }
        ]
    },
    idm: {
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/idm/Overview.md').default
            }
        ]
    },
    insights: {
        disableFedrampDownload: true,
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/insights/Overview.md').default
            }
        ]
    },
    ocp3: {
        image: require('@app/assets/images/openshift-logo.png'),
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/ocp3/Overview.md').default
            }
        ]
    },
    'openshift-dedicated': {
        disableFedrampDownload: true,
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/openshift-dedicated/Overview.md').default
            }
        ]
    },
    osp13: {
        image: require('@app/assets/images/openstack-logo.png'),
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/osp13/Overview.md').default
            }
        ]
    },
    rhvh: {
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/rhvh/Overview.md').default,
            }
        ]
    },
    rhvm: {
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/rhvm/Overview.md').default,
            }
        ]
    }
};

export { ProductInfo }
