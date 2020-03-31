import * as React from 'react';
import { TextContent, Text } from '@patternfly/react-core';
import { ChartThemeColor, getTheme, ChartThemeVariant, ChartVoronoiContainer } from '@patternfly/react-charts';
import * as Api from '@app/lib/api'
import { StatusColor } from '@app/ato/Products/DataList'
import { CompletionChartsProps } from '@app/ato/Charts/PieCharts'
import { Chart, ChartArea, ChartAxis, ChartStack } from '@patternfly/react-charts';


interface CompletionStackChartsState {
    productId: string;
    data: any;
}

export class CompletionStackCharts extends React.PureComponent<CompletionChartsProps, CompletionStackChartsState> {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            productId: props.productId,
        }
        this.reloadData()
    }

    static getDerivedStateFromProps(props, state) {
        if (state.productId != props.productId) {
            return {productId: props.productId, data: null}
        }
        return null;
    }

    componentDidUpdate() {
        if (this.state.data == null && this.state.productId != 'select') {
            this.reloadData()
        }
    }

    reloadData() {
        Api.statisticsHistory(this.state.productId)
           .then(data => {
               var result = {};
               data.map((snapshot) => {
                   Object.keys(snapshot.Stats.Certifications).map((certName) => {
                       if (result[certName] == undefined) {
                         result[certName] = []
                       }
                       result[certName].push({
                           'time': snapshot.Time,
                           'stats': snapshot.Stats.Certifications[certName].Results,
                       })
                   })
               })
               this.setState({data: result})
           })
    }

    render() {
        const { data } = this.state;
        if (data == null) {
            return ("")
        }
        return (
            <React.Fragment>
                { Object.keys(data).map((c) => { return (<CompletionStackChart key={c} certName={c} statistics={data[c]} />)}) }
            </React.Fragment>
        )
    }
}

interface CompletionStackChartProps {
    certName: string;
    statistics: any;
}

const CompletionStackChart = React.memo((props: CompletionStackChartProps) => {
    const statuses = props.statistics.map((s) => Object.keys(s.stats)).flat().filter((value, index, self) => {
        return self.indexOf(value) === index;
    })

    const result = statuses.map((status) => {
        return props.statistics.map((snapshot, k) => {
            const y = snapshot.stats[status]
            return { 'name': status, 'x': new Date(snapshot.time), 'y': y == undefined ? 0 : y }
        })
    })

    const legendData = statuses.map((status) => {
        return { name: status }
    })
    const maxDomain = Object.values(props.statistics[0].stats).reduce((a, b) => { return (a as number) + (b as number) }) as number

    const theme = getTheme(ChartThemeColor.blue, ChartThemeVariant.light)
    statuses.forEach((status, i) => {
        theme.stack.colorScale[i] = StatusColor[status]
        theme.legend.colorScale[i] = StatusColor[status]
    })
    const baseUrl = window.location.pathname.replace('/Charts', '/NIST-800-53') + "?standard=" + props.certName + "&status="
    const eventHandlers = [{
        target: "data",
        eventHandlers: {
            onClick: () => {
                return [{
                    target: "data",
                    mutation: (props) => {
                        window.open(baseUrl + props.data[0].name);
                        return null
                    }
                }];
            }
        }
    }]

    return (
        <React.Fragment>
            <TextContent>
                <Text component="h2">{props.certName}</Text>
            </TextContent>
            <div style={{ height: '465px', width: '750px' }}>
                <Chart
                    ariaDesc="Control responses over time"
                    ariaTitle="Control responses over time"
                    legendData={legendData}
                    legendOrientation="vertical"
                    legendPosition="right"
                    height={300}
                    padding={{
                        bottom: 75, // Adjusted to accomodate legend
                        left: 50,
                        right: 150,
                        top: 20,
                    }}
                    maxDomain={{y: maxDomain}}
                    theme={theme}
                    scale={{x: 'time'}}
                    containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
                >
                    <ChartAxis />
                    <ChartAxis dependentAxis showGrid />
                    <ChartStack>
                        { result.map((statusArea) => {
                            return (<ChartArea key={statusArea[0].name} data={statusArea} interpolation="monotoneX" events={eventHandlers} />)
                        }) }
                    </ChartStack>
                </Chart>
            </div>
        </React.Fragment>
    );
})
