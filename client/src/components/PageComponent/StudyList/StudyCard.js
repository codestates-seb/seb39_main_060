import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const Card = css`
  display: inline-block;
  /* width: 250px; */
  width: 20%;
  height: 250px;
  margin-bottom: 4rem;
  border-radius: 10px;
  box-shadow: 4px 8px 5px -2px rgb(0 0 0 /25%);
  transition: all 0.1s linear;
  &:hover {
    transform: translateY(-1rem);
  }
  @media (max-width: 1200px) {
    width: 30%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImageContainer = css`
  width: 100%;
  height: 60%;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  text-align: center;
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

const TextDecorationNone = css`
  text-decoration: none;
  color: black;
  &:hover,
  &:visited,
  &:link,
  &:active,
  &:focus {
    text-decoration: none;
    color: black;
  }
`;

function StudyCard({ studyData, boxRef }) {
  return (
    <li css={Card} ref={boxRef ? boxRef : null}>
      <Link
        to={`/studylist/detail/${studyData.studyId}`}
        css={TextDecorationNone}
      >
        <div css={ImageContainer}>
          <img src={studyData.image} alt="스터디 대표 사진" />
        </div>
        <div css={Content}>
          <div css={Summary}>
            {studyData.summary.length > 26
              ? `${studyData.summary.slice(0, 25)} ...`
              : studyData.summary}
          </div>
          <hr css={DivideLine} />
          <div css={NameAndCapacity}>
            <span>{studyData.teamName}</span>
            <span>정원 {studyData.capacity}명</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default StudyCard;
