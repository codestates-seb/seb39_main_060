import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import Modal from '../../Common/Modal';
import Button from '../../Common/Button';

const TitleContainer = css`
  width: 100%;
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = css`
  color: #0b6bff;
  font-size: 2.5rem;
`;

const ContentContainer = css``;

const TextLine = css`
  width: 100%;
  margin-bottom: 1rem;
  word-break: break-all;
`;
const TextHighligh = css`
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #0b6bff;
  text-align: center;
`;

const RedirectLink = css`
  color: #0b6bff;
  text-decoration: none;
  cursor: pointer;
`;

const ButtonContainer = css`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
`;

function Notice({ handleNoticeClose }) {
  const style = {
    content: {
      padding: '1rem',
      width: '550px',
      height: '600px',
    },
  };

  return (
    <>
      <Modal style={style}>
        <div css={TitleContainer}>
          <h3 css={Title}>공지사항</h3>
        </div>
        <div css={ContentContainer}>
          <p css={TextLine}>- 22.10.12 ~ 23.04.12 동안 배포 유지 예정</p>
          <p css={TextLine}>- 스터디 확인용 계정</p>
          <p css={TextHighligh}>ID : MoccoWorld@gmail.com</p>
          <p css={TextHighligh}>PW : mocco1234!</p>
          <p css={TextLine}>
            - 테스트용 계정으므로 임의로 데이터 변경이 불가합니다. 눈으로만
            봐주세요~
          </p>
          <p css={TextLine}>
            - Slido :{' '}
            <a
              href="https://app.sli.do/event/cA9fTYyYmArdXv6xhyYEfH/live/questions"
              target="_blank"
              css={RedirectLink}
              rel="noreferrer"
            >
              여기를 클릭해주세요!
            </a>
          </p>
          <p css={TextLine}>
            - Mocco 서비스를 사용하신 후 Slido에 피드백을 남겨주세요.
          </p>
          <p css={TextLine}>
            - 피드백을 남겨주시면 저희 서비스 개선에 큰 도움이 됩니다.
          </p>
          <p css={TextLine}>- 피드백 기간 10/12 ~ 10/18</p>
          <p css={TextLine}>
            - Github :{' '}
            <a
              href="https://github.com/codestates-seb/seb39_main_060"
              target="_blank"
              css={RedirectLink}
              rel="noreferrer"
            >
              여기를 클릭해주세요!
            </a>
          </p>
        </div>
        <div css={ButtonContainer}>
          <Button
            text={'알겠습니다!'}
            type={'long_blue'}
            onClick={handleNoticeClose}
          />
        </div>
      </Modal>
    </>
  );
}

export default Notice;
