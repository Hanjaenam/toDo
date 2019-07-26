import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { getProjectListQuery } from 'lib/etc';
import Button from 'components/Common/Button';
import LANG, { htmlLang } from 'lib/htmlLanguage';

const Container = styled.header`
  background-color: ${props => props.theme.COLOR.PRIMARY()};
  padding-top: ${props => props.theme.GAP.MEDIUM};
  padding-bottom: ${props => props.theme.GAP.MEDIUM};
`;

const Center = styled.div`
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: 100%;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BtnStyles = css`
  background: transparent;
  p,
  svg {
    color: white;
  }
  border: 0;
`;

const Header = ({ history, logOut }) => (
  <Container>
    <Center>
      <Button
        hoveropts={{ minus: 20 }}
        icon={faHome}
        styles={BtnStyles}
        to={getProjectListQuery()}
      />
      <Button
        hoveropts={{ minus: 20 }}
        styles={BtnStyles}
        onClick={() => logOut().then(() => history.replace('/'))}
      >
        {LANG.SIGN_OUT[htmlLang]}
      </Button>
    </Center>
  </Container>
);

Header.propTypes = {
  history: PropTypes.shape({}).isRequired,
  logOut: PropTypes.func.isRequired,
};
export default withRouter(Header);
