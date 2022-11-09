import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Common/Modal';
import { css } from '@emotion/react';
import ModifyUserInput from './ModifyUserInput';
import ModifyUserButton from './ModifyUserButton';
import request from '../../../api';
import { useRecoilState } from 'recoil';
import { userInfoState, preventAuthenticatedState } from '../../../atom/atom';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

function WarningDescription() {
  return (
    <div
      css={css`
        display: flex;
        margin-bottom: 10px;
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        width="18px"
        height="18px"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>

      <p
        css={css`
          font-size: 11px;
          display: flex;
          align-items: center;
          margin-left: 6px;
        `}
      >
        지금까지 완료한 스터디 정보가 삭제 됩니다.
      </p>
    </div>
  );
}

function WithdrawalModal({ onClose }) {
  const navigate = useNavigate();
  const [complete, setComplete] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [, setPreventAuthenticated] = useRecoilState(preventAuthenticatedState);

  const onChange = (event) => {
    setDisabled(event.currentTarget.value !== userInfo?.email);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    request({
      method: 'delete',
      url: `/api/members`,
    })
      .then(() => {
        setAuthorizationToken();
        setPreventAuthenticated(true);
        setUserInfo(null);
      })
      .then(() => setComplete(true));
  };

  const onMoveLanding = () => {
    setPreventAuthenticated(false);
    navigate('/');
  };

  return (
    <Modal onClose={onClose}>
      {complete ? (
        <div css={modalContentWrapper}>
          <h3
            css={css`
              font-size: 16px;
            `}
          >
            MOCCO 회원 탈퇴가 완료되었습니다.
          </h3>
          <span
            css={css`
              font-size: 18px;
              flex: 1;
              display: flex;
              align-items: center;
              margin: 0 16px;
            `}
          >
            <p
              css={css`
                font-size: 11px;
              `}
            >
              그동안 MOCCO 서비스를 아끼고 사랑해 주셔서 감사합니다. 더욱더
              노력하고 발전하는 MOCCO가 되겠습니다.
            </p>
          </span>
          <button css={modalButton} type="button" onClick={onMoveLanding}>
            MOCCO 첫화면
          </button>
        </div>
      ) : (
        <form
          css={css`
            margin: 0 32px;
          `}
          onSubmit={onSubmit}
        >
          <h3
            css={css`
              text-align: center;
              margin-top: 32px;
              margin-bottom: 15px;
              font-size: 18px;
              font-weight: bold;
            `}
          >
            회원 탈퇴
          </h3>
          <div
            css={css`
              margin-bottom: 15px;
            `}
          >
            <h4
              css={css`
                font-size: 14px;
                margin-bottom: 15px;
              `}
            >
              {userInfo?.nickname}님,
              <br /> 정말 탈퇴하시겠어요?
            </h4>
            <WarningDescription />
            <WarningDescription />
            <WarningDescription />
          </div>
          <ModifyUserInput
            labelText="탈퇴하시려면 이메일을 입력해주세요."
            name="checkEmail"
            onChange={onChange}
          />
          <div>
            <ModifyUserButton text="탈퇴하기" disabled={disabled} />
          </div>
        </form>
      )}
    </Modal>
  );
}

const modalContentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 250px;
  width: 300px;
  padding-top: 30px;
`;

const modalButton = css`
  width: 240px;
  height: 40px;
  border-radius: 5px;
  background-color: #0b6ff2;
  margin-bottom: 24px;
  font-size: 18px;
  color: #ffffff;
  border: none;
  border: 1px solid #0b6ff2;

  &:hover {
    color: #0b6ff2;
    background-color: #ffffff;
  }
`;

export default WithdrawalModal;
