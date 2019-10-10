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
    Tab, Tabs,
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
import { OutlinedListAltIcon } from '@patternfly/react-icons'
import {
    DataToolbar, DataToolbarContent, DataToolbarFilter, DataToolbarGroup, DataToolbarItem,
    Spinner
} from '@patternfly/react-core/dist/esm/experimental';

import * as Api from '@app/lib/api'
import { Markdown } from '@app/lib/markdown';
import { ProductInfo } from '@app/ato/Products/Static.tsx'

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
    search: string[];
}

export interface RTMToolbarState {
    sectionIsExpanded: boolean;
    statusIsExpanded: boolean;
    solutionIsExpanded: boolean;
    filters: RTMToolbarFilters;
    expanded: boolean;
    matchedRows: number;
}
interface RTMToolbarProps {
    view: RTM;
    rowCount: number;
}

class RTMToolbar extends React.Component<RTMToolbarProps, RTMToolbarState> {
    sectionOptions = [
        { value: 'AC', label: 'Assess Control'},
        { value: 'AT', label: 'Awareness and Training'},
        { value: 'AU', label: 'Audit and Accountability'},
        { value: 'CA', label: 'Security Assessment & Authorization'},
        { value: 'CM', label: 'Configuration Management'},
        { value: 'CP', label: 'Contingency Planning'},
        { value: 'IA', label: 'Identification and Authentication'},
        { value: 'IR', label: 'Incident Response'},
        { value: 'MA', label: 'Maintenance'},
        { value: 'MP', label: 'Media Protection'},
        { value: 'PE', label: 'Physical & Environmental Protection'},
        { value: 'PL', label: 'Planning'},
        { value: 'PS', label: 'Personell Security'},
        { value: 'RA', label: 'Risk Management'},
        { value: 'SA', label: 'System and Services Acquisition'},
        { value: 'SC', label: 'Systems and Communications Protection'},
        { value: 'SI', label: 'System and Information Integrity'},
    ];
    statusOptions = [
        { value: 'complete', label: 'Complete'},
        { value: 'partial', label: 'Partial'},
        { value: 'not applicable', label: 'Not Applicable'},
        { value: 'planned', label: 'Planned'},
        { value: 'unsatisfied', label: 'Unsatisfied'},
        { value: 'unknown', label: 'Unknown'},
        { value: 'none', label: 'None'},
    ];
    solutionOptions = [
        { value: 'Available' },
        { value: 'Not available' }
    ];
    onExpandToggle(isChecked){};

    constructor(props) {
        super(props);
        this.state = {
            sectionIsExpanded: false,
            statusIsExpanded: false,
            solutionIsExpanded: false,
            filters: {section: [], status: [], solution: [], search: []},
            expanded: false,
            matchedRows: props.rowCount,
        };
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSectionToggle = this.onSectionToggle.bind(this);
        this.onSectionSelect = this.onSectionSelect.bind(this);
        this.onStatusToggle = this.onStatusToggle.bind(this);
        this.onStatusSelect = this.onStatusSelect.bind(this);
        this.onSolutionToggle = this.onSolutionToggle.bind(this);
        this.onSolutionSelect = this.onSolutionSelect.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onExpandToggle = this.props.view.onExpandToggle.bind(this.props.view);
    }

    onSelect(type, event, selection) {
        const checked = event.target.checked;
        const prevState = this.state;
        const prevSelections = prevState.filters[type];
        var filters = {
            ...prevState.filters,
            [type]: checked
            ? [...prevSelections, selection]
            : prevSelections.filter(value => value !== selection)
        };
        const matchedRows = this.props.view.recomputeFilters(filters);
        this.setState({filters: filters, matchedRows: matchedRows});
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
        var filters = this.state.filters;
        if (newValue.length > 3) {
            filters.search = [newValue];
            const matchedRows = this.props.view.recomputeFilters(filters);
            this.setState({filters: filters, matchedRows: matchedRows});
        } else if (filters.search != []) {
            filters.search = [];
            const matchedRows = this.props.view.recomputeFilters(filters);
            this.setState({filters: filters, matchedRows: matchedRows});
        }
    }

    onDelete(type="", id="") {
        if (type) {
            var filters = this.state.filters;
            filters[type.toLowerCase()] = filters[type.toLowerCase()].filter(s => s !== id);
            const matchedRows = this.props.view.recomputeFilters(filters);
            this.setState({filters: filters, matchedRows: matchedRows});

        } else {
            const filters = {
                section: [],
                status: [],
                solution: [],
                search: []
            }
            const matchedRows = this.props.view.recomputeFilters(filters);
            this.setState({filters: filters, matchedRows: matchedRows})
        }
    }

    render() {
        const { sectionIsExpanded, statusIsExpanded, solutionIsExpanded, filters, expanded } = this.state;
        const searchGroupItems = <React.Fragment>
            <DataToolbarItem variant="label" id="stacked-example-resource-select">Search</DataToolbarItem>
            <DataToolbarFilter chips={filters.search} deleteChip={this.onDelete} categoryName="Search">
                <InputGroup>
                    <TextInput name="textInput1" id="textInput1" type="search" aria-label="search input example" onChange={this.onSearchInputChange}/>
                    <Button variant={ButtonVariant.tertiary} aria-label="search button for search input">
                        <SearchIcon />
                    </Button>
                </InputGroup>
            </DataToolbarFilter>
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
                        <SelectOption key={index} value={option.value}>
                            {option.value}: {option.label}
                        </SelectOption>
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
                        <SelectOption key={index} value={option.value}>
                            {option.label}
                        </SelectOption>
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
            <DataToolbarItem>
                <strong>{this.state.matchedRows} </strong>
                { this.props.rowCount == this.state.matchedRows ?
                  "" :
                  <React.Fragment>
                      of <strong>{this.props.rowCount} </strong>
                  </React.Fragment>
                }
                Items
            </DataToolbarItem>
            <DataToolbarItem variant="separator"></DataToolbarItem>
            <DataToolbarItem>
                <Switch id="simple-switch" label="Collapse All" labelOff="Expand All" onChange={this.onExpandToggle} isChecked={expanded} />
            </DataToolbarItem>
        </React.Fragment>;

        const toolbarItems = <React.Fragment>
            <DataToolbarGroup variant="search-group">{searchGroupItems}</DataToolbarGroup>
            <DataToolbarGroup variant="filter-group">{filterGroupItems}</DataToolbarGroup>
            <DataToolbarGroup breakpointMods={[{modifier:"align-right"}]} variant="button-group">{buttonGroupItems}</DataToolbarGroup>
        </React.Fragment>;

        return <DataToolbar
                   id="data-toolbar-with-chip-groups"
                   clearAllFilters={this.onDelete}
                   showClearFiltersButton={filters.section.length !== 0 || filters.status.length !== 0 || filters.search.length !== 0 || filters.solution.length !== 0 }>
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
    allRows: IRow[];
}

class RTM extends React.Component<RTMProps, RTMState> {
    constructor(props) {
        super(props);

        var rows = props.content.map(function(c, idx) {
            var implementation_status = c.Satisfies ? c.Satisfies.implementation_status : "unknown";
            return [
                {
                    isOpen: false,
                    cells: [c.Key, c.Control.name, implementation_status],
                    _custom: c.Satisfies,
                    _text: JSON.stringify(c).toUpperCase()
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
            allRows: rows,
        }
        this.onCollapse = this.onCollapse.bind(this);
    }

    onExpandToggle(isChecked) {
        this.state.rows.forEach((function(r, i) {
            if (i % 2 == 0) {
               r.isOpen = isChecked;
            }
        }));
        this.setState({rows: this.state.rows});
    }

    onCollapse(event, rowKey, isOpen) {
        const rows = this.state.rows;
        /**
         * Please do not use rowKey as row index for more complex tables.
         * Rather use some kind of identifier like ID passed with each row.
         */
        rows[rowKey].isOpen = isOpen;
        this.setState({
            rows: rows
        });
    }
    recomputeFilters(filters) {
        const rowMatchesFilters = function(row, filters) {
            // calculate lastMatched on parent only
            if (filters.section.length != 0) {
                if (filters.section.some((function(selection) {
                    return row.cells[0].startsWith(selection);
                })) == false) {
                    return false;
                }
            }

            if (filters.status.length != 0) {
                if (filters.status.some((function(selection) {
                    return row.cells[2] == selection;
                })) == false) {
                    return false;
                }
            }

            if (filters.solution.length != 0) {
                if (filters.solution.some((function(selection) {
                    if (selection == 'Available') {
                        return (row._custom && row._custom.narrative && row._custom.narrative.length > 0);
                    } else {
                        return !(row._custom) || !(row._custom.narrative) || row._custom.narrative.length == 0;
                    }
                })) == false) {
                    return false;
                }
            }
            if (filters.search.length != 0) {
                if (filters.search.some((function(selection) {
                    return row._text.includes(selection.toUpperCase());
                })) == false) {
                    return false;
                }
            }

            return true;
        }

        var lastMatched = false;
        var matchedParents = 0;
        this.setState({rows: this.state.allRows.filter((function(row, i, arr) {
                if (!row.hasOwnProperty('parent')) {
                    lastMatched = rowMatchesFilters(row, filters);
                    if (lastMatched) {
                        matchedParents++;
                    }
                } else {
                    // update parent index
                    arr[i].parent = (matchedParents - 1) * 2;
                }

                return lastMatched;
        }))});
        return matchedParents;
    }

    render(){
        return (
            <TextContent>
                <Table
                        caption={<RTMToolbar view={this} rowCount={this.state.allRows.length / 2} />}
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


interface ProductState {
    isLoading: boolean;
    productId: string;
    product: any;
    activeTabKey: number;
};

class Product extends React.Component<{}, ProductState> {
    renderControls() {
        var controls = this.state.product['controls'];
        var nist80053 = controls['NIST-800-53'];
        var requirements = Array.prototype.concat.apply([], Object.keys(nist80053).map(function(k, _) { return nist80053[k]; }));
        return (<RTM content={requirements}/>);
    }

    renderOverview() {
        if (ProductInfo[this.state.productId] && ProductInfo[this.state.productId].overviewText) {
            const Element = ProductInfo[this.state.productId].overviewText;
            return <React.Fragment>
                <Markdown><Element/></Markdown>
                <br/>
                <br/>
            </React.Fragment>
        }
        return '';
    }

    renderTabs(){
        return (
            <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabClick}>
                <Tab eventKey={0} title="Overview">
                    <br/>
                    { this.renderOverview() }
                </Tab>
                <Tab eventKey={1} title={<React.Fragment>NIST-800-53 {this.state.isLoading ? <Spinner size="md"/> : <OutlinedListAltIcon/>} </React.Fragment>}>
                    <br/>
                    { this.state.isLoading ?
                      <Spinner/> :
                      <TextContent>
                          { this.state.product['errors'].length == 0 ?
                            '' :
                            <React.Fragment>
                                <Text component="h2">OpenControls Developer Information</Text>
                                <Alert  variant="warning" title="Metadata Warnings">
                                    {this.state.product.['errors'].map((function(error, i) {
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

    constructor(props) {
        super(props);
        const productId = props['computedMatch'].params.productId;

        this.state = {
            isLoading: true,
            productId: productId,
            product: null,
            activeTabKey: 0,
        };
        Api.componentControls(productId)
            .then(data => this.setState({product: data, isLoading: false}))
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(event, tabIndex) {
        this.setState({activeTabKey: tabIndex});
    }
}

export { Product };
