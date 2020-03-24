import * as React from 'react';
import { PageSection, TextContent, Text, Tooltip, TooltipPosition } from '@patternfly/react-core';
import { InfoAltIcon } from '@patternfly/react-icons'
import MDX from '@mdx-js/runtime'
import { CustomControl } from '@app/lib/opencontrol'
import { SatisfiesAccordion } from '@app/ato/Products/SatisfiesAccordion.tsx'

interface RTMDetailProps {
    control: CustomControl;
}

const RTMDetail = React.memo((props: RTMDetailProps) => {
    const parsed = props.control.Key.split(')')[0].split(' (');
    const key = parsed[0]
    const enhancement = parsed[1]
    var c = props.control;

    return (
        <PageSection>
            <TextContent>
                <div style={{float: 'right'}}>
                    <Tooltip position={TooltipPosition.top} content={"Detailed information about " + c.Key + " is available at NVD (National Vulnerability Database)."}>
                        <Text component="a" href={"https://nvd.nist.gov/800-53/Rev4/control/" + key + (enhancement ? ("#enhancement-" + enhancement) : "")} target="_new" aria-label="Detailed information published by NIST">
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
})

export { RTMDetail }
