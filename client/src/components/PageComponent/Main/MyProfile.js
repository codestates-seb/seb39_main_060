import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import GitHubBtnBlue from './GitHubBtn/GitHubBtnBlue';
import GitHubBtnMyGray from './GitHubBtn/GitHubBtnMyGray';
import GitHubBtnGray from './GitHubBtn/GitHubBtnGray';
import Avatar from '../../Common/Avatar';
import { useRecoilValue } from 'recoil';
import { mypageOwnerAtom } from '../../../atom/atom';
import ProfileStar from './ProfileStar';
const container = css`
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
  @media all and (max-width: 767px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const roundImg = css`
  border-radius: 100%;
  max-width: 82%;
`;

const name = css`
  font-size: 20px;
  font-weight: 500;
`;

const nameLocation = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .locationIcon {
    color: #4391f9;
    width: 17px;
  }
  .smallText {
    font-size: 8px;
  }
  display: flex;
  .locationText {
    display: flex;
    justify-content: center;
    margin-bottom: -2px;
    width: 100%;
  }
`;
const Evaluation = css`
  display: flex;
  align-items: center;
  font-size: smaller;
`;

const withoutImg = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  height: 100%;
  max-height: 50%;
  width: 100%;
  justify-content: space-between;

  @media all and (max-width: 767px) {
    width: 50%;
    height: 170px;
    justify-content: space-between;
  }
`;

function MyProfile({ githubId, isConnectedGit, isOwner }) {
  const owner = useRecoilValue(mypageOwnerAtom);
  return (
    <section css={container}>
      <section css={roundImg}>
        {owner.profileImage !== null ? (
          <img src={owner.profileImage} alt={'프로필 이미지'} />
        ) : (
          <Avatar css={roundImg} />
        )}
      </section>
      <section css={withoutImg}>
        <section css={nameLocation}>
          {owner.location && (
            <div className="locationText">
              <svg
                className="locationIcon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="smallText">{owner.location}</div>
            </div>
          )}

          <div css={name}>{owner.nickname}</div>
        </section>
        {owner.evaluation > 0 ? (
          <div css={Evaluation}>
            <ProfileStar evaluation={owner.evaluation} />
            평점 {owner.evaluation}
          </div>
        ) : null}
        {isConnectedGit ? (
          <GitHubBtnBlue githubId={githubId} />
        ) : isOwner ? (
          <GitHubBtnMyGray memberId={owner.memberId} />
        ) : (
          <GitHubBtnGray />
        )}
      </section>
    </section>
  );
}
export default MyProfile;
