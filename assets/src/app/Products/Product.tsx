import * as React from 'react';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import {
  Alert,
  Page,
  TextContent,
  Text,
} from '@patternfly/react-core';
import { IRow, Table, TableBody, TableHeader, TableVariant,} from '@patternfly/react-table'
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

export interface RTMProps {
    content: string;
    groupName: string;
}

export interface RTMState {
    columns: string[];
    rows: (string[] | IRow)[];
}

class RTM extends React.Component<RTMProps, RTMState> {
    constructor(props) {
        super(props);

        var rows = props.content.map(function(c, _idx) {
            console.log(c)
            var implementation_status = c.Satisfies ? c.Satisfies.implementation_status : "unknown";
            return {cells: [c.Key, c.Control.name, implementation_status]};
        })

        this.state = {
            columns: [
                'Control', 'Name', 'Status'
            ],
            rows: rows,
        }
    }

    render(){
        return (
            <TextContent>
                <Text component="h3">{this.props.groupName}</Text>
                <Table caption="Requirements Traceability Matrix"
                        variant={TableVariant.compact}
                        rows={this.state.rows}
                        cells={this.state.columns}>
                    <TableHeader />
                    <TableBody />
                </Table>
            </TextContent>
        )
    }
}

class Product extends React.Component {
    renderControls() {
        var controls = this.state['product']['controls'];
        var nist80053 = controls['NIST-800-53'];
        return (
            <TextContent>
            { Object.keys(nist80053).map(function(k, i) {
                return (<RTM key={k} groupName={k} content={nist80053[k]}/>);
            })}
            </TextContent>
        )
    }

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
                          { this.renderControls() }
                          { this.state['product']['errors'].length == 0 ? ' ' : <Alert  variant="warning" title="Minor problem found">{this.state['product']['errors']}</Alert> }
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
