import Modal from '../../Common/Modal';
import { css } from '@emotion/react';
import ModifyUserInput from './ModifyUserInput';
import ModifyUserButton from './ModifyUserButton';
import request from '../../../api';

function ChangePasswordModal({ onClose }) {
  const onSubmit = (event) => {
    event.preventDefault();
    request({
      method: 'patch',
      url: `/api/members/password`,
      data: {
        originalPassword: event.target.originalPassword.value,
        newPassword: event.target.newPassword.value,
      },
    }).then(onClose);
  };

  return (
    <Modal onClose={onClose}>
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
          비밀번호 변경하기
        </h3>
        <div
          css={css`
            margin-bottom: 15px;
          `}
        >
          <h4
            css={css`
              font-size: 13px;
              margin-bottom: 15px;
            `}
          >
            ※ 비밀번호 변경시 유의사항
          </h4>
          <p
            css={css`
              font-size: 11px;
            `}
          >
            비밀번호는 영문, 숫자, 특수문자 3가지를 모두 사용(조합)하여
            작성되어야 합니다. (8~20자로 작성)
          </p>
        </div>
        <ModifyUserInput
          type="password"
          labelText="현재 비밀번호"
          name="originalPassword"
        />
        <ModifyUserInput
          type="password"
          labelText="새 비밀번호"
          name="newPassword"
        />
        <ModifyUserInput
          type="password"
          labelText="새 비밀번호 확인"
          name="newPasswordCheck"
        />
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          `}
        >
          <ModifyUserButton type="submit" text="변경완료" />
          <ModifyUserButton
            variant="secondary"
            onClick={onClose}
            type="button"
            text="취소"
          />
        </div>
      </form>
    </Modal>
  );
}

export default ChangePasswordModal;
