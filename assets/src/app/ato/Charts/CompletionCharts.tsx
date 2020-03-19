import * as React from 'react';
import { ChartPie } from '@patternfly/react-charts';
import { Certification } from '@app/ato/Products/OpenControlStructs'

interface CompletionChartsProps {
    product: any;
    certifications: Certification[];
}

export const CompletionCharts = React.memo((props :CompletionChartsProps) => {
    return (
        <React.Fragment>
            { props.certifications.map((c) => { return (<CertificationCompletionPieChart key={c.Key} certification={c} product={props.product} />)}) }
        </React.Fragment>
    )
})

interface CertificationCompletionPieChartProps {
    product: any;
    certification: Certification;
}

const CertificationCompletionPieChart = React.memo((props: any) => {
    return (
        <React.Fragment>
            <p>{props.certification.Key}</p>
            <div style={{ height: '230px', width: '350px' }}>
                <ChartPie
                    ariaDesc={"Pie chart of " + props.certification.Key}
                    ariaTitle={"Completion of " + props.certification.Key}
                    constrainToVisibleArea={true}
                    data={[{ x: 'Cats', y: 35 }, { x: 'Dogs', y: 55 }, { x: 'Birds', y: 10 }]}
                    height={230}
                    labels={({ datum }) => `${datum.x}: ${datum.y}`}
                    legendData={[{ name: 'Cats: 35' }, { name: 'Dogs: 55' }, { name: 'Birds: 10' }]}
                    legendOrientation="vertical"
                    legendPosition="right"
                    padding={{
                        bottom: 20,
                        left: 20,
                        right: 140, // Adjusted to accommodate legend
                        top: 20
                    }}
                    width={350}
                />
            </div>
        </React.Fragment>
    )
})
