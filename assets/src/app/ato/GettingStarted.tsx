import * as React from 'react';
import pic from 'assets/src/app/assets/images/atopathways.png';
import { Brand, PageSection, PageSectionVariants } from '@patternfly/react-core';
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
                    The Red Hat ATO Pathways microsite provides resources to help accelerate your ATO process.
                  </Text>
                    <Text component="h2">What Exactly is an ATO?</Text>
                    <Text component="p">
                    It's your agency authority certifying your system is ready for day 2: system availability, routine maintenance, and monitoring, and lots of other concerns.
                  </Text>
                <Brand src={pic} alt="testing" />
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
                      <GalleryItem>
                          <Text component="h3">Security Professionals</Text>
                          <Text component="p">
                                You are a security specialist that helps define security requirements and has a deep understanding of how to analyze systems for security threats and vulnerabilities.
                          </Text>
                      </GalleryItem>
                      <GalleryItem>
                          <Text component="h3">Developers/Application Administrators</Text>
                          <Text component="p">
                                You are a developer that builds software and systems that must be hardened to a security compliance baseline. Your goal is to understand early in the process what the security engineering you will need to implement to be compliant.
                          </Text>
                      </GalleryItem>
                  </Gallery>
              </TextContent>
          </PageSection>
      </Page>
  );
}

export { GettingStarted };
