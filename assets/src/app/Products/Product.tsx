import * as React from 'react';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import {
  Page,
  Gallery,
  GalleryItem,
  TextContent,
  Text,
  Card,
  CardBody,
  CardHead,
  CardHeader,
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

class Product extends React.Component {
    render(){
        return (
            <Page>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">Product Documents</Text>
                        <Text component="p">Product-specific security documentation.</Text>
                    </TextContent>
                </PageSection>
            </Page>
        );
    }

    constructor(props) {
        super(props);

        console.log(props)
        this.state = {
            isLoading: true,
            products: []
        };
        fetch('/api/v1/components')
            .then(response => response.json())
            .then(data => this.setState({products: data, isLoading: false}));
    }
}

export { Product };
