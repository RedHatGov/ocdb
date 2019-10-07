import * as React from 'react';
import { Page, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Flex, FlexItem } from '@patternfly/react-core';

import VMP from '@app/assets/markdown/vulnerability-management-plan.md';
import TP from '@app/assets/markdown/training-plan.md';
import { Markdown } from '@app/lib/markdown';

const ATOVulnerabilityManagementPlan: React.FunctionComponent<any> = (props) => {
    return (
    <Page>
      <PageSection variant={PageSectionVariants.light}>
          <Markdown>
                <VMP/>
          </Markdown>
      </PageSection>
    </Page>
    );
}

const ATOTrainingPlan: React.FunctionComponent<any> = (props) => {
    var textMod = {modifier: 'flex-2' as 'flex-default', breakpoint: 'md' as 'md'};
    var emptyMod = {modifier: 'flex-1' as 'flex-default', breakpoint: 'md' as 'md'};
    return (
        <Page>
            <PageSection variant={PageSectionVariants.light}>
                <Flex>
                    <Flex breakpointMods={[textMod]}>
                        <FlexItem>
                            <Markdown>
                                <TP/>
                            </Markdown>
                        </FlexItem>
                    </Flex>

                    <Flex breakpointMods={[emptyMod]}>
                        <FlexItem/>
                    </Flex>
                </Flex>
            </PageSection>
        </Page>
    );
}

export { ATOVulnerabilityManagementPlan, ATOTrainingPlan };
