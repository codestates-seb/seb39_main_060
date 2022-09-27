import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  mypageOwnerAtom,
  userInfoState,
  infoToEvalue,
} from '../../../../atom/atom';
import { css } from '@emotion/react';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';
import request from '../../../../api';
import Modal from '../../../Common/Modal';
import EvalueModal from '../Evaluation/EvalueModal';

const Empty = css`
  height: 252px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #2d2d2d;
  svg {
    width: 75px;
    margin-bottom: 5px;
    color: #0f6ad5;
  }
`;

function ProgressList() {
  const [isOpen, setIsOpen] = useState(false);
  const [evalueInfo, setIvalueInfo] = useState({});
  const owner = useRecoilValue(mypageOwnerAtom);
  const studyArr = owner.progressStudy;
  const navigate = useNavigate();
  const user = useRecoilValue(userInfoState);
  const setInfo = useSetRecoilState(infoToEvalue);

  useEffect(() => {
    setInfo({
      endDate: evalueInfo.endDate,
      studyId: evalueInfo.studyId,
      memberList: evalueInfo.memberList,
    });
  }, [evalueInfo]);

  const getEvaluateInfo = (studyData) => {
    return request
      .get(
        `/api/study-evaluation/${studyData.studyId}/member/${owner.memberId}`
      )
      .then((res) => {
        console.log(res.data.data);
        setIvalueInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickHandler = (studyData) => {
    console.log(studyData);
    if (
      studyData.studyStatus === 'STUDY_COMPLETE' &&
      studyData.evaluationStatus === 'BEFORE_EVALUATION'
    ) {
      getEvaluateInfo(studyData);
      setIsOpen(true);
    } else if (studyData.studyStatus === 'STUDY_PROGRESS') {
      navigate(`/studylist/detail/${studyData.studyId}`);
    }
  };
  const onClose = () => {
    setIsOpen(false);
  };

  let arr = [];

  return (
    <div>
      {isOpen && user.memberId === owner.memberId && (
        <Modal
          onClose={onClose}
          style={{
            content: { width: 'auto', height: 'auto', borderRadius: '20px' },
          }}
        >
          <EvalueModal
            arr={arr}
            text={'스터디 후기를 작성해주세요'}
            firstBtnType={'small_blue'}
            secondBtnType={'small_grey'}
            firstBtnText={'제출'}
            secondBtnText={'닫기'}
            setIsOpen={setIsOpen}
            memberId={owner.memberId}
          />
        </Modal>
      )}
      {studyArr && studyArr.length < 1 ? (
        <div css={Empty}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <span>진행중인 스터디가 없습니다</span>
        </div>
      ) : (
        <Carousel
          studyArr={studyArr}
          progress={'propgress'}
          clickHandler={clickHandler}
        />
      )}
    </div>
  );
}

export default ProgressList;