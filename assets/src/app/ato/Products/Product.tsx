import * as React from 'react';
import {
    Alert,
    Page, PageSection, PageSectionVariants,
    Tab, Tabs,
    TextContent,
    Text,
} from '@patternfly/react-core';
import { OutlinedListAltIcon } from '@patternfly/react-icons'
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import * as Api from '@app/lib/api'
import { Markdown } from '@app/lib/markdown';
import { ProductIdOverride, ProductInfo } from '@app/ato/Products/Static.tsx'
import { FedRAMPDownload } from '@app/ato/Products/FedRAMPDownload.tsx'
import { RTMDataList } from '@app/ato/Products/DataList.tsx'

interface ProductState {
    isLoading: boolean;
    productId: string;
    product: any;
    activeTabKey: number;
};

class Product extends React.Component<any, ProductState> {
    renderControls() {
        return (<RTMDataList content={this.state.product['controls']}/>);
    }

    static texts(productId: string) {
        return ProductInfo[productId] ? ProductInfo[productId].texts : [];
    }

    texts() {
        return Product.texts(this.state.productId);
    }

    static nameToTabId(productId: string, tabName: string) {
        if (tabName == 'Overview') {
            return 0;
        } else if (tabName == 'NIST-800-53' || tabName == 'nist-800-53') {
            return 1;
        } else {
            return 1 + Product.texts(productId).findIndex( ({ name }) => name == tabName );
        }
    }
    tabIdToName(id) {
        if (id == 0) {
            return 'Overview';
        } else if (id == 1) {
            return 'NIST-800-53';
        } else {
            return this.texts()[id - 1].name;
        }
    }

    renderMarkdown(textPosition) {
        const texts = this.texts();
        if (texts.length > textPosition ) {
            const Element = texts[textPosition].text;
            return <React.Fragment>
                <Markdown><Element/></Markdown>
            </React.Fragment>
        }
        return '';
    }

    renderTabs(){
        const renderMarkdown = this.renderMarkdown;
        return (
            <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabClick}>
                <Tab eventKey={0} title="Overview">
                    <br/>
                    { this.renderMarkdown(0) }
                </Tab>
                <Tab eventKey={1} title={<React.Fragment>NIST-800-53 {this.state.isLoading ? <Spinner size="md"/> : <OutlinedListAltIcon/>} </React.Fragment>}>
                    <br/>
                    <FedRAMPDownload productId={this.state.productId}/>
                    { this.state.isLoading ?
                      <Spinner/> :
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
                                <Text component="p">Go fix the warning on <Text component='a' href="https://github.com/ComplianceAsCode/redhat">github</Text>.</Text>
                            </React.Fragment>
                          }
                          <Text component="h2">Requirements Traceability Matrix</Text>

                          { this.renderControls() }
                      </TextContent>
                    }
                </Tab>
                {
                    this.texts().slice(1).map((function(text, id) {
                        return <Tab key={id+2} eventKey={id + 2} title={text.name}>
                            <br/>
                            { renderMarkdown(id + 1) }
                        </Tab>;
                    }))
                }
            </Tabs>
        );
    }

    render(){
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
        if (state.productId == productId) {
            return null;
        }
        return {
            isLoading: true,
            productId: productId,
            product: null,
        }
    }
    componentDidUpdate() {
        if (this.state.isLoading) {
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
            activeTabKey: Product.nameToTabId(productId, props['computedMatch'].params.tabId),
        };
        this.handleTabClick = this.handleTabClick.bind(this);
        this.setUrlLocation = this.setUrlLocation.bind(this);
        this.renderMarkdown = this.renderMarkdown.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.tabIdToName = this.tabIdToName.bind(this);
        this.componentDidUpdate();
    }

    handleTabClick(event, tabIndex) {
        this.setUrlLocation(tabIndex)
        this.setState({activeTabKey: tabIndex});
    }
    setUrlLocation(tabIndex) {
        this.props.history.push('/ato/products/' + this.state.productId + '/' + this.tabIdToName(tabIndex));
    }
}

export { Product };
