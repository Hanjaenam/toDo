import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import HeaderContainer from 'containers/Common/HeaderContainer';

const Container = styled.main`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
`;

const Center = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.ONE};
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: 100%;
  }
`;

const EditContainer = styled.div``;

const DetailProjectTemplate = ({
  children,
  projectComponent,
  title,
  editComponent,
}) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <HeaderContainer />
    <Container>
      {projectComponent}
      <Center>
        <EditContainer>{editComponent}</EditContainer>
        {children}
      </Center>
    </Container>
  </>
);

DetailProjectTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  projectComponent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  editComponent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default DetailProjectTemplate;
