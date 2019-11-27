import * as React from 'react';
import { PageSection, TextContent, Text, Tooltip, TooltipPosition } from '@patternfly/react-core';
import { InfoAltIcon } from '@patternfly/react-icons'
import MDX from '@mdx-js/runtime'
import { CustomControl } from '@app/ato/Products/OpenControlStructs.tsx'
import { SatisfiesAccordion } from '@app/ato/Products/SatisfiesAccordion.tsx'

interface RTMDetailState {
    key: string;
    enhancement?: string;
}

interface RTMDetailProps {
    control: CustomControl;
}

class RTMDetail extends React.Component<RTMDetailProps, RTMDetailState> {
    constructor(props) {
        super(props);
        const parsed = props.control.Key.split(')')[0].split(' (');
        this.state = {
            key: parsed[0],
            enhancement: parsed[1],
        }
    }
    render() {
        var c = this.props.control;
        return (
            <PageSection>
                <TextContent>
                    <div style={{float: 'right'}}>
                        <Tooltip position={TooltipPosition.top} content={"Detailed information about " + c.Key + " is available at NVD (National Vulnerability Database)."}>
                            <Text component="a" href={"https://nvd.nist.gov/800-53/Rev4/control/" + this.state.key + (this.state.enhancement ? ("#enhancement-" + this.state.enhancement) : "")} target="_new">
                                <InfoAltIcon alt="Detailed Information at NVD (National Vulnerability Database)" />
                            </Text>
                        </Tooltip>
                    </div>
                    <Text component="h3">{c.Key}: {c.Control.name}</Text>
                    <MDX>{c.Control.description}</MDX>
                    <Text component="h4">{c.Key}: What is the solution and how is it implemented?</Text>
                </TextContent>
                <SatisfiesAccordion satisfies={c.Satisfies} />
            </PageSection>
        );
    }
}

export { RTMDetail }
