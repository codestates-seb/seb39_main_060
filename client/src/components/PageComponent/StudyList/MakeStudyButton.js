import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../atom/atom';

const MakeButton = css`
  width: 120px;
  height: 40px;
  font-size: 18px;
  color: white;
  border: none;
  border-radius: 8px;
  background-color: #0b6ff2;
  transition: all 0.1s linear;
  &:hover {
    color: #0b6ff2;
    border: 1px solid #0b6ff2;
    background-color: white;
  }
`;

function MakeStudyButton() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState); // eslint-disable-line no-unused-vars
  return (
    <Link to={userInfo ? `/makestudy` : `/login`}>
      <button css={MakeButton}>스터디 만들기</button>
    </Link>
  );
}

export default MakeStudyButton;
