import * as React from 'react';
import {
    Accordion, AccordionItem, AccordionContent, AccordionToggle,
    Alert,
    Button, ButtonVariant,
    Card,CardBody, CardHeader,
    InputGroup,
    Page, PageSection, PageSectionVariants,
    Select, SelectOption, SelectVariant,
    Switch,
    TextContent,
    Text,
    TextInput,
} from '@patternfly/react-core';
import {
    ExpandableRowContent,
    ICell, IFormatterValueType, IRow, IRowData,
    Table, TableBody, TableHeader, TableVariant,
} from '@patternfly/react-table'
import { SearchIcon } from '@patternfly/react-icons'
import {
    DataToolbar, DataToolbarContent, DataToolbarFilter, DataToolbarGroup, DataToolbarItem,
    Spinner
} from '@patternfly/react-core/dist/esm/experimental';

import * as Api from '@app/lib/api'

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

export interface RTMToolbarFilters {
    section: string[];
    status: string[];
    solution: string[];
}

export interface RTMToolbarState {
    sectionIsExpanded: boolean;
    statusIsExpanded: boolean;
    solutionIsExpanded: boolean;
    filters: RTMToolbarFilters;
    userSearch: string;
    expanded: boolean;
}

class RTMToolbar extends React.Component<{}, RTMToolbarState> {
    sectionOptions = [
        { value: 'AC'},
        { value: 'AT'},
        { value: 'AU'},
        { value: 'CA'},
        { value: 'CM'},
        { value: 'CP'},
        { value: 'IA'},
        { value: 'IR'},
        { value: 'MA'},
        { value: 'MP'},
        { value: 'PE'},
        { value: 'PL'},
        { value: 'PS'},
        { value: 'RA'},
        { value: 'SA'},
        { value: 'SC'},
        { value: 'SI'},
    ];
    statusOptions = [
        { value: 'complete', disabled: false },
        { value: 'partial', disabled: false },
        { value: 'not applicable', disabled: false },
        { value: 'planned', disabled: false },
        { value: 'unsatisfied', disabled: false },
        { value: 'unknown', disabled: false },
    ];
    solutionOptions = [
        { value: 'Available' },
        { value: 'Not available' }
    ];
    constructor(props) {
        super(props);
        this.state = {
            sectionIsExpanded: false,
            statusIsExpanded: false,
            solutionIsExpanded: false,
            filters: {section: [], status: [], solution: []},
            userSearch: '',
            expanded: false,
        };
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSectionToggle = this.onSectionToggle.bind(this);
        this.onSectionSelect = this.onSectionSelect.bind(this);
        this.onStatusToggle = this.onStatusToggle.bind(this);
        this.onStatusSelect = this.onStatusSelect.bind(this);
        this.onSolutionToggle = this.onSolutionToggle.bind(this);
        this.onSolutionSelect = this.onSolutionSelect.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onExpandToggle = this.onExpandToggle.bind(this);
    }

    onSelect(type, event, selection) {
        const checked = event.target.checked;
        this.setState((prevState) => {
        const prevSelections = prevState.filters[type];
        return {
          filters: {
            ...prevState.filters,
            [type]: checked
              ? [...prevSelections, selection]
              : prevSelections.filter(value => value !== selection)
          }
        };
      });
    }

    onSectionToggle(isExpanded) {
        this.setState({
            sectionIsExpanded: isExpanded
        });
    };
    onSectionSelect(event, selection) {
        this.onSelect('section', event, selection);
    };

    onStatusToggle(isExpanded) {
        this.setState({
            statusIsExpanded: isExpanded
        });
    };
    onStatusSelect(event, selection) {
        this.onSelect('status', event, selection);
    };

    onSolutionToggle(isExpanded) {
        this.setState({
            solutionIsExpanded: isExpanded
        });
    };
    onSolutionSelect(event, selection) {
        this.onSelect('solution', event, selection);
    };

    onSearchInputChange(newValue) {
        this.setState({userSearch: newValue});
    }

    onDelete(type="", id="") {
        if (type) {
            this.setState((prevState) => {
                prevState.filters[type.toLowerCase()] = prevState.filters[type.toLowerCase()].filter(s => s !== id);
                return {
                    filters: prevState.filters,
                }
            });
        } else {
            this.setState({
                filters: {
                    section: [],
                    status: [],
                    solution: []
                }
            })
        }
    }
    onExpandToggle(isChecked) {
        // TODO
    }


    render() {
        const { sectionIsExpanded, statusIsExpanded, solutionIsExpanded, filters, expanded } = this.state;
        const searchGroupItems = <React.Fragment>
            <DataToolbarItem variant="label" id="stacked-example-resource-select">Search</DataToolbarItem>
            <DataToolbarItem>
                <InputGroup>
                    <TextInput name="textInput1" id="textInput1" type="search" aria-label="search input example" onChange={this.onSearchInputChange} />
                    <Button variant={ButtonVariant.tertiary} aria-label="search button for search input">
                        <SearchIcon />
                    </Button>
                </InputGroup>
            </DataToolbarItem>
        </React.Fragment>

        const filterGroupItems = <React.Fragment>
            <DataToolbarFilter chips={filters.section} deleteChip={this.onDelete} categoryName="Section">
                <Select
                    variant={SelectVariant.checkbox}
                    aria-label="Section"
                    onToggle={this.onSectionToggle}
                    onSelect={this.onSectionSelect}
                    selections={filters.section}
                    isExpanded={sectionIsExpanded}
                    placeholderText="Section"
                >
                    {this.sectionOptions.map((option, index) => (
                        <SelectOption
                            key={index}
                            value={option.value}
                        />
                    ))}
                </Select>
            </DataToolbarFilter>
            <DataToolbarFilter chips={filters.status} deleteChip={this.onDelete} categoryName="Status">
                <Select
                    variant={SelectVariant.checkbox}
                    aria-label="Status"
                    onToggle={this.onStatusToggle}
                    onSelect={this.onStatusSelect}
                    selections={filters.status}
                    isExpanded={statusIsExpanded}
                    placeholderText="Status"
                >
                    {this.statusOptions.map((option, index) => (
                        <SelectOption
                            key={index}
                            value={option.value}
                        />
                    ))}
                </Select>
            </DataToolbarFilter>
            <DataToolbarFilter chips={filters.solution} deleteChip={this.onDelete} categoryName="Solution">
                <Select
                    variant={SelectVariant.checkbox}
                    aria-label="Solution"
                    onToggle={this.onSolutionToggle}
                    onSelect={this.onSolutionSelect}
                    selections={filters.solution}
                    isExpanded={solutionIsExpanded}
                    placeholderText="Solution"
                >
                    {this.solutionOptions.map((option, index) => (
                        <SelectOption
                            key={index}
                            value={option.value}
                        />
                    ))}
                </Select>
            </DataToolbarFilter>
        </React.Fragment>;

        const buttonGroupItems = <React.Fragment>
            <DataToolbarItem variant="separator"></DataToolbarItem>
            <DataToolbarItem>
                <Switch id="simple-switch" label="Collapse All" labelOff="Expand All" onChange={this.onExpandToggle} isChecked={expanded} />
            </DataToolbarItem>
        </React.Fragment>;

        const toolbarItems = <React.Fragment>
            <DataToolbarGroup variant="search-group">{searchGroupItems}</DataToolbarGroup>
            <DataToolbarGroup variant="filter-group">{filterGroupItems}</DataToolbarGroup>
            <DataToolbarGroup variant="button-group">{buttonGroupItems}</DataToolbarGroup>
        </React.Fragment>;

        return <DataToolbar
                   id="data-toolbar-with-chip-groups"
                   clearAllFilters={this.onDelete}
                   showClearFiltersButton={filters.section.length !== 0 || filters.status.length !== 0 }>
                   <DataToolbarContent>{toolbarItems}</DataToolbarContent>
               </DataToolbar>;
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
                <Table
                        caption={<RTMToolbar/>}
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
                          <Text component="h2">Requirements Traceability Matrix</Text>
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
