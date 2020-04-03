import { ChartThemeColor, getTheme, ChartThemeVariant } from '@patternfly/react-charts';
import { StatusColor } from '@app/ato/Products/DataList'

export interface CompletionChartsProps {
    data: ComponentStats;
}

export interface CompletionChartProps {
    cs: CertificationStats;
}

export function controlsBaseUrl(standardName: string) {
    return window.location.pathname.replace('/Charts', '/NIST-800-53') + "?standard=" + standardName + "&status="
}

export function customTheme(statuses: any[], chartType: string) {
    const theme = getTheme(ChartThemeColor.blue, ChartThemeVariant.light)
    statuses.forEach((status, i) => {
        theme[chartType].colorScale[i] = StatusColor[status]
        theme.legend.colorScale[i] = StatusColor[status]
    })
    return theme
}

export type ComponentStats = {[certID: string]: CertificationStats}

export interface CertificationStats {
    Certification: string;
    History: ResultSnapshot[];
}

interface ResultSnapshot {
    Time: string;
    Stats: {[CtrlId: string]: number};
}
