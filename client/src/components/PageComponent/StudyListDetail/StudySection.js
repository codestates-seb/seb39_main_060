import { css } from '@emotion/react';
import { singleStudyState, userInfoState } from '../../../atom/atom';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import request from '../../../api/index';
import TaskItem from './TaskItem';
import Button from '../../Common/Button';

const StudySection = ({ id }) => {
  const studyInfo = useRecoilValue(singleStudyState);
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();

  const deleteHandler = () => {
    if (studyInfo.member.memberId !== userInfo.memberId) {
      alert('권한이 없습니다');
    } else {
      return request.delete(`/api/study-board/${id}`).then(() => {
        navigate('/studylist');
      });
    }
  };

  const editHandler = () => {
    if (studyInfo.member.memberId !== userInfo.memberId) {
      alert('권한이 없습니다');
    } else {
      navigate(`/studylist/modify/${id}`);
    }
  };

  return (
    <div>
      <div css={container}>
        <div css={top_container}>
          <div>
            <span className="title">{studyInfo.teamName}</span>
            <Button type={'small_white'} text={'수정'} onClick={editHandler} />

            <Button type={'small_grey'} text={'삭제'} onClick={deleteHandler} />
          </div>
          <div css={info}>
            <span className="info">{`${studyInfo.startDate} ~ ${studyInfo.endDate}`}</span>
            <span className="info">{`${studyInfo.capacity}명`}</span>
            {studyInfo.member?.nickname ? (
              <div>
                <Link
                  to={`/main/${studyInfo.member.nickname}`}
                  css={css`
                    text-decoration: none;
                  `}
                >
                  <span className="main_link">
                    {studyInfo.member.profileImage}
                  </span>
                </Link>
                <Link
                  to={`/main/${studyInfo.member.nickname}`}
                  css={css`
                    text-decoration: none;
                  `}
                >
                  <span className="main_link">{studyInfo.member.nickname}</span>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <div className="detail_title">스터디 요약</div>
          <div className="study_content">{studyInfo.summary}</div>
        </div>
        <div>
          <div className="detail_title">스터디 상세 설명</div>
          <div className="study_content">{studyInfo.detail}</div>
        </div>
        <div>
          <div className="detail_title">스터디 규칙</div>
          <div className="study_content">{studyInfo.rule}</div>
        </div>
        <div css={task_container}>
          <div className="task_title">스터디 Task</div>
          {studyInfo.taskList &&
            studyInfo.taskList.map((task, idx) => (
              <TaskItem task={task} key={task.taskId} idx={idx} />
            ))}
        </div>
      </div>
    </div>
  );
};

StudySection.displayName = 'StudySection';

export default StudySection;

const container = css`
  display: flex;
  flex-direction: column;
  .detail_title {
    font-size: 25px;
    padding-bottom: 23px;
    /* border-bottom: 2px solid black; */
    box-shadow: 0px 8px 2px -2px rgba(0, 0, 0, 0.25);
  }
  .study_content {
    font-size: 20px;
    padding-top: 36px;
    margin-bottom: 118px;
  }

  .main_link {
    color: black;
    &:hover {
      cursor: pointer;
      color: #066ff2;
    }
  }
`;

const top_container = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
  .title {
    font-size: 35px;
    margin-right: 37px;
    color: #000000;
  }
  .info {
    font-size: 25px;
    color: #066ff2;
    margin-bottom: 16px;
  }

  span:last-child {
    font-size: 20px;
    color: #000000;
  }
`;

const info = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const task_container = css`
  padding-bottom: 118px;
  .task_title {
    font-size: 25px;
    padding-bottom: 23px;
    box-shadow: 0px 8px 2px -2px rgba(0, 0, 0, 0.25);
  }
`;