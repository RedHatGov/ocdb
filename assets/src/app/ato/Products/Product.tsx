import * as React from 'react';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import {
    Accordion, AccordionItem, AccordionContent, AccordionToggle,
    Alert,
    Card,CardBody, CardHeader,
    Page,
    TextContent,
    Text,
} from '@patternfly/react-core';
import { ICell, IRow, Table, TableBody, TableHeader, TableVariant,} from '@patternfly/react-table'
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import * as Api from '@app/lib/api'
import {ExpandableRowContent, IFormatterValueType, IRowData } from '@patternfly/react-table'
export const expandable = (data?: IFormatterValueType, rowData? : IRowData) =>
    rowData && rowData.hasOwnProperty('parent') ? <ExpandableRowContent>{data}</ExpandableRowContent> : (data ? data : '');


export interface Narative {
    key?: string,
    text: string
}

export interface Satisfies {
    narrative: Narative[];
}

export interface Control {
    name: string,
    description: string,
}
export interface CustomControl {
    Key: string,
    Control: Control,
    Satisfies: Satisfies,
}


export interface CustomControlState {
    expanded: string[],
}

export interface CustomControlProps {
    satisfies: Satisfies;
}

class SatisfiesAccordion extends React.Component<CustomControlProps, CustomControlState> {
    constructor(props) {
        super(props);
        this.state = {
            expanded: props.satisfies == null ? [] : props.satisfies.narrative.map(function(_, idx) {
                return 'toggle' + (idx + 1);
            })
        };
    }

    render() {
        if (this.props.satisfies == null) {
            return (<Text component="p">Not available</Text>);
        }

        const expanded = this.state.expanded;

        const toggle = id => {
            const expanded = this.state.expanded;
            const index = expanded.indexOf(id);
            const newExpanded =
                index >= 0 ? [...expanded.slice(0, index), ...expanded.slice(index + 1, expanded.length)] : [...expanded, id];
            this.setState(() => ({ expanded: newExpanded }));
        };

        return (
            <Accordion asDefinitionList={false}>
                { this.props.satisfies.narrative.map(function(n, idx) {
                    const id = 'toggle' + (idx + 1);
                    return (
                        <AccordionItem key={id}>
                            <AccordionToggle
                                onClick={() => toggle(id) }
                                isExpanded={expanded.includes(id)}
                                id={id}>
                                {n.key}
                            </AccordionToggle>
                            <AccordionContent
                                id={id}
                                isHidden={!expanded.includes(id)}
                                isFixed
                            >
                                <p>
                                    {n.text}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        )
    }
}


export interface RTMDetailProps {
    control: CustomControl;
}

class RTMDetail extends React.Component<RTMDetailProps, {}> {
    render() {
        var c = this.props.control;
        return (
            <PageSection>
                <Card>
                    <CardHeader>
                        <TextContent>
                            <Text component="h3">{c.Key}: {c.Control.name}</Text>
                        </TextContent>
                    </CardHeader>
                    <CardBody>
                        <TextContent>
                            <Text component="p">{c.Control.description}</Text>
                        </TextContent>
                        <br/>
                        <TextContent>
                            <Text component="h4">{c.Key}: What is the solution and how is it implemented?</Text>
                        </TextContent>
                        <SatisfiesAccordion satisfies={c.Satisfies} />
                    </CardBody>
                </Card>
            </PageSection>
        );
    }
}

export interface RTMProps {
    content: any;
}

export interface RTMState {
    columns: (ICell | string)[];
    rows: IRow[];
}

class RTM extends React.Component<RTMProps, RTMState> {
    constructor(props) {
        super(props);

        var rows = props.content.map(function(c, idx) {
            var implementation_status = c.Satisfies ? c.Satisfies.implementation_status : "unknown";
            return [
                {
                    isOpen: false,
                    cells: [c.Key, c.Control.name, implementation_status]
                },
                {
                    parent: idx * 2,
                    fullWidth: true,
                    cells: [<React.Fragment><RTMDetail control={c} /></React.Fragment>]
                }
            ];
        }).flat(1);

        this.state = {
            columns: [
                { title: 'Control', cellFormatters: [expandable] },
                'Name',
                'Status'
            ],
            rows: rows,
        }
        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse(event, rowKey, isOpen) {
        const rows = this.state.rows;
        /**
         * Please do not use rowKey as row index for more complex tables.
         * Rather use some kind of identifier like ID passed with each row.
         */
        rows[rowKey].isOpen = isOpen;
        this.setState({
            rows
        });
    }

    render(){
        return (
            <TextContent>
                <Table caption="Requirements Traceability Matrix"
                        variant={TableVariant.compact}
                        onCollapse={this.onCollapse}
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
        var requirements = Array.prototype.concat.apply([], Object.keys(nist80053).map(function(k, _) { return nist80053[k]; }));
        return (<RTM content={requirements}/>);
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
        Api.componentControls(productId)
            .then(data => this.setState({product: data, isLoading: false}))
    }
}

export { Product };
