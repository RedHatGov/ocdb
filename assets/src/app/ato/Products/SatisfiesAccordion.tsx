import * as React from 'react';
import { Expandable, Text } from '@patternfly/react-core';
import MDX from '@mdx-js/runtime'
import { Satisfies } from '@app/ato/Products/OpenControlStructs.tsx'

interface CustomControlProps {
    satisfies: Satisfies;
}

const SatisfiesAccordion: React.FunctionComponent<CustomControlProps> = (props) => {
    if (props.satisfies == null || (props.satisfies.narrative.length == 1 && props.satisfies.narrative[0].text == '')) {
        return (<Text component="p">Not available</Text>);
    }
    if (props.satisfies.narrative.length == 1 && props.satisfies.narrative[0].key == undefined) {
        return (<MDX>{props.satisfies.narrative[0].text}</MDX>)
    }

    const cKey = props.satisfies.control_key;
    return (
        <React.Fragment>
            { props.satisfies.narrative.map(function(n, idx) {
                return (
                    <Expandable key={idx} toggleText={cKey + '(' + n.key + ')'} isExpanded>
                        <MDX>{n.text}</MDX>
                        <br/>
                    </Expandable>
                )
            })}
        </React.Fragment>
    )
}

export { SatisfiesAccordion }
