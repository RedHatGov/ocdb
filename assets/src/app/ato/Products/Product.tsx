import * as React from 'react';
import {
    Alert,
    Page, PageSection, PageSectionVariants,
    TextContent,
    Text,
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import * as Api from '@app/lib/api'
import { Markdown } from '@app/lib/markdown';
import { ProductIdOverride, ProductInfo } from '@app/ato/Products/Static.tsx'
import { RTMDataList } from '@app/ato/Products/DataList.tsx'
import { Products } from '@app/ato/Products/Products'

interface ProductState {
    isLoading: boolean;
    productId: string;
    product: any;
    activeTabKey: string;
};

class Product extends React.Component<any, ProductState> {
    static texts(productId: string) {
        return ProductInfo[productId] ? ProductInfo[productId].texts : {};
    }

    texts() {
        return Product.texts(this.state.productId);
    }

    renderMarkdown(textId) {
        const texts = this.texts();
        const Element = texts[textId] as any;
        if (Element) {
            return <React.Fragment>
                <Markdown><Element/></Markdown>
            </React.Fragment>
        }
        return '';
    }

    renderTabs(){
        if (this.state.activeTabKey == 'NIST-800-53' || this.state.activeTabKey == 'nist-800-53') {
            if (this.state.isLoading) {
                return <Spinner/>
            } else {
                return (
                    <TextContent>
                        { this.state.product['errors'].length == 0 ?
                          '' :
                          <React.Fragment>
                              <Text component="h2">OpenControls Developer Information</Text>
                              <Alert  variant="warning" title="Metadata Warnings">
                                  {this.state.product['errors'].map((function(error, i) {
                                       return <Text component="p" key={i}>{error}</Text>;
                                   }))}
                              </Alert>
                              <br/>
                              <Text component="p">Go fix the warning on <Text component='a' href={"https://github.com/ComplianceAsCode/redhat/tree/master/" + this.state.productId}>github</Text>.</Text>
                          </React.Fragment>
                        }
                        <Text component="h2">Requirements Traceability Matrix</Text>
                        <RTMDataList content={this.state.product['controls']}/>
                    </TextContent>
                )
            }
        } else {
            const renderMarkdown = this.renderMarkdown;
            return renderMarkdown(this.state.activeTabKey);
        }
    }

    render(){
        if (this.state.productId == 'select') {
            return <Products/>
        }

        return (
            <Page>
                <PageSection variant={PageSectionVariants.light}>
                    { this.state.isLoading ?
                      <Spinner/> :
                      <React.Fragment>
                          <TextContent>
                              <Text component="h1">{this.state.product['name']}</Text>
                          </TextContent>
                        </React.Fragment>
                    }

                    { this.renderTabs() }

                </PageSection>
            </Page>
        );
    }

    static getId(props) {
        return ProductIdOverride(props['computedMatch'].params.productId);
    }
    static getDerivedStateFromProps(props, state) {
        const productId = Product.getId(props);
        const activeTabKey = props['computedMatch'].params.tabId;
        if (state.productId != productId) {
            return {
                isLoading: true,
                productId: productId,
                product: null,
                activeTabKey: activeTabKey,
            }
        }
        if (state.activeTabKey != activeTabKey) {
            return {activeTabKey};
        }
        return null;
    }
    componentDidUpdate() {
        if (this.state.isLoading && this.state.productId != 'select') {
            Api.componentControls(this.state.productId)
               .then(data => {
                   const nist80053 = data['controls']['NIST-800-53'];
                   data['controls'] = Array.prototype.concat.apply([], Object.keys(nist80053).map(function(k, _) { return nist80053[k]; }));
                   this.setState({product: data, isLoading: false})
               })
        }
    }

    constructor(props) {
        super(props);
        const productId = Product.getId(props);

        this.state = {
            isLoading: true,
            productId: productId,
            product: null,
            activeTabKey: props['computedMatch'].params.tabId,
        };
        this.renderMarkdown = this.renderMarkdown.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidUpdate();
    }
}

export { Product };
