import * as React from 'react';
import {
    DataList,
    DataListItem,
    DataListItemRow,
    DataListCell,
    DataListItemCells,
    Text,
    TextContent,
} from '@patternfly/react-core';
import { FileWordIcon } from '@patternfly/react-icons'

import { ProductInfo } from '@app/ato/Products/Static.tsx'

interface FedRAMPDownloadProp {
    productId: string;
}

class FedRAMPDownload extends React.PureComponent<FedRAMPDownloadProp> {
  render() {
    if (ProductInfo[this.props.productId] && ProductInfo[this.props.productId].disableFedrampDownload) {
        return <Text component='p'>FedRAMP for {this.props.productId} is not available at this time</Text>
    }
      const productId = this.props.productId;

    return (
        <React.Fragment>
            <TextContent>
                <Text component="h2">FedRAMP Templates</Text>
                <Text component="p">
                    The FedRAMP template is dynamically generated using the <Text component="a" href="https://github.com/opencontrol/fedramp-templater">OpenControl FedRAMP Templater</Text> tool, originally created by <Text component="a" href="https://18f.gsa.gov/">GSA's 18F</Text>. An automated build system incorporates <Text component="a" href="https://github.com/ComplianceAsCode/redhat">Red Hat's OpenControl Content</Text> directly into the FedRAMP Templates <Text component="a" href="https://www.fedramp.gov/templates/">provided by the GSA FedRAMP PMO</Text>.
                </Text>
            </TextContent>

            <br/>
            <DataList aria-label="Simple data list example">
                <DataListItem aria-labelledby="low">
                    <DataListItemRow>
                        <DataListItemCells dataListCells={[
                            <DataListCell key="title">
                                FedRAMP Low
                            </DataListCell>,
                            <DataListCell key="link">
                                <Text component="a" href={'/api/v1/components/' + productId + '/fedramp/Low'}><FileWordIcon/> .docx</Text>
                            </DataListCell>,
                        ]}/>
                    </DataListItemRow>
                </DataListItem>
                <DataListItem aria-labelledby="moderate">
                    <DataListItemRow>
                        <DataListItemCells dataListCells={[
                            <DataListCell>
                                FedRAMP Moderate
                            </DataListCell>,
                            <DataListCell>
                                <Text component="a" href={'/api/v1/components/' + productId + '/fedramp/Moderate'}><FileWordIcon/> .docx</Text>
                            </DataListCell>,
                        ]}/>
                    </DataListItemRow>
                </DataListItem>
                <DataListItem aria-labelledby="high">
                    <DataListItemRow>
                        <DataListItemCells dataListCells={[
                            <DataListCell>
                                FedRAMP High
                            </DataListCell>,
                            <DataListCell>
                                <Text component="a" href={'/api/v1/components/' + productId + '/fedramp/High'}><FileWordIcon/> .docx</Text>
                            </DataListCell>,
                        ]}/>
                    </DataListItemRow>
                </DataListItem>
            </DataList>
        </React.Fragment>
    );
  }
}

export { FedRAMPDownload }
