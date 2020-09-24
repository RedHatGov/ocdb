import * as React from 'react';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Page, Gallery, GalleryItem,
         TextContent, Text,TextList, TextListItem, TextVariants,
} from '@patternfly/react-core';

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
                          <Text component="h3">Auditors</Text>
                          <Text component="p">
                              Content to assist with system accreditation based on the NIST Risk Management Framework. Materials include Security Requirement Traceability Matrixes, product certification materials (Common Criteria, FIPS), and other ATO package documents.
                          </Text>
                      </GalleryItem>
                      <GalleryItem>
                          <Text component="h3">Administrators</Text>
                          <Text component="p">
                              Resources needed to implement Red Hat technologies in accordance with Government security regulations. Materials include Ansible playbooks, SCAP datastreams, kickstart files, and supporting documentation.
                          </Text>
                      </GalleryItem>
                  </Gallery>
              </TextContent>
          </PageSection>
      </Page>
  );
}

export { GettingStarted };
