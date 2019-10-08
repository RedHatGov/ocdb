import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleAboutModal } from '@app/AppLayout/About'
import {
  Nav,
  NavList,
  NavItem,
  NavVariants,
  Page,
  PageHeader,
  PageSidebar,
  SkipToContent,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import { routes } from '@app/routes';

interface IAppLayout {
  children: React.ReactNode;
}

class Navigation extends React.Component {
    render() {
        const links = routes.filter((route) => {
            return (route.hidden != true)
        });

        return (
        <Nav id="nav-primary-simple">
           <NavList id="nav-list-simple" variant={NavVariants.simple}>
                {links.map((route, idx) => {
                     return (
                         <NavItem key={`${route.label}-${idx}`} id={`${route.label}-${idx}`}>
                             <NavLink exact={true} to={route.path} activeClassName="pf-m-current">{route.label}</NavLink>
                         </NavItem>
                     );
                })}
            </NavList>
        </Nav>
    );
    }
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({children}) => {
  const logoProps = {
    href: '/',
    target: '_blank'
  };
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  }
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

    const pageToolbar = (
        <Toolbar>
            <ToolbarGroup>
                <ToolbarItem>
                    <SimpleAboutModal/>
                </ToolbarItem>
            </ToolbarGroup>
        </Toolbar>
    );

    const Header = (
        <PageHeader
            logo="Red Hat's ATO PathWays"
            logoProps={logoProps}
            toolbar={pageToolbar}
            showNavToggle={true}
            isNavOpen={isNavOpen}
            onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
        />
    );

  const Sidebar = (
    <PageSidebar
      nav={<Navigation/>}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />
  );
  const PageSkipToContent = (
    <SkipToContent href="#primary-app-container">
      Skip to Content
    </SkipToContent>
  );
  return (
    <Page
      mainContainerId="primary-app-container"
      header={Header}
      sidebar={Sidebar}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}>
      {children}
    </Page>
  );
}

export { AppLayout };
