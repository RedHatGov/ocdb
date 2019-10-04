import * as React from 'react';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Page,
         TextContent,
         Text,
} from '@patternfly/react-core';


const ATODocuments: React.FunctionComponent<any> = (props) => {
    return (
        <Page>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">ATO Documents</Text>
                    <Text component="h2">A&amp;A Templates</Text>
                    <Text component="p">
                        Red Hat Public Sector is in the process of open sourcing ATO artifacts.
                        Developed with US Government agencies and system integrators, these templates are
                        tailored for the operation of Red Hat technologies and complement
                        organizational-level policies and procedures.</Text>
                    <Text component="p">
                        Many of these documents are undergoing prepublication review for open source release.
                        As that happens they will be posted here!</Text>
                </TextContent>
            </PageSection>
        </Page>
    );
}

export { ATODocuments };
