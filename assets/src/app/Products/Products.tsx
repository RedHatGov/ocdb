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
                            return (<Text component="p">{i}</Text>);
                        })))}
                    </Gallery>
                </PageSection>

                <PageSection>
                    <Gallery gutter="md">
                        <GalleryItem>
                            <Card isHoverable>
                                <CardHead>
                                    <img src={ansibleTowerLogo} />
                                </CardHead>
                                <CardHeader>Ansible Tower</CardHeader>
                            </Card>
                        </GalleryItem>
                        <GalleryItem>
                            <Card isHoverable>
                                <CardHead>
                                    <img src={coreosLogo} />
                                </CardHead>
                                <CardHeader>CoreOS 4.x</CardHeader>
                            </Card>
                        </GalleryItem>
                        <GalleryItem>
                            <Card isHoverable>
                                <CardHead>
                                    <img src={openshiftLogo} />
                                </CardHead>
                                <CardHeader>OpenShift 3.x</CardHeader>
                            </Card>
                        </GalleryItem>
                        <GalleryItem>
                            <Card isHoverable>
                                <CardHead>
                                    <img src={openstackLogo} />
                                </CardHead>
                                <CardHeader>OpenStack 13</CardHeader>
                            </Card>
                        </GalleryItem>
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

