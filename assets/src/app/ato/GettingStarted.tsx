import * as React from 'react';
import pic from 'assets/src/app/assets/images/RMF-steps-all.png';
import { Brand, Flex, FlexItem, PageSection, PageSectionVariants, TextListVariants } from '@patternfly/react-core';
import {
    Page, TextContent, Text, TextList, TextListItem, TextVariants,
} from '@patternfly/react-core';

const GettingStarted: React.FunctionComponent<any> = () => {
    return (
        <Page>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    {/* Getting Started */}
                    <Text component={TextVariants.h1}>Getting Started</Text>
                    <Text component={TextVariants.p}>
                        Red Hat’s ATO Pathways was created to provide resources that help accelerate your ATO (Authority/Authorization To Operate) process. This is made possible by combining open source projects that were spearheaded by Red Hat and still actively maintained in order to give our customers the necessary content needed for our products that help assist in the overall development of an ATO.
                    </Text>

                    {/* What Exactly is an ATO? */}
                    <Text component={TextVariants.h2}>What Exactly is an ATO?</Text>
                    <Text component={TextVariants.p}>
                        At a high level, as defined by the National Institute of Standards and Technology (NIST), an ATO is:
                        <Text component={TextVariants.blockquote}>
                            ... an official management decision given by a senior organizational official to authorize operation of an information system and to explicitly accept the risk to organizational operations (including mission, functions, image, or reputation), organizational assets, individuals, other organizations, and the Nation based on the implementation of an agreed-upon set of security controls.
                        </Text>
                    </Text>
                    <Text component={TextVariants.p}>
                        It's your agency authority certifying your system is ready for day 2 operations: system availability, routine maintenance, monitoring, and lots of other concerns.
                    </Text>
                    <Text component={TextVariants.p}>
                        The ATO process can be lengthy and daunting if not familiar with it. This process is formally defined by NIST’s <Text component={TextVariants.a} href="https://csrc.nist.gov/projects/risk-management/risk-management-framework-(RMF)-Overview">Risk Management Framework (RMF)</Text> and consists of the following steps:
                    </Text>

                    {/* ATO PROCESS Picture + Ordered List */}
                    <Flex>
                        <Flex className='rmf' spaceItems={{ default: 'spaceItems2xl' }}>
                            <FlexItem>
                                <Brand src={pic} alt="testing" style={{ maxHeight: '25em' }} />
                            </FlexItem>
                            <FlexItem>
                                <TextList className='vertical-center' component={TextListVariants.ol}>
                                    <TextListItem>Prepare</TextListItem>
                                    <TextListItem>Categorize Information System</TextListItem>
                                    <TextListItem>Select Security Controls</TextListItem>
                                    <TextListItem>Implement Security Controls</TextListItem>
                                    <TextListItem>Assess Security Controls</TextListItem>
                                    <TextListItem>Authorize Information System</TextListItem>
                                    <TextListItem>Monitor Security Controls</TextListItem>
                                </TextList>
                            </FlexItem>
                        </Flex>
                    </Flex>

                    {/* How does ATO Pathways Help? */}
                    <Text component={TextVariants.h2}>How does ATO Pathways Help?</Text>
                    <Text component={TextVariants.p}>
                        In order to better serve our customers who seek to attain an ATO with our products, we felt it was necessary to provide general guidance to the NIST 800-53 catalog of security and privacy controls. These internal evaluations help not only to provide the control responses for NIST 800-53, but also helps drive our engineering efforts in ensuring we are complying with these controls.
                    </Text>
                    <Text component={TextVariants.p}>
                        On top of providing control responses for products, we also provide Security Content Automation Protocol (SCAP) content generated from our <Text component={TextVariants.a} href="https://github.com/ComplianceAsCode/content">ComplianceAsCode</Text> project to assist with scanning and remediation of information systems.
                    </Text>
                    <Text component={TextVariants.p}>
                        We’ve also introduced a new feature that allow you the ability to generate FedRAMP templates dynamically based on the product chosen. Again, the idea behind this is to help consumers get a head start on the ATO process.
                    </Text>

                    {/* Looking Ahead */}
                    <Text component={TextVariants.h2}>Looking Ahead</Text>
                    <Text component={TextVariants.p}>
                        More NIST 800-53 product assessments to be completed are on the horizon. We are planning on providing some role-based guides to assist consumers in finding the right content depending on their responsibilities.
                    </Text>
                    <Text component={TextVariants.p}>
                        As always, your feedback and/or contributions is most important. There are many projects in which you can help (see the about button in the upper right corner for more information).
                    </Text>

                    {/* <Text component="h2">Role-based guides</Text>
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
                    </Gallery> */}
                </TextContent>
            </PageSection>
        </Page>
    );
}

export { GettingStarted };
