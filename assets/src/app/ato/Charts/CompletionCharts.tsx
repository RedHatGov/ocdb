import React from 'react';
import { PageSection } from '@patternfly/react-core';
import { Tabs, Tab } from '@patternfly/react-core';
import { CompletionPieCharts, CompletionChartsProps } from '@app/ato/Charts/PieCharts'
import { CompletionStackCharts } from '@app/ato/Charts/StackCharts'

interface CompletionChartsState {
    activeTabKey: number;
}

export class CompletionCharts extends React.PureComponent<CompletionChartsProps, CompletionChartsState> {
    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 0
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(event, tabIndex){
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
