import * as React from 'react';
import { Page, PageSection, PageSectionVariants, TextContent } from '@patternfly/react-core';
import VMP from '@app/assets/markdown/vulnerability-management-plan.md';
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

export { ATOVulnerabilityManagementPlan };
