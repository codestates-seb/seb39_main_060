import { css } from '@emotion/react';
import Button from '../../../Common/Button';
// import Evaluation from './Evalueation';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { infoToEvalue } from '../../../../atom/atom';
import Star from './Star';
import request from '../../../../api';

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 594px;
  width: 541px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 49px 31px 18px 31px;
  .title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    color: #0b6ff2;
    margin-bottom: 31px;
  }
`;

const InnerContainer = css`
  width: 479px;
  height: 412px;
  background: #ffffff;
  box-shadow: inset 5px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 23px 26px 20px 26px;
  :overflow-y {
    overflow: scroll;
  }
`;

const ButtonContainer = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Date = css`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
`;

const ConstentContainer = css`
  width: 427px;
  height: 60px;
  background: #f0f8ff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 12px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

function EvalueModal({
  arr,
  text,
  firstBtnType,
  secondBtnType,
  firstBtnText,
  secondBtnText,
  setIsOpen,
  memberId,
}) {
  const studyInfo = useRecoilValue(infoToEvalue);

  const onClose = () => {
    setIsOpen(false);
  };

  let obj;
  let lastArr;

  const fnc = (ratingIndex, member) => {
    //star 컴포넌트에서 각 멤버 점수 가져옴
    console.log(
      `'점수' ${ratingIndex}'멤버아이디' ${member} 스터디아이디 ${studyInfo.studyId}`
    );

    obj = {
      memberId: member,
      evaluation: ratingIndex,
    };

    useEffect(() => {
      console.log(obj);
      arr.push(obj);

      function isSame(arr, obj) {
        //같은 아이디 체크하는 함수 따로 만듦
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].memberId === obj.memberId) {
            return i;
          }
        }
        return -1;
      }

      function getLastArr() {
        var resultArr = [];
        for (let i = 0; i < arr.length; i++) {
          let idx = isSame(resultArr, arr[i]);
          if (idx !== -1) {
            resultArr[idx].evaluation = arr[i].evaluation;
          } else {
            resultArr.push(arr[i]);
          }
        }
        lastArr = resultArr.filter((el) => el.evaluation !== 0); //이전에 눌렸던 스터디 정보가 0점으로 같이 읽혀서 0인 경우 뺌
      }
      getLastArr();
    }, [obj]);
  };

  // 평가 제출 함수
  async function submitEvalueData(patchObj) {
    try {
      const response = await request.post('/api/study-evaluation', patchObj);
      console.log(response);
      console.log(response.data);
      alert('스터디 평가를 완료했습니다');
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  const submitHandler = () => {
    let opacity = studyInfo.memberList.length;
    console.log('정원 ' + opacity);
    console.log('점수 기록 ' + lastArr.length);

    if (opacity > lastArr.length) {
      alert('모든 스터디원에게 1점 이상의 후기를 남겨주세요');
    } else {
      let patchObj = {
        studyId: studyInfo.studyId,
        memberId: memberId,
        evaluations: lastArr,
      };
      console.log(patchObj);
      submitEvalueData(patchObj);
    }
  };
  return (
    <div css={Container}>
      <section className="title">{text}</section>
      <section css={InnerContainer}>
        <div css={Date}>{studyInfo.endDate}까지</div>
        {studyInfo.memberList ? (
          studyInfo.memberList.map(({ memberId, nickname }) => (
            <div key={memberId}>
              <div css={ConstentContainer}>
                <span>{nickname}</span>
                <Star member={memberId} fnc={fnc} />
              </div>
            </div>
          ))
        ) : (
          <div>멤버 없음</div>
        )}
      </section>
      <section css={ButtonContainer}>
        <Button
          type={`${firstBtnType}`}
          text={`${firstBtnText}`}
          onClick={submitHandler}
        />
        <Button
          type={`${secondBtnType}`}
          text={`${secondBtnText}`}
          onClick={onClose}
        />
      </section>
    </div>
  );
}

export default EvalueModal;