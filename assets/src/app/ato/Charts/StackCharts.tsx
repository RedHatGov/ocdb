import * as React from 'react';
import { ChartThemeColor, getTheme, ChartThemeVariant } from '@patternfly/react-charts';
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
            return { 'name': status, 'x': k, 'y': y == undefined ? 0 : y }
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


    return (
        <React.Fragment>
            <p>{props.certName}</p>
            <div style={{ height: '580px', width: '500px' }}>
                <Chart
                    ariaDesc="Average number of pets"
                    ariaTitle="Area chart example"
                    legendData={legendData}
                    legendPosition="bottom-left"
                    height={550}
                    padding={{
                        bottom: 75, // Adjusted to accomodate legend
                        left: 50,
                        right: 50,
                        top: 50,
                    }}
                    maxDomain={{y: maxDomain}}
                    theme={theme}
                >
                    <ChartAxis />
                    <ChartAxis dependentAxis showGrid />
                    <ChartStack>
                        { result.map((statusArea) => {
                            return (<ChartArea key={statusArea[0].name} data={statusArea} interpolation="monotoneX" />)
                        }) }
                    </ChartStack>
                </Chart>
            </div>
            <br/>
            <br/>
        </React.Fragment>
    );
})
