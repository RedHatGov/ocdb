import React from 'react';
import {
    AboutModal, Button,
    EmptyStateIcon,
    TextContent, Text, TextList, TextListItem } from '@patternfly/react-core';
import {  GithubIcon } from '@patternfly/react-icons';
import redhatLogo from '@app/assets/images/red-hat-logo.png';


export interface AboutState {
    isModalOpen: boolean
};


class SimpleAboutModal extends React.Component<{}, AboutState> {
    handleModalToggle() {
    }

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.handleModalToggle = () => {
            this.setState(({ isModalOpen }) => ({
                isModalOpen: !isModalOpen
            }));
        };
    }

    render() {
        const { isModalOpen } = this.state;

        return (
            <React.Fragment>
                <Button variant="secondary" onClick={this.handleModalToggle}>
                    About
                </Button>
                <AboutModal
                    isOpen={isModalOpen}
                    onClose={() => this.handleModalToggle()}
                    trademark="Copyright © 2019 Red Hat, Inc."
                    brandImageSrc={redhatLogo}
                    brandImageAlt="Red Hat Logo"
                    productName="ATO Pathways"
                >
                    <TextContent>
                        <Text component="p">This microsite, and resources contained within, are reflect open source projects on GitHub.</Text>
                        <TextList component="dl">
                            <TextListItem component="dt">ComplianceAsCode</TextListItem>
                            <TextListItem component="dd"><Text component="a" href="https://github.com/ComplianceAsCode/content/"><EmptyStateIcon icon={GithubIcon}/></Text></TextListItem>
                            <TextListItem component="dt">Open Controls</TextListItem>
                            <TextListItem component="dd"><Text component="a" href="https://github.com/ComplianceAsCode/redhat/"><EmptyStateIcon icon={GithubIcon}/></Text></TextListItem>
                            <TextListItem component="dt">Open Controls Database</TextListItem>
                            <TextListItem component="dd"><Text component="a" href="https://github.com/RedHatGov/ocdb"><EmptyStateIcon icon={GithubIcon}/></Text></TextListItem>
                        </TextList>
                    </TextContent>
                </AboutModal>
            </React.Fragment>
        );
    }
}

export { SimpleAboutModal };
