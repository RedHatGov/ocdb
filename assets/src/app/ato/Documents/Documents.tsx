import * as React from 'react';
import { Page, PageSection, PageSectionVariants } from '@patternfly/react-core';
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
    return (
        <Page>
            <PageSection variant={PageSectionVariants.light}>
                <Markdown>
                    <TP/>
                </Markdown>
            </PageSection>
        </Page>
    );
}

export { ATOVulnerabilityManagementPlan, ATOTrainingPlan };
