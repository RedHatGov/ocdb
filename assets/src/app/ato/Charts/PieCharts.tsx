import * as React from 'react';
import { TextContent, Text } from '@patternfly/react-core';
import { ChartPie } from '@patternfly/react-charts';
import * as Api from '@app/lib/api'
import { StatusColor } from '@app/ato/Products/DataList'
import { CertificationStats, CompletionChartProps, CompletionChartsProps, controlsBaseUrl, customTheme } from '@app/ato/Charts/common'

interface CompletionPieChartsState {
    productId: string;
    statistics: any[];
}

export class CompletionPieCharts extends React.PureComponent<CompletionChartsProps, CompletionPieChartsState> {
    constructor(props) {
        super(props);
        this.state = {
            statistics: [],
            productId: props.productId,
        }
        Api.statistics(props.productId).then(data => {
            this.setState({statistics: data})})
    }

    static getDerivedStateFromProps(props, state) {
        if (state.productId != props.productId) {
            return {productId: props.productId, statistics: null}
        }
        return null;
    }

    componentDidUpdate() {
        if (this.state.statistics == null && this.state.productId != 'select') {
            Api.statistics(this.state.productId)
               .then(data => {
                   this.setState({statistics: data})
               })
        }
    }

    render() {
        const { statistics } = this.state;
        if (statistics.length == 0) {
            return ("")
        }
        return (
            <React.Fragment>
                { Object.keys(statistics).map((c) => { return (<CertificationCompletionPieChart key={c} cs={statistics[c]} />)}) }
            </React.Fragment>
        )
    }
}

const CertificationCompletionPieChart = React.memo((props: CompletionChartProps) => {
    const res = props.cs.History[props.cs.History.length - 1].Stats
    const data = Object.keys(res).map((c) => {
        return {"x": c, "y": res[c]}
    })
    const legend = Object.keys(res).map((c) => {
        return {"name": c + ": " + res[c]}
    })
    const baseUrl = controlsBaseUrl(props.cs.Certification)
    return (
        <React.Fragment>
            <TextContent>
                <Text component="h2">{props.cs.Certification}</Text>
            </TextContent>
            <div style={{ height: '230px', width: '350px' }}>
                <ChartPie
                    ariaDesc={"Pie chart of " + props.cs.Certification}
                    ariaTitle={"Completion of " + props.cs.Certification}
                    constrainToVisibleArea={true}
                    data={data}
                    height={230}
                    labels={({ datum }) => `${datum.x}: ${datum.y}`}
                    legendData={legend}
                    legendOrientation="vertical"
                    legendPosition="right"
                    events={[{
                        target: "data",
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: "data",
                                    mutation: (props) => {
                                        window.open(baseUrl + data[props.index].x);
                                        return null
                                    }
                                }];
                            }
                        }
                    }]}
                    padding={{
                        bottom: 20,
                        left: 20,
                        right: 180, // Adjusted to accommodate legend
                        top: 20
                    }}
                    theme={customTheme(data.map((s) => s.x) , 'pie')}
                    width={350}
               />
            </div>
        </React.Fragment>
    )
})
