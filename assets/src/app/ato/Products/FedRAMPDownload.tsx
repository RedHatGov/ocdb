import * as React from 'react';
import {
    Button,
    Modal,
    Text,
} from '@patternfly/react-core';
import { FileWordIcon } from '@patternfly/react-icons'

import { ProductInfo } from '@app/ato/Products/Static.tsx'


interface FedRAMPDownloadProp {
    productId: string;
}

interface FedRAMPDownloadState {
    isModalOpen: boolean;
}

class FedRAMPDownload extends React.PureComponent<FedRAMPDownloadProp, FedRAMPDownloadState> {
    handleModalToggle() {
        this.setState(({ isModalOpen }) => ({
            isModalOpen: !isModalOpen
        }));
    }
    onSubmit(level) {
        this.handleModalToggle();
        window.location.assign('/api/v1/components/' + this.props.productId + '/fedramp/' + level);
    }

    constructor(props) {
        super(props);
        this.state = { isModalOpen: false };
        this.handleModalToggle = this.handleModalToggle.bind(this);
    }

  render() {
    if (ProductInfo[this.props.productId].disableFedrampDownload) {
        return '';
    }

    const { isModalOpen } = this.state;
    const onSubmitHigh = this.onSubmit.bind(this, "High");
    const onSubmitModerate = this.onSubmit.bind(this, "Moderate");
    const onSubmitLow = this.onSubmit.bind(this, "Low");

    return (
        <React.Fragment>
            <Button variant="link" onClick={this.handleModalToggle} icon={<FileWordIcon/>} >
                Download FedRAMP Template
            </Button>
            <br/>
            <br/>
            <Modal
                isLarge
                title="FedRAMP Template"
                isOpen={isModalOpen}
                onClose={this.handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={onSubmitHigh}>
                        <FileWordIcon/> Fedramp High
                    </Button>,
                    <Button key="confirm2" variant="primary" onClick={onSubmitModerate}>
                        <FileWordIcon/> Fedramp Moderate
                    </Button>,
                    <Button key="confirm3" variant="primary" onClick={onSubmitLow}>
                        <FileWordIcon/> Fedramp Low
                    </Button>,
                    <Button key="cancel" variant="link" onClick={this.handleModalToggle}>
                        Cancel
                    </Button>
                ]}
                appendTo={document.body}
                isFooterLeftAligned
            >
                The FedRAMP template is dynamically generated using the <Text component="a" href="https://github.com/opencontrol/fedramp-templater">OpenControl FedRAMP Templater</Text> tool, originally created by <Text component="a" href="https://18f.gsa.gov/">GSA's 18F</Text>. An automated build system incorporates <Text component="a" href="https://github.com/ComplianceAsCode/redhat">Red Hat's OpenControl Content</Text> directly into the FedRAMP Templates <Text component="a" href="https://www.fedramp.gov/templates/">provided by the GSA FedRAMP PMO</Text>.
            </Modal>
        </React.Fragment>
    );
  }
}

export { FedRAMPDownload }
