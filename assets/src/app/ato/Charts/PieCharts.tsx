import * as React from 'react';
import { TextContent, Text } from '@patternfly/react-core';
import { ChartPie, ChartThemeColor, getTheme, ChartThemeVariant } from '@patternfly/react-charts';
import * as Api from '@app/lib/api'
import { StatusColor } from '@app/ato/Products/DataList'

export interface CompletionChartsProps {
    productId: string;
}

interface CompletionPieChartsState {
    productId: string;
    statistics: any;
}

export class CompletionPieCharts extends React.PureComponent<CompletionChartsProps, CompletionPieChartsState> {
    constructor(props) {
        super(props);
        this.state = {
            statistics: null,
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
        if (statistics == null || statistics.Certifications == undefined) {
            return ("")
        }
        const certs = statistics.Certifications;
        return (
            <React.Fragment>
                { Object.keys(certs).map((c) => { return (<CertificationCompletionPieChart key={c} statistics={certs[c]} />)}) }
            </React.Fragment>
        )
    }
}

interface CertificationCompletionPieChartProps {
    statistics: any;
}

const CertificationCompletionPieChart = React.memo((props: CertificationCompletionPieChartProps) => {
    const res = props.statistics.Results
    const data = Object.keys(res).map((c) => {
        return {"x": c, "y": res[c]}
    })
    const legend = Object.keys(res).map((c) => {
        return {"name": c + ": " + res[c]}
    })
    const theme = getTheme(ChartThemeColor.blue, ChartThemeVariant.light)
    data.forEach((status, i) => {
        theme.pie.colorScale[i] = StatusColor[status.x]
        theme.legend.colorScale[i] = StatusColor[status.x]
    })
    const baseUrl = window.location.pathname.replace('/Charts', '/NIST-800-53') + "?standard=" + props.statistics.Certification + "&status="
    return (
        <React.Fragment>
            <TextContent>
                <Text component="h2">{props.statistics.Certification}</Text>
            </TextContent>
            <div style={{ height: '230px', width: '350px' }}>
                <ChartPie
                    ariaDesc={"Pie chart of " + props.statistics.Certification}
                    ariaTitle={"Completion of " + props.statistics.Certification}
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
                    theme={theme}
                    width={350}
               />
            </div>
        </React.Fragment>
    )
})
