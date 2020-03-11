export const ProductIdOverridesMap: {[Identifier: string]: string} = {
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
    return ProductIdOverridesMap[id] || id;
}


interface ProductText {
    name: string;
    text: any;
}

export interface ProductTemplate {
    image?: string;
    texts: {[Identifier: string]:ProductText};
};

const ProductInfo: {[Identifier: string]: ProductTemplate } = {
    'ansible-tower': {
        image: require('@app/assets/images/ansible-tower-logo.png').default,
        texts: {
            'Overview': require('@app/assets/markdown/products/ansible-tower/Overview.md').default,
            'ICS-500-27': require('@app/assets/markdown/products/ansible-tower/ICS-500-27.md').default,
            'SCAP': require('@app/assets/markdown/products/ansible-tower/SCAP.md').default,
        }
    },
    'coreos-4': {
        image: require('@app/assets/images/coreos-logo.png').default,
        texts: {
            'Overview': require('@app/assets/markdown/products/coreos-4/Overview.md').default,
            'SCAP': require('@app/assets/markdown/products/coreos-4/SCAP.md').default,
        }
    },
    'identity-management': {
        texts: {
            'Overview': require('@app/assets/markdown/products/identity-management/Overview.md').default
        }
    },
    insights: {
        texts: {
            'Overview': require('@app/assets/markdown/products/insights/Overview.md').default
        }
    },
    'openshift-container-platform-3': {
        image: require('@app/assets/images/openshift-logo.png').default,
        texts: {
            'Overview': require('@app/assets/markdown/products/openshift-container-platform-3/Overview.md').default,
            'SCAP': require('@app/assets/markdown/products/openshift-container-platform-3/SCAP.md').default,
        }
    },
    'openshift-container-platform-4': {
        image: require('@app/assets/images/openshift-logo.png').default,
        texts: {
            'Overview': require('@app/assets/markdown/products/openshift-container-platform-4/Overview.md').default,
            'SCAP': require('@app/assets/markdown/products/openshift-container-platform-4/SCAP.md').default,
        }
    },
    'openshift-dedicated': {
        texts: {
            'Overview': require('@app/assets/markdown/products/openshift-dedicated/Overview.md').default
        }
    },
    'openstack-platform-13': {
        image: require('@app/assets/images/openstack-logo.png').default,
        texts: {
            'Overview': require('@app/assets/markdown/products/openstack-platform-13/Overview.md').default,
            'SCAP': require('@app/assets/markdown/products/openstack-platform-13/SCAP.md').default,
        }
    },
    'rhel-7': {
        texts: {
            'Overview': require('@app/assets/markdown/products/rhel-7/Overview.md').default,
            'SCAP': require('@app/assets/markdown/products/rhel-7/SCAP.md').default,
        }
    },
    'rhel-8': {
        texts: {
            'Overview': require('@app/assets/markdown/products/rhel-8/Overview.md').default,
            'SCAP': require('@app/assets/markdown/products/rhel-8/SCAP.md').default,
            'STIG': require('@app/assets/markdown/products/rhel-8/STIG.md').default,
        }
    },
    'virtualization-host': {
        texts: {
            'Overview': require('@app/assets/markdown/products/virtualization-host/Overview.md').default,
        }
    },
    'virtualization-manager': {
        texts: {
            'Overview': require('@app/assets/markdown/products/virtualization-manager/Overview.md').default,
        }
    }
};

export { ProductIdOverride, ProductInfo }
