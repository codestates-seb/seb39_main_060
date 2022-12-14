import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import SelectUser from './SelectUser';
import TaskItem from './TaskItem';
import request from '../../../../api';
import { userInfoState, mypageOwnerAtom } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';
import UserProgressBar from './UserProgressBar';
import { useNavigate } from 'react-router-dom';
import StudyRuleModal from '../StudyRuleModal';

function TaskBox({
  studyInfo,
  studyId,
  setSelectedId,
  teamName,
  expiredTaskCount,
  getStudyInfof,
}) {
  const userInfo = useRecoilValue(userInfoState);

  const [select, setSelect] = useState({
    memberId: userInfo?.memberId,
    nickname: userInfo?.nickname,
    profileImage: userInfo?.profileImage,
  });
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();
  const myPageOwner = useRecoilValue(mypageOwnerAtom);
  // console.log('select', userInfo);

  const taskHandler = () => {
    request(`/api/study-progress/sub/${studyId}/member/${select.memberId}`)
      .then((res) => {
        return res.data.data.taskList.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
      })
      .then((res) => {
        setTaskList(res);
        // console.log(res);
      })
      .then(() => getStudyInfof())
      .catch((err) => {
        if (err.response.data.message === '스터디의 멤버가 아닙니다.') {
          navigate(`/main/${myPageOwner.memberId}`);
          alert(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    // getStudyInfof();
    taskHandler();
    setSelectedId(select.memberId);
  }, [select]);

  return (
    <div css={taskBox}>
      <div css={taskTop}>
        <div className="task">Task</div>
        <section className="top">
          <div className="teamName">{teamName}</div>
          <div className="rule">
            <StudyRuleModal />
          </div>
        </section>
        <div className="desktopProgress">
          <UserProgressBar
            taskList={taskList}
            total={taskList.length}
            select={select?.memberId}
          />
        </div>
        <div>
          <SelectUser
            memberInfo={studyInfo.memberList}
            leaderInfo={studyInfo.teamLeader}
            select={select}
            setSelect={setSelect}
          />
        </div>
      </div>
      <section className="mobileProgress">
        <UserProgressBar
          taskList={taskList}
          total={taskList.length}
          select={select.memberId}
          expiredTaskCount={expiredTaskCount}
        />
      </section>
      <div css={tasks}>
        {taskList &&
          taskList.map((task) => (
            <div key={task.taskId}>
              <TaskItem
                task={task}
                select={select}
                taskHandlerf={taskHandler}
                getStudyInfof={getStudyInfof}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default TaskBox;

const taskBox = css`
  background-color: #f0f8ff;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .mobileProgress {
    @media all and (min-width: 767px) {
      display: none;
    }
  }
  .desktopProgress {
    @media all and (max-width: 767px) {
      display: none;
    }
  }
`;

const taskTop = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  width: 80vw;
  max-width: 1100px;

  section {
    width: auto;
  }

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .task {
    font-size: 40px;
    font-weight: 600;
    @media all and (max-width: 767px) {
      display: none;
    }
  }
  .teamName {
    font-size: 20px;
    font-weight: 600;
    @media all and (min-width: 767px) {
      display: none;
    }
  }
  .rule {
    @media all and (min-width: 767px) {
      display: none;
    }
  }
`;

const tasks = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
