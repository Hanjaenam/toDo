import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/common/Button';

const Container = styled.div`
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

const logoutBtnStyles = css`
  background: transparent;
  p,
  svg {
    color: white;
  }
  border: 0;
`;

const Header = ({ user, logOut }) => {
  return (
    <Container>
      <Center>
        <Button
          hoverbgcolor={{ minus: 20 }}
          icon={faHome}
          styles={logoutBtnStyles}
          to="/me/project"
        />
        {user ? (
          <Button
            hoverbgcolor={{ minus: 20 }}
            styles={logoutBtnStyles}
            onClick={logOut}
          >
            로그아웃
          </Button>
        ) : null}
      </Center>
    </Container>
  );
};

Header.propTypes = {
  user: PropTypes.shape({}).isRequired,
};
export default Header;
