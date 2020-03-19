import * as React from 'react';
import { ChartPie } from '@patternfly/react-charts';
import * as Api from '@app/lib/api'

interface CompletionChartsProps {
    productId: string;
}

interface CompletionChartsState {
    isLoading: boolean;
    statistics: any;
}

export class CompletionCharts extends React.Component<CompletionChartsProps, CompletionChartsState> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            statistics: null,
        }
        Api.statistics(props.productId).then(data => {
            this.setState({statistics: data, isLoading: false})})
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
                    width={350}
                />
            </div>
        </React.Fragment>
    )
})
