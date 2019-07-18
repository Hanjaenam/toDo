import React from 'react';
import styled, { css } from 'styled-components';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  background-color: ${props => props.theme.PRIMARY()};
  box-sizing: border-box;
  padding-top: ${props => props.theme.GAP.MEDIUM};
  padding-bottom: ${props => props.theme.GAP.MEDIUM};
`;
const Center = styled.div`
  box-sizing: border-box;
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: 95%;
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    width: 99%;
  }
  display: flex;
  align-items: center;
`;
const buttonStyles = css`
  font-size: 1.5rem;
  padding: ${props => props.theme.GAP.SMALL};
  margin-right: ${props => props.theme.GAP.SMALL};
`;
const ChildrenContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Header = ({ children }) => (
  <Container>
    <Center>
      <Button
        icon={faHome}
        hoverType={HOVER_TYPE.COLOR}
        styles={buttonStyles}
      />
      <ChildrenContainer>{children}</ChildrenContainer>
    </Center>
  </Container>
);

export default Header;
