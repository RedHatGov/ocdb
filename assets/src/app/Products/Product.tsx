import * as React from 'react';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import {
  Page,
  TextContent,
  Text,
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

class Product extends React.Component {
    render(){
        return (
            <Page>
                <PageSection variant={PageSectionVariants.light}>
                    { this.state['isLoading'] ?
                      <Spinner/> :
                      <TextContent>
                          <Text component="h1">{this.state['product']['name']}</Text>
                          <Text component="h2">Product-specific security documentation.</Text>
                          <Text component="p">TBD lorem.</Text>
                          <Text component="h2">OpenControls</Text>
                          <Text component="p">{JSON.stringify(this.state['product']['controls'])}</Text>
                      </TextContent>
                    }
                </PageSection>
            </Page>
        );
    }

    constructor(props) {
        super(props);
        const productId = props['computedMatch'].params.productId;

        this.state = {
            isLoading: true,
            productId: productId,
            product: null
        };
        fetch('/api/v1/components/' + productId + '/controls')
            .then(response => response.json())
            .then(data => this.setState({product: data, isLoading: false}))
    }
}

export { Product };
