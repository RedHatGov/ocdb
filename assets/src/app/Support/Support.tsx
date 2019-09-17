import * as React from 'react';
import nistLogo from '@app/assets/images/nist-logo-2x.png';
import { CubesIcon } from '@patternfly/react-icons';

import { Breadcrumb, BreadcrumbItem, BreadcrumbHeading } from '@patternfly/react-core';
import { Card, CardHeader, CardBody, CardFooter } from '@patternfly/react-core';
import { Accordion, AccordionItem, AccordionContent, AccordionToggle } from '@patternfly/react-core';
import {
  Table,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
  headerCol,
  TableVariant,
  expandable,
  cellWidth
} from '@patternfly/react-table';
import { Alert, AlertActionLink, AlertActionCloseButton } from '@patternfly/react-core';
import {
  PageSection,
  Title,
  Button,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  TextContent,
  Text,
  TextVariants,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants
} from '@patternfly/react-core';

class SortableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Control', transforms: [sortable] },
        'Name',
        { title: 'Status', transforms: [sortable] }
      ],
      rows: [
        ['CP-1', 'Relatively Long Control Title 1', 'complete'],
        ['CP-2', 'Relatively Long Control Title 2', 'unknown'],
        ['CP-3', 'Relatively Long Control Title 3', 'not applicable'],
        ['CP-4', 'Relatively Long Control Title 4', 'not applicable'],
        ['CP-5', 'Relatively Long Control Title 5', 'unknown']
            ],
      sortBy: {}
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
    this.setState({
      sortBy: {
        index,
        direction
      },
      rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
    });
  }

  render() {
    const { columns, rows, sortBy } = this.state;

    return (
      <Table sortBy={sortBy} onSort={this.onSort} cells={columns} rows={rows}>
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}

const Support: React.FunctionComponent<any> = (props) => {
  return (
    <PageSection>
    
      <Breadcrumb>
        <BreadcrumbItem to="#">ATO Pathways</BreadcrumbItem>
        <BreadcrumbItem to="#">Products</BreadcrumbItem>
        <BreadcrumbItem to="#">CoreOS 4.x</BreadcrumbItem>
        <BreadcrumbItem to="#">NIST 800-53 rev4</BreadcrumbItem>
        <BreadcrumbHeading to="#">Contingency Planning</BreadcrumbHeading>
      </Breadcrumb>
      <br /> <br />
      <Card>
        <CardHeader>
          <TextContent>
            <img src={nistLogo} alt="NIST Logo" height="20%" />
            <Text component={TextVariants.h1}><b>NIST Special Publication 800-53 revision 4<br />Contingency Planning Control Family</b></Text>
          </TextContent>
        </CardHeader>
        <CardBody>
          <SortableTable />
        </CardBody>
      </Card>
      <hr />
      <br /><br/>
      <Card isHoverable>
        <CardHeader>
          <TextContent>
            <Text component={TextVariants.h1}><b>CP-12: Safe Mode</b></Text>
          </TextContent>
        </CardHeader>
        <CardBody>
          <TextContent>
            <Text component={TextVariants.h2}>“The information system, when [Assignment: organization-defined conditions] are detected, enters a safe mode of operation with [Assignment: organization-defined restrictions of safe mode of operation].”</Text>
          </TextContent>
          <p>
            <br /><hr /><br/>
          </p>
          <Alert
            variant="success"
            isInline
            title="Implementation Status: Complete"
          />
         
          <p>
            <br /><hr /><br />
          </p>
          <TextContent>
            <Text component={TextVariants.h2}><b>CP-12: What is the solution and how is it implemented?</b></Text>
          </TextContent>
          <TextContent>
            <Text component={TextVariants.p}>Control response goes here.</Text>
          </TextContent>                        
        </CardBody>
      </Card>


      
    </PageSection>
  );
}

export { Support };
