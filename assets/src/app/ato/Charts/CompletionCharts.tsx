import * as React from 'react';
import { ChartPie, ChartThemeColor, getTheme, ChartThemeVariant } from '@patternfly/react-charts';
import * as Api from '@app/lib/api'
import { StatusColor } from '@app/ato/Products/DataList'

interface CompletionChartsProps {
    productId: string;
}

interface CompletionChartsState {
    productId: string;
    isLoading: boolean;
    statistics: any;
}

export class CompletionCharts extends React.Component<CompletionChartsProps, CompletionChartsState> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            statistics: null,
            productId: props.productId,
        }
        Api.statistics(props.productId).then(data => {
            this.setState({statistics: data, isLoading: false})})
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
        if (statistics == null) {
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
    product: any;
    statistisc: any;
}

const CertificationCompletionPieChart = React.memo((props: any) => {
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
    return (
        <React.Fragment>
            <p>{props.statistics.Certification}</p>
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
