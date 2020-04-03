import React from 'react';
import { PageSection } from '@patternfly/react-core';
import { Tabs, Tab } from '@patternfly/react-core';
import { ComponentStats } from '@app/ato/Charts/common'
import { CompletionPieCharts} from '@app/ato/Charts/PieCharts'
import { CompletionStackCharts } from '@app/ato/Charts/StackCharts'
import * as Api from '@app/lib/api'
import * as qs from '@app/lib/querystring'

interface CompletionChartsProps {
    productId: string;
}

interface CompletionChartsState {
    activeTabKey: number;
    productId: string;
    data: ComponentStats;
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
            activeTabKey: titleToId[params.tab],
            data: {},
            productId: props.productId,

        };
        this.handleTabClick = this.handleTabClick.bind(this);
        this.reloadData()
    }

    handleTabClick(event, tabIndex){
        qs.Set({'tab': tabIndex})
        this.setState({
            activeTabKey: tabIndex
        });
    };

    static getDerivedStateFromProps(props, state) {
        if (state.productId != props.productId) {
            return {productId: props.productId, data: {}}
        }
        return null;
    }

    componentDidUpdate() {
        if (Object.keys(this.state.data).length == 0 && this.state.productId != 'select') {
            if (this.state.productId.startsWith('rhel-')) {
                return
            }
            this.reloadData()
        }
    }

    reloadData() {
        Api.statistics(this.state.productId).then(data => {
            if (data == "Not found") {
                data = {}
            }
            this.setState({data: data})
        })
    }

    render() {
        return (
            <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabClick}>
                <Tab eventKey={0} title="Certification Completion">
                    <PageSection>
                        <CompletionPieCharts data={this.state.data} />
                    </PageSection>
                </Tab>
                <Tab eventKey={1} title="Progress over time">
                    <PageSection>
                        <CompletionStackCharts data={this.state.data} />
                    </PageSection>
                </Tab>
            </Tabs>
        );
    }
}
