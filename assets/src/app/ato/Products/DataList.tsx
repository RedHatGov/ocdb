import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Button, ButtonVariant,
    DataList,
    DataListItem,
    DataListItemRow,
    DataListCell,
    DataListToggle,
    DataListContent,
    DataListItemCells,
    InputGroup,
    Label,
    Select, SelectOption, SelectVariant,
    Switch,
    TextInput,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons'
import {
    DataToolbar, DataToolbarContent, DataToolbarFilter, DataToolbarGroup, DataToolbarItem,
} from '@patternfly/react-core/dist/esm/experimental';

import { CustomControl } from '@app/ato/Products/OpenControlStructs.tsx'
import { RTMDetail } from '@app/ato/Products/RTMDetail.tsx'

interface RTMToolbarFilters {
    section: string[];
    status: string[];
    solution: string[];
    search: string[];
}

interface RTMToolbarState {
    sectionIsExpanded: boolean;
    statusIsExpanded: boolean;
    solutionIsExpanded: boolean;
    filters: RTMToolbarFilters;
    expanded: boolean;
}
interface RTMToolbarProps {
    view: RTMDataList;
    rowCount: number;
    visibleRows: number;
}

class RTMToolbar extends React.PureComponent<RTMToolbarProps, RTMToolbarState> {
    sectionOptions = [
        { value: 'AC', label: 'Access Control'},
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
        { value: 'PS', label: 'Personnel Security'},
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
    onExpandToggle(isChecked){
        this.setState({expanded: isChecked});
        this.props.view.onExpandToggle(isChecked);
    };

    constructor(props) {
        super(props);
        this.state = {
            sectionIsExpanded: false,
            statusIsExpanded: false,
            solutionIsExpanded: false,
            filters: {section: [], status: [], solution: [], search: []},
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
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        // magic to fill in the search, when someone opens the page with the specific #anchor
        const hash = window.location.hash.replace('%20', ' ');
        if (hash.length > 1) {
            location.hash = hash;
            this.props.view.expandAnchoredRow(hash);
        }
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
        this.props.view.recomputeFilters(filters);
        this.setState({filters: filters});
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
        if (newValue.length == 0) {
            filters.search = []
        } else {
            filters.search = [newValue];
        }
        this.props.view.recomputeFilters(filters);
        this.setState({filters: filters});
    }

    onDelete(type="", id="") {
        if (type) {
            var filters = this.state.filters;
            filters[type.toLowerCase()] = filters[type.toLowerCase()].filter(s => s !== id);
            this.setState({filters: filters});
            this.props.view.recomputeFilters(filters);

        } else {
            const filters = {
                section: [],
                status: [],
                solution: [],
                search: []
            }
            this.props.view.recomputeFilters(filters);
            this.setState({filters: filters})
        }
    }

    render() {
        console.log('Toolbar.render()')
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
                <strong>{this.props.visibleRows} </strong>
                { this.props.rowCount == this.props.visibleRows ?
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
                   clearAllFilters={this.onDelete}>
                   <DataToolbarContent>{toolbarItems}</DataToolbarContent>
               </DataToolbar>;
    }
}

const StatusColor = {
    'unknown': '#e31c3d',
    'unsatisfied': '#e31c3d',
    'none': '#e31c3d',
    'not applicable': '#2e8540',
    'complete': '#2e8540',
    'partial': '#fdb81e',
    'planned': '#02bfe7',
};

const ImplementationStatus: React.FunctionComponent<any> = (props) => {
    var style : React.CSSProperties = { 'backgroundColor': StatusColor[props['status']] };
    return (<Label isCompact style={style}>{props['status']}</Label>);
}

interface RTMDataListItemProps {
    content: CustomControl;
    forceExpand: boolean;
}

interface RTMDataListItemState {
    expanded: boolean;
}

class RTMDataListItem extends React.PureComponent<RTMDataListItemProps, RTMDataListItemState> {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
    }
    toggle() {
        this.setState({expanded: !this.state.expanded})
    }

    render() {
        const c = this.props.content;
        const expanded = this.props.forceExpand || this.state.expanded;
        const implementation_status = c.Satisfies ? c.Satisfies.implementation_status : "unknown";

        return (
            <DataListItem aria-labelledby="ex-item1" isExpanded={expanded}>
            <DataListItemRow>
            <DataListToggle
            onClick={() => this.toggle()}
            isExpanded={expanded}
                        id="ex-toggle1"
                        aria-controls="ex-expand1"
                    />
                    <DataListItemCells
                        dataListCells={[
                            <DataListCell isIcon key="icon">
                            </DataListCell>,
                            <DataListCell key="primary content">
                                <NavLink to={"#" + c.Key}><div id={c.Key}>{c.Key}</div></NavLink>
                            </DataListCell>,
                            <DataListCell key="secondary content">
                                {c.Control.name}
                            </DataListCell>,
                            <DataListCell key="secondary content 2">
                                <ImplementationStatus status={implementation_status} />
                            </DataListCell>
                        ]}
                    />
               </DataListItemRow>
               { expanded ?
                 <DataListContent
                     aria-label="Primary Content Details"
                     isHidden={!expanded}
                     >
                     <RTMDetail control={c}/>
                 </DataListContent>
                 : ''
               }
            </DataListItem>
        )
    }
}

interface ControlWrapper {
    control: CustomControl;
    visible: boolean;
    fulltext: string;
}
export interface RTMProps {
    content: CustomControl[];
}

export interface RTMState {
    data: ControlWrapper[];
    visibleRows: number;
    expandAll: boolean;
}

class RTMDataList extends React.Component<RTMProps, RTMState> {
    constructor(props) {
        super(props);
        this.state = {
            expandAll: false,
            visibleRows: props.content.length,
            data: props.content.map(function(c, idx) {
                c.expanded = false;
                return {
                    control: c,
                    visible: true,
                    fulltext: JSON.stringify(c).toUpperCase()
                };
            })
        }
    }

    static rowMatchesFilters(control: CustomControl, fulltext: string, filters: RTMToolbarFilters) {
        if (filters.section.length != 0) {
            if (filters.section.some((function(selection) {
                return control.Key.startsWith(selection);
            })) == false) {
                return false;
            }
        }

        if (filters.status.length != 0) {
            if (filters.status.some((function(selection) {
                return (selection == 'unknown' && control.Satisfies == null) || (control.Satisfies != null && control.Satisfies.implementation_status == selection);
            })) == false) {
                return false;
            }
        }

        if (filters.solution.length != 0) {
            if (filters.solution.some((function(selection) {
                if (selection == 'Available') {
                    return (control.Satisfies != undefined && control.Satisfies.narrative && control.Satisfies.narrative.length > 0 && control.Satisfies.narrative[0].text != '');
                } else {
                    return control.Satisfies == undefined || !(control.Satisfies.narrative) || control.Satisfies.narrative.length == 0 || (control.Satisfies.narrative.length == 1 && control.Satisfies.narrative[0].text == '');
                }
            })) == false) {
                return false;
            }
        }
        if (filters.search.length != 0) {
            if (filters.search.some((function(selection) {
                return fulltext.includes(selection.toUpperCase());
            })) == false) {
                return false;
            }
        }

        return true;
    }


    onExpandToggle(isChecked) {
        this.setState({expandAll: isChecked});
    }

    expandAnchoredRow(tbd) {}
    recomputeFilters(filters) {
        this.setState((prevState, prosp) => {
            var visibleRows = 0;
            var data = prevState.data.map(function(c, idx) {
                c.visible = RTMDataList.rowMatchesFilters(c.control, c.fulltext, filters);
                if (c.visible) {
                    visibleRows++;
                }
                return c;
            })
            return {data: data, visibleRows: visibleRows}
        });
    };

    render () {
        console.log('RTMDataList.render() ------------- ');
        const expandAll = this.state.expandAll;
        return (
            <React.Fragment>
                <RTMToolbar view={this} rowCount={this.state.data.length} visibleRows={this.state.visibleRows} />

                <DataList aria-label="Expandable data list example">
                    { this.state.data.map(function(c, idx) {
                          return (
                              <div key={idx} style={c.visible ? {} : {display:'none'}}>
                                  {c.visible}
                                  <RTMDataListItem content={c.control} forceExpand={expandAll && c.visible} />
                              </div>
                          )
                    })}
                </DataList>
            </React.Fragment>
        )
    }
}


export { RTMDataList };
