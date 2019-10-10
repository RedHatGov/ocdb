import ansibleTowerLogo from '@app/assets/images/ansible-tower-logo.png';
import coreosLogo from '@app/assets/images/coreos-logo.png';
import openshiftLogo from '@app/assets/images/openshift-logo.png';
import openstackLogo from '@app/assets/images/openstack-logo.png';

export interface ProductTemplate {
    image?: string;
};

const ProductInfo: {[Identifier: string]: ProductTemplate } = {
    'ansible-tower': {
        image: ansibleTowerLogo
    },
    coreos4: {
        image: coreosLogo
    },
    ocp3: {
        image: openshiftLogo
    },
    osp13: {
        image: openstackLogo
    },
};

export { ProductInfo }
