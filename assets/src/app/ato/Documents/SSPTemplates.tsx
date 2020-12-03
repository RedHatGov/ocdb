import {
    Flex, FlexItem,
    Page, PageSection, PageSectionVariants,
    Text, TextContent
} from '@patternfly/react-core';
import { FileAltIcon, FileCodeIcon, FileWordIcon } from '@patternfly/react-icons';
import { Table, TableBody, TableHeader, TableVariant } from '@patternfly/react-table';
import * as React from 'react';

interface FedRAMPsProps {
    productID: string;
}

class ComponentSSPTemplates extends React.Component<FedRAMPsProps> {
    columns = ['FedRAMP Low', 'FedRAMP Moderate', 'FedRAMP High'];

    buildRows(product) {
        return [
            [
                <FedRAMPLink product={product} format="docx" level="Low"/>,
                <FedRAMPLink product={product} format="docx" level="Moderate"/>,
                <FedRAMPLink product={product} format="docx" level="High"/>,
            ],
            [
                <FedRAMPLink product={product} format="xml" level="Low"/>,
                <FedRAMPLink product={product} format="xml" level="Moderate"/>,
                <FedRAMPLink product={product} format="xml" level="High"/>,
            ],
            [
                <FedRAMPLink product={product} format="json" level="Low"/>,
                <FedRAMPLink product={product} format="json" level="Moderate"/>,
                <FedRAMPLink product={product} format="json" level="High"/>,
            ]
        ]
    }

    render() {
        const textMod = {modifier: 'flex-2' as 'flex-default', breakpoint: 'md' as 'md'};
        const emptyMod = {modifier: 'flex-1' as 'flex-default', breakpoint: 'md' as 'md'};
        return (
            <Page>
                <PageSection variant={PageSectionVariants.light}>
                    <Flex>
                        <Flex breakpointMods={[textMod]}>
                            <FlexItem>
                                <TextContent>
                                    <Text component="h1">SSP Templates</Text>
                                    <Text component="p">
                                        The FedRAMP templates are dynamically generated using the <Text component="a" href="https://github.com/gocomply/fedramp">FedRAMP Templater</Text> tool, originally created by <Text component="a" href="https://18f.gsa.gov/">GSA's 18F</Text> and then rewritten to adopt OSCAL. An automated build system incorporates <Text component="a" href="https://github.com/ComplianceAsCode/redhat">Red Hat's OpenControl Content</Text> directly into the FedRAMP Templates <Text component="a" href="https://www.fedramp.gov/templates/">provided by the GSA FedRAMP PMO</Text>.
                                    </Text>
                                </TextContent>
                            </FlexItem>
                        </Flex>
                        <Flex breakpointMods={[emptyMod]}>
                            <FlexItem/>
                        </Flex>
                    </Flex>

                    <TextContent>
                        <Table
                            caption="Download Section"
                            variant={TableVariant.compact}
                            rows={this.buildRows(this.props.productID)}
                            cells={this.columns}>
                            <TableHeader />
                            <TableBody />
                        </Table>
                    </TextContent>
                </PageSection>
            </Page>
        )
    }
}

interface FedrampLinkProps {
    level: string;
    product: string;
    format: string;
}

const FedRAMPLink = React.memo((props: FedrampLinkProps) => {
    var icon = <FileAltIcon/>

    switch (props.format) {
        case "xml":
            icon = <FileCodeIcon/>;
            break;
        case "docx":
            icon = <FileWordIcon/>;
            break;
    }
    var oscal = props.format != "docx"

    return (
        <TextContent key={props.product + props.level}>
            <Text component="a" href={'/api/v1/components/' + props.product + '/fedramp/oscal/' + props.format + '/' + props.level}>{icon} {oscal ? ".oscal" : ""}.{props.format}</Text>
        </TextContent>
    )
})

export { ComponentSSPTemplates };
