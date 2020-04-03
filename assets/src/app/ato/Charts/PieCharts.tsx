import * as React from 'react';
import { TextContent, Text } from '@patternfly/react-core';
import { ChartPie } from '@patternfly/react-charts';
import { CompletionChartProps, CompletionChartsProps, controlsBaseUrl, customTheme } from '@app/ato/Charts/common'

export const CompletionPieCharts = React.memo((props: CompletionChartsProps) => {
    const { data } = props;
    return (
        <React.Fragment>
            { Object.keys(data).map((c) => { return (<CertificationCompletionPieChart key={c} cs={data[c]} />)}) }
        </React.Fragment>
    )
})

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
