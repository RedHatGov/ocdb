export interface ProductTemplate {
    image?: string;
};

const ProductInfo: {[Identifier: string]: ProductTemplate } = {
    'ansible-tower': {
        image: require('@app/assets/images/ansible-tower-logo.png')
    },
    coreos4: {
        image: require('@app/assets/images/coreos-logo.png')
    },
    ocp3: {
        image: require('@app/assets/images/openshift-logo.png')
    },
    osp13: {
        image: require('@app/assets/images/openstack-logo.png')
    },
};

export { ProductInfo }
