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
import { NavLink } from 'react-router-dom';
import { GetProductParamsFromUrl } from '@app/AppLayout/ProductSelector'
import { ProductInfo } from '@app/ato/Products/Static.tsx'

import * as Api from '@app/lib/api'
import redhatLogo from '@app/assets/images/red-hat-logo-a.png';

const ProductGalleryItem: React.FunctionComponent<any> = (props) => {
    var productId = props['product']['key'];
    var logo = (ProductInfo[productId] && ProductInfo[productId].image) || redhatLogo;
    return (
        <GalleryItem>
            <NavLink exact={true} to={"/ato/products/" + productId + props['params']}>
                <label>{productId}</label>
                <Card isHoverable>
                    <CardHead>
                        <img src={logo} />
                    </CardHead>
                    <CardHeader>{props['product']['name']}</CardHeader>
                    <CardBody><Text component="small">{props['product']['satisfies'].length} controls defined</Text></CardBody>
                </Card>
            </NavLink>
        </GalleryItem>
    )
};

class Products extends React.Component {
    render(){
        const params = GetProductParamsFromUrl();
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
                            return (<ProductGalleryItem key={object['key']} product={object} params={params} />);
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
        Api.components()
            .then(data => this.setState({products: data, isLoading: false}));
    }
}

export { Products };

