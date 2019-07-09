import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { inputCss, HOVER_TYPE } from 'styles/mixins';
import ListEditMenu from 'components/Common/ListEditMenu';
import Button from 'components/Common/Button';

const Container = styled.div`
  box-sizing: border-box;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding-right: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  ${inputCss}
`;

const EditProject = ({ createProject, handleDeleteMany }) => {
  const titleRef = useRef();
  return (
    <Container>
      <AddContainer>
        <Input
          placeholder="프로젝트 이름"
          id="addTitle"
          ref={titleRef}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              createProject(titleRef);
            }
          }}
          maxLength="100"
        />
        <Button
          icon={faPlus}
          hoverType={HOVER_TYPE.COLOR}
          styles={{ paddingLeft: '0.5rem', fontSize: '1.5rem' }}
          onClick={() => createProject(titleRef)}
        />
      </AddContainer>
      <ListEditMenu handleDeleteMany={handleDeleteMany} />
    </Container>
  );
};

EditProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  handleDeleteMany: PropTypes.func.isRequired,
};

export default EditProject;
