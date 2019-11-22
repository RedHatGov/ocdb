const idOverridesMap: {[Identifier: string]: string} = {
    coreos4: 'coreos-4',
    idm: 'identity-management',
    ocp3: 'openshift-container-platform-3',
    osp13: 'openstack-platform-13',
    rhvh: 'virtualization-host',
    rhvm: 'virtualization-manager'
}

function ProductIdOverride(id) {
    // Previously our product content was published under different names.
    // If user refers to the product by old name, we fetch the new name first.
    return idOverridesMap[id] || id;
}


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
    'coreos-4': {
        image: require('@app/assets/images/coreos-logo.png'),
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/coreos4/Overview.md').default
            }
        ]
    },
    'identity-management': {
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
    'openshift-container-platform-3': {
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
    'openstack-platform-13': {
        image: require('@app/assets/images/openstack-logo.png'),
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/osp13/Overview.md').default
            }
        ]
    },
    'virtualization-host': {
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/rhvh/Overview.md').default,
            }
        ]
    },
    'virtualization-manager': {
        texts: [
            {
                name: 'Overview',
                text: require('@app/assets/markdown/products/rhvm/Overview.md').default,
            }
        ]
    }
};

export { ProductIdOverride, ProductInfo }
