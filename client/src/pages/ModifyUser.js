import { css } from '@emotion/react';
import ModifyUserInput from '../components/PageComponent/ModifyUser/ModifyUserInput';
import ModifyUserButton from '../components/PageComponent/ModifyUser/ModifyUserButton';
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useRef, useState } from 'react';
import ChangePasswordModal from '../components/PageComponent/ModifyUser/ChangePasswordModal';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../atom/atom';
import request from '../api';
import WithdrawalModal from '../components/PageComponent/ModifyUser/WithdrawalModal';

function ModifyUser() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [nicknameValue, setNicknameValue] = useState('');
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [changPasswordmodalOn, setChangePasswordModalOn] = useState(false);
  const [withdrawalModalOn, setWithdrawalModalOn] = useState(false);
  const openChangePasswordModal = () => setChangePasswordModalOn(true);
  const closeChangePasswordModal = () => setChangePasswordModalOn(false);

  const openWithdrawalModal = () => setWithdrawalModalOn(true);
  const closeWithdrawalModal = () => setWithdrawalModalOn(false);

  const [previewUrl, setPreviewUrl] = useState(userInfo?.profileImage);
  const inputRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    request({
      method: 'patch',
      url: `/api/members`,
      data: {
        nickname: event.target.nickname.value,
        introduction: event.target.introduction.value,
        location: event.target.location.value,
        githubRepository1: event.target.githubRepository1.value || null,
        githubRepository2: event.target.githubRepository2.value || null,
        githubRepository3: event.target.githubRepository3.value || null,
        profileImage: previewUrl,
      },
    })
      .then((res) => setUserInfo(res.data.data))
      .then(() => alert('회원 정보 수정이 완료되었습니다.'));
  };
  // 이미지 업로드 기능
  const onUploadImage = useCallback((e) => {
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    request({
      method: 'post',
      url: '/api/members/image',
      params: { 'file-size': e.target.files[0].size },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    }).then((res) => {
      setPreviewUrl(res.data.data);
    });
  });

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  // 닉네임 중복체크
  const onChangeNickname = (event) => {
    setNicknameValue(event.currentTarget.value);
    setNicknameChecked(false);
    setErrorMessage(null);
  };

  const onClick = () => {
    request({
      method: 'get',
      url: '/api/register/nickname-check',
      params: { nickname: nicknameValue },
    })
      .then(() => setNicknameChecked(true))
      .catch((error) => setErrorMessage(error.response.data.message));
  };

  return (
    <div
      css={css`
        max-width: 350px;
        margin: 0 auto;
        padding-top: 8rem;
      `}
    >
      <form
        onSubmit={onSubmit}
        css={css`
          width: 100%;
        `}
      >
        <div
          css={css`
            margin-bottom: 18px;
            border-bottom: 1px solid #d1d1d1;
            padding-bottom: 18px;
            font-size: 32px;
          `}
        >
          <h3>회원정보 수정</h3>
        </div>
        <div
          css={css`
            display: flex;
          `}
        >
          <ModifyUserInput
            labelText="닉네임"
            type="text"
            defaultValue={userInfo?.nickname}
            name="nickname"
            onChange={onChangeNickname}
          />
          <div>
            <ModifyUserButton
              text={nicknameChecked ? '✔' : '중복확인'}
              type="button"
              onClick={onClick}
              disabled={nicknameChecked}
              css={css`
                margin-top: 33px;
                min-width: 40px;
                margin-left: 8px;
                &:disabled {
                  color: #ffffff;
                  background-color: #0b6ff2;
                }
              `}
            />
          </div>
        </div>

        {errorMessage && (
          <span
            css={css`
              margin-bottom: 12px;
              font-size: 12px;
              color: red;
            `}
          >
            {errorMessage}
          </span>
        )}
        {nicknameChecked ? (
          <p
            css={css`
              margin-bottom: 12px;
              font-size: 12px;
              color: green;
            `}
          >
            사용가능한 닉네임 입니다.
          </p>
        ) : null}

        <ModifyUserInput
          labelText="위치"
          type="text"
          defaultValue={userInfo?.location}
          name="location"
        />
        <ModifyUserButton
          text="비밀번호 변경하기"
          type="button"
          onClick={openChangePasswordModal}
        />

        {/* 이미지 업로드 */}
        <ModifyUserInput
          labelText="이미지 추가 / 변경"
          type="file"
          accept="image/*"
          onChange={onUploadImage}
          name="imageUpload"
          style={{ display: 'none' }}
          ref={inputRef}
        />
        <div>
          {previewUrl && (
            <img
              css={css`
                border-radius: 50%;
                height: 350px;
                filter: drop-shadow(8px 10px 5px #999999);
              `}
              src={previewUrl}
              alt="previewImage"
            />
          )}
        </div>
        <ModifyUserButton
          text="이미지 업로드 하기"
          type="button"
          onClick={onUploadImageButtonClick}
        />
        {/* 자기소개 */}
        <ModifyUserInput
          labelText="자기소개"
          type="textarea"
          defaultValue={userInfo?.introduction}
          name="introduction"
        />
        <ModifyUserInput
          labelText="Git Hub Repository 1"
          type="url"
          defaultValue={userInfo?.githubRepositoryList[0]}
          name="githubRepository1"
        />
        <ModifyUserInput
          labelText="Git Hub Repository 2"
          type="url"
          defaultValue={userInfo?.githubRepositoryList[1]}
          name="githubRepository2"
        />
        <ModifyUserInput
          labelText="Git Hub Repository 3"
          type="url"
          defaultValue={userInfo?.githubRepositoryList[2]}
          name="githubRepository3"
        />
        <ModifyUserButton text="프로필 설정 완료" type="submit" />
      </form>
      <ModifyUserButton
        variant="secondary"
        text="회원 탈퇴"
        type="button"
        onClick={openWithdrawalModal}
      />
      {changPasswordmodalOn && (
        <ChangePasswordModal onClose={closeChangePasswordModal} />
      )}
      {withdrawalModalOn && <WithdrawalModal onClose={closeWithdrawalModal} />}
    </div>
  );
}

export default ModifyUser;
