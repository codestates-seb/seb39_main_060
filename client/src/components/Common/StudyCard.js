import { css } from '@emotion/react';

const Card = css`
  width: 250px;
  height: 250px;
  margin-bottom: 4rem;
  border-radius: 10px;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  transition: all 0.1s linear;
  &:hover {
    transform: translateY(-1rem);
  }
`;

const ImageContainer = css`
  width: 100%;
  height: 60%;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
`;

const Content = css`
  display: flex;
  height: 40%;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: space-around;
`;

const Summary = css`
  font-size: 1.2rem;
`;

const DivideLine = css`
  border: 0;
  height: 1px;
  background: #d1d1d1;
`;

const NameAndCapacity = css`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

const Sign = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  span {
    font-size: 13px;
    color: #0b6ff2;
  }
`;

function StudyCard({ studyData, boxRef }) {
  return (
    <div css={Card} ref={boxRef ? boxRef : null}>
      <div css={ImageContainer}>
        <img src={studyData.image} alt="스터디 대표 사진" />
      </div>
      <div css={Content}>
        <div css={Summary}>
          {studyData.summary.length > 20
            ? `${studyData.summary.slice(0, 20)}...`
            : studyData.summary}
        </div>
        <hr css={DivideLine} />

        {studyData.studyStatus === 'STUDY_COMPLETE' &&
          studyData.evaluationStatus === 'BEFORE_EVALUATION' && (
            <div css={Sign}>
              <span>후기 작성 전</span>
            </div>
          )}

        <div css={NameAndCapacity}>
          <span>{studyData.teamName}</span>
          <span>정원 {studyData.capacity}명</span>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;