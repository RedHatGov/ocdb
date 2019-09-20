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
                          <Text component="p">Product-specific security documentation.</Text>
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
        fetch('/api/v1/components/' + productId)
            .then(response => response.json())
            .then(data => this.setState({product: data, isLoading: false}))
    }
}

export { Product };
