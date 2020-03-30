import React from 'react';
import { PageSection } from '@patternfly/react-core';
import { Tabs, Tab } from '@patternfly/react-core';
import { CompletionPieCharts, CompletionChartsProps } from '@app/ato/Charts/PieCharts'
import { CompletionStackCharts } from '@app/ato/Charts/StackCharts'
import * as qs from '@app/lib/querystring'

interface CompletionChartsState {
    activeTabKey: number;
}

const titleToId = {
    undefined: 0,
    "0": 0,
    "1": 1,
}

export class CompletionCharts extends React.PureComponent<CompletionChartsProps, CompletionChartsState> {
    constructor(props) {
        super(props);
        const params = qs.Parse()
        this.state = {
            activeTabKey: titleToId[params.tab]
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(event, tabIndex){
        qs.Set({'tab': tabIndex})
        this.setState({
            activeTabKey: tabIndex
        });
    };

    render() {
        return (
            <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabClick}>
                <Tab eventKey={0} title="Certification Completion">
                    <PageSection>
                        <CompletionPieCharts productId={this.props.productId} />
                    </PageSection>
                </Tab>
                <Tab eventKey={1} title="History of Completion">
                    <PageSection>
                        <CompletionStackCharts productId={this.props.productId} />
                    </PageSection>
                </Tab>
            </Tabs>
        );
    }
}
