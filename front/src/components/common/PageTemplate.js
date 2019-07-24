import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import HeaderContainer from 'containers/common/HeaderContainer';

const ChildrenContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.ONE};
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: ${props => props.theme.GAP.MEDIUM} auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: 100%;
  }
`;

const PageTemplate = ({ children, sign, title }) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {sign ? (
      children
    ) : (
      <>
        <HeaderContainer />
        <ChildrenContainer>{children}</ChildrenContainer>
      </>
    )}
  </>
);

PageTemplate.propTypes = {
  sign: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default PageTemplate;
