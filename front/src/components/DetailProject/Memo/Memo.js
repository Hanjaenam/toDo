import React from 'react';
import styled from 'styled-components';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';
import theme from 'styles/theme';
import moment from 'moment';

const Container = styled.div`
  position: relative;
  padding: ${props => props.theme.PADDING.SMALL};
  background: #ffff88; /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(81%, #ffff88),
    color-stop(82%, #ffff88),
    color-stop(82%, #ffff88),
    color-stop(100%, #ffffc6)
  ); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    -45deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    -45deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* Opera 11.10+ */
  background: -ms-linear-gradient(
    -45deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* IE10+ */
  background: linear-gradient(
    135deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffff88', endColorstr='#ffffc6',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  border: 1px solid #e8e8e8;
`;

const WhoWhenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Creator = styled.p`
  color: ${props => props.theme.PRIMARY()};
  font-weight: 600;
`;
const CreatedAt = styled.p`
  font-style: italic;
  font-size: 0.8rem;
`;
const Content = styled.p`
  word-break: break-all;
  padding: ${props => props.theme.PADDING.SMALL};
  padding-bottom: 0;
`;

const Memo = ({ data }) => (
  <Container>
    <WhoWhenContainer>
      <Creator>{data.creator.email.split('@')[0]}</Creator>
      <CreatedAt>
        {moment(data.createdAt).format('YYYY-MM-DD H:mm:ss')}
      </CreatedAt>
    </WhoWhenContainer>
    <Content>{data.content}</Content>
  </Container>
);
export default Memo;
