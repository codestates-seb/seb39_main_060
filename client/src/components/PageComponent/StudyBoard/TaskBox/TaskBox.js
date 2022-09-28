import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import SelectUser from './SelectUser';
import TaskItem from './TaskItem';
import request from '../../../../api';
import { userInfoState } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';
import UserProgressBar from './UserProgressBar';

function TaskBox({ studyInfo, studyId }) {
  const userInfo = useRecoilValue(userInfoState);
  const [select, setSelect] = useState({
    memberId: userInfo.memberId,
    nickname: userInfo.nickname,
    profileImage: userInfo.profileImage,
  });
  const [taskList, setTaskList] = useState([]);

  const taskHandler = () => {
    request(
      `/api/study-progress/sub/${studyId}/member/${select.memberId}`
    ).then((res) => {
      setTaskList(res.data.data.taskList);
      // console.log(res.data.data.taskList);
      console.log(res);
    });
  };
  useEffect(() => {
    taskHandler();
  }, [select]);

  return (
    <div css={taskBox}>
      <div css={taskTop}>
        <div>Task</div>
        <div>
          <UserProgressBar taskList={taskList} total={taskList.length} />
        </div>
        <SelectUser
          memberInfo={studyInfo.memberList}
          select={select}
          setSelect={setSelect}
        />
      </div>
      <div css={tasks}>
        {taskList &&
          taskList.map((task) => (
            <div key={task.taskId}>
              <TaskItem task={task} select={select} />
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
`;

const taskTop = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;

  div:nth-of-type(1) {
    font-size: 40px;
    font-weight: 600;
  }
`;

const tasks = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
