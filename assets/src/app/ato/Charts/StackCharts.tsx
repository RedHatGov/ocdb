import * as React from 'react';
import { ChartThemeColor, getTheme, ChartThemeVariant } from '@patternfly/react-charts';
import * as Api from '@app/lib/api'
import { StatusColor } from '@app/ato/Products/DataList'
import { CompletionChartsProps } from '@app/ato/Charts/PieCharts'
import { Chart, ChartArea, ChartAxis, ChartStack, ChartVoronoiContainer } from '@patternfly/react-charts';


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
    console.log("CompletionStackChart: ", props.statistics)

    return (
        <React.Fragment>
            <p>{props.certName}</p>
            <div style={{ height: '230px', width: '500px' }}>
                <Chart
                    ariaDesc="Average number of pets"
                    ariaTitle="Area chart example"
                    legendData={[{ name: 'Cats' }, { name: 'Birds' }, { name: 'Dogs' }]}
                    legendPosition="bottom-left"
                    height={225}
                    padding={{
                        bottom: 75, // Adjusted to accomodate legend
                        left: 50,
                        right: 50,
                        top: 50,
                    }}
                    maxDomain={{y: 30}}
                    themeColor={ChartThemeColor.multiUnordered}
                >
                    <ChartAxis />
                    <ChartAxis dependentAxis showGrid />
                    <ChartStack>
                        <ChartArea
                            data={[
                                { name: 'Cats', x: 'Sunday', y: 6 },
                                { name: 'Cats', x: 'Monday', y: 2 },
                                { name: 'Cats', x: 'Tuesday', y: 8 },
                                { name: 'Cats', x: 'Wednesday', y: 15 },
                                { name: 'Cats', x: 'Thursday', y: 6 },
                                { name: 'Cats', x: 'Friday', y: 2 },
                                { name: 'Cats', x: 'Saturday', y: 0 }
                            ]}
                            interpolation="monotoneX"
                        />
                        <ChartArea
                            data={[
                                { name: 'Birds', x: 'Sunday', y: 4 },
                                { name: 'Birds', x: 'Monday', y: 5 },
                                { name: 'Birds', x: 'Tuesday', y: 7 },
                                { name: 'Birds', x: 'Wednesday', y: 6 },
                                { name: 'Birds', x: 'Thursday', y: 10 },
                                { name: 'Birds', x: 'Friday', y: 3 },
                                { name: 'Birds', x: 'Saturday', y: 5 }
                            ]}
                            interpolation="monotoneX"
                        />
                        <ChartArea
                            data={[
                                { name: 'Dogs', x: 'Sunday', y: 8 },
                                { name: 'Dogs', x: 'Monday', y: 18 },
                                { name: 'Dogs', x: 'Tuesday', y: 14 },
                                { name: 'Dogs', x: 'Wednesday', y: 8 },
                                { name: 'Dogs', x: 'Thursday', y: 6 },
                                { name: 'Dogs', x: 'Friday', y: 8 },
                                { name: 'Dogs', x: 'Saturday', y: 12 }
                            ]}
                            interpolation="monotoneX"
                        />
                    </ChartStack>
                </Chart>
            </div>
            <br/>
            <br/>
        </React.Fragment>
    );
})
