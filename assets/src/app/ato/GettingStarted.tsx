import * as React from 'react';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Page, Gallery, GalleryItem,
         TextContent, Text,TextList, TextListItem, TextVariants,
         Title,
         Button,
         EmptyState,
         EmptyStateVariant,
         EmptyStateIcon,
         EmptyStateBody,
         EmptyStateSecondaryActions
} from '@patternfly/react-core';
import {  RedhatIcon } from '@patternfly/react-icons';


const SimpleEmptyState = () => (
    <EmptyState variant={EmptyStateVariant.full}>
        <EmptyStateIcon icon={RedhatIcon} />
        <Title headingLevel="h5" size="lg">
            Get started with Red Hat products
        </Title>
        <EmptyStateBody>
            ATO artifacts are available for various products. Content on this site is open source.
        </EmptyStateBody>
        <Button href="/ato/products" variant="primary" component="a">Product documentation</Button>
        <EmptyStateSecondaryActions>
            <Button href="/ato/documents" variant="link" component="a">A&amp;A Templates</Button>
        </EmptyStateSecondaryActions>
    </EmptyState>
);

const GettingStarted: React.FunctionComponent<any> = (props) => {
  return (
      <Page>
          <PageSection variant={PageSectionVariants.light}>
              <TextContent>
                  <Text component="h1">Getting Started</Text>
                  <Text component="p">
                      The Red Hat ATO Pathways microsite provides resources to accelerate your ATO process.
                  </Text>
                  <Text component="h2">Role-based guides</Text>
                  <Gallery gutter="md">
                      <GalleryItem>
                          <Text component="h1">Auditors</Text>
                          <Text component="p">
                              Content to assist with system accreditation based on the NIST Risk Management Framework. Materials include Security Requirement Traceability Matrixes, product certification materials (Common Criteria, FIPS), and other ATO package documents.
                          </Text>
                      </GalleryItem>
                      <GalleryItem>
                          <Text component="h1">Administrators</Text>
                          <Text component="p">
                              Resources needed to implement Red Hat technologies in accordance with Government security regulations. Materials include Ansible playbooks, SCAP datastreams, kickstart files, and supporting documentation.
                          </Text>
                      </GalleryItem>
                  </Gallery>
                  <Text component="h2">Open Source</Text>
                  <Text component="p">This microsite, and resources contained within, are reflect open source projects on GitHub.</Text>
                  <TextList>
                      <TextListItem>
                          <Text component={TextVariants.a} href="https://github.com/isimluk/ocdb">
                              Open Controls Database
                          </Text>
                      </TextListItem>
                      <TextListItem>
                          <Text component={TextVariants.a} href="https://github.com/ComplianceAsCode/redhat">
                              Open Controls Content for Red Hat products
                          </Text>
                      </TextListItem>
                      <TextListItem>
                          <Text component={TextVariants.a} href="https://github.com/ComplianceAsCode/content">
                              Library of SCAP, Ansible & Bash Compliance Content
                          </Text>
                      </TextListItem>
                  </TextList>
              </TextContent>
          </PageSection>
          <PageSection>
              <SimpleEmptyState/>
          </PageSection>

      </Page>
  );
}

export { GettingStarted };
