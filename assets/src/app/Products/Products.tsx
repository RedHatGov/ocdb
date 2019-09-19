import * as React from 'react';
import { PageSection, Title, PageSectionVariants } from '@patternfly/react-core';
import {
  Accordion, AccordionItem, AccordionContent, AccordionToggle, Page,
  PageHeader,
  Gallery,
  GalleryItem,
  TextContent,
  Text,
  Card,
  CardBody,
  CardHead,
  CardHeader,
  TextVariants } from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import nistLogo from '@app/assets/images/nist-logo-2x.png';
import ansibleTowerLogo from '@app/assets/images/ansible-tower-logo.png';
import coreosLogo from '@app/assets/images/coreos-logo.png';
import openshiftLogo from '@app/assets/images/openshift-logo.png';
import openstackLogo from '@app/assets/images/openstack-logo.png';
import redhatLogo from '@app/assets/images/red-hat-logo-a.png';

const images = {
    'ansible-tower': ansibleTowerLogo,
    coreos4: coreosLogo,
    ocp3: openshiftLogo,
    osp13: openstackLogo,
};

const ProductGalleryItem: React.FunctionComponent<any> = (props) => {
    var productId = props['product']['key'];
    var logo = images[productId] || redhatLogo;
    return (
        <GalleryItem>
            <Card isHoverable>
                <CardHead>
                    <img src={logo} />
                </CardHead>
                <CardHeader>{props['product']['name']}</CardHeader>
                <CardBody><Text component="small">{props['product']['satisfies'].length} controls defined</Text></CardBody>
            </Card>
        </GalleryItem>
    )
};


class Products extends React.Component {
    render(){
        return (
            <Page>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">Product Documents</Text>
                        <Text component="p">Product-specific security documentation.</Text>
                    </TextContent>
                </PageSection>

                <PageSection>
                    <Gallery gutter="md">
                        { (this.state['isLoading'] ? <Spinner/> : this.state['products'].map((function(object, i){
                            return (<ProductGalleryItem key={object['key']} product={object} />);
                        })))}
                    </Gallery>
                </PageSection>
            </Page>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            products: []
        };
        fetch('/api/v1/components')
            .then(response => response.json())
            .then(data => this.setState({products: data, isLoading: false}));
    }
}

export { Products };

