import React, { useCallback, useEffect, useRef, useState } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import request from '../api/index';
import TaskContainer from '../components/PageComponent/MakeStudy/TaskContainer';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../atom/atom';
import { useNavigate } from 'react-router-dom';

const MainContainer = css`
  width: 100vw;
  padding-top: 8rem;
`;

const ContentContainer = css`
  max-width: calc(1200px + 2rem);
  margin: 0 auto;
  padding: 0 2rem;
`;

const MakeStudyTitle = css`
  font-size: 2.5rem;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StudyDetailContainer = css`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StudyDetailLeft = css`
  display: inline-flex;
  width: 45%;
  margin-right: 5%;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

const StudyDetailRight = css`
  display: inline-flex;
  width: 45%;
  margin-left: 5%;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Label = css`
  display: block;
  margin: 1rem 0;
  font-size: 1.1rem;
`;

const InputLeft = css`
  width: 100%;
  height: 45px;
  padding: 0 0.5rem;
  border: 1px solid #999999;
  border-radius: 5px;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SummaryContainer = css`
  flex: 4 0;
`;

const PhotoContainer = css`
  flex: 6 0;
`;

const FileInput = css`
  display: none;
`;

const ImageContainer = css`
  position: relative;
  width: 100%;
  height: 208px;
  overflow: hidden;
`;

const StudyImage = css`
  width: 100%;
  height: 100%;
  border-radius: 5px 5px 0 0;
`;

const UploadButton = css`
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  left: 0;
  font-size: 1.2rem;
  color: white;
  border: none;
  border-radius: 0 0 5px 5px;
  background-color: #0b6ff2;
`;

const SummaryTextArea = css`
  width: 100%;
  height: calc(100% - 55px);
  padding: 0.5rem;
  border: 1px solid #999999;
  border-radius: 5px;
  font-size: 1.2rem;
  resize: none;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IntroduceAndRulesContainer = css`
  width: 100%;
  margin: 60px 0;
`;

const BigLabel = css`
  display: inline-block;
  border-bottom: 3px solid #0b6ff2;
  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BigTextArea = css`
  display: block;
  width: 100%;
  height: 250px;
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #999999;
  border-radius: 5px;
  font-size: 1.2rem;
  resize: none;
  @media (max-width: 768px) {
    height: 200px;
    font-size: 1rem;
  }
`;

const Submit = css`
  height: 40px;
  padding: 0 1rem;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  background-color: #0b6ff2;
  box-sizing: border-box;
  transition: all 0.1s linear;
  &:hover {
    background-color: #4391f9;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Cancel = css`
  height: 40px;
  margin-right: 1rem;
  padding: 0 1rem;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  background-color: #999999;
  box-sizing: border-box;
  transition: all 0.1s linear;
  &:hover {
    color: #999999;
    background-color: white;
    border: 1px solid #999999;
  }
  &:active {
    transform: scale(0.9);
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ValidStar = css`
  color: red;
`;

const BigLabelValidStar = css`
  color: red;
  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

function MakeStudy() {
  // ?????? ?????? recoil state
  const [userInfo, setUserInfo] = useRecoilState(userInfoState); // eslint-disable-line no-unused-vars
  // studyboard post??? ?????? state
  const [studyBoardForm, setStudyBoardForm] = useState({
    memberId: userInfo?.memberId,
    teamName: null,
    capacity: null,
    image: null,
    summary: null,
    detail: null,
    rule: null,
    taskList: null,
    startDate: null,
    endDate: null,
  });

  // input change handler
  const handleChangeName = (e) => {
    setStudyBoardForm({ ...studyBoardForm, teamName: e.target.value });
  };

  const handleChangeCapacity = (e) => {
    setStudyBoardForm({ ...studyBoardForm, capacity: e.target.value });
  };

  const handleChangeSummary = (e) => {
    setStudyBoardForm({ ...studyBoardForm, summary: e.target.value });
  };

  const handleChangeDetail = (e) => {
    setStudyBoardForm({ ...studyBoardForm, detail: e.target.value });
  };

  const handleChangeRule = (e) => {
    setStudyBoardForm({ ...studyBoardForm, rule: e.target.value });
  };

  const handleChangeStartDate = (e) => {
    setStudyBoardForm({ ...studyBoardForm, startDate: e.target.value });
  };

  const handleChangeEndDate = (e) => {
    setStudyBoardForm({ ...studyBoardForm, endDate: e.target.value });
  };

  // button click handler
  const handleMakeStudyButton = (e) => {
    e.preventDefault();
    // ????????? ??????
    if (
      studyBoardForm.teamName === '' ||
      studyBoardForm.teamName > 30 ||
      studyBoardForm.teamName < 2
    ) {
      alert('????????? ????????? 2?????? ?????? 30??? ????????? ???????????? ?????????');
      return;
    }
    if (
      studyBoardForm.capacity === '' ||
      studyBoardForm.capacity > 5 ||
      studyBoardForm.capacity < 2
    ) {
      alert('????????? ????????? 2??? ?????? 5??? ????????? ???????????? ?????????');
      return;
    }
    if (studyBoardForm.summary === '' || studyBoardForm.summary > 1500) {
      alert('???????????? 1500??? ???????????? ???????????? ?????????');
      return;
    }
    if (studyBoardForm.detail === '' || studyBoardForm.detail > 5000) {
      alert('????????? ????????? 5000??? ????????? ???????????? ?????????');
      return;
    }
    if (studyBoardForm.rule === '' || studyBoardForm.rule > 2000) {
      alert('????????? ????????? 2000??? ????????? ???????????? ?????????');
      return;
    }
    if (studyBoardForm.taskList === null) {
      alert('?????? 1?????? task??? ???????????? ?????????');
      return;
    }
    for (let task of studyBoardForm.taskList) {
      if (
        task.content === null ||
        task.deadline === null ||
        task.content > 100
      ) {
        alert('task??? 100??? ????????? ???????????? ?????????');
        return;
      }
    }
    request
      .post('/api/study-board', studyBoardForm)
      .then((res) => navigate(`/studylist/detail/${res.data.data.studyId}`));
  };

  // ?????? ?????? ?????? ??? ?????? ???????????? ??????
  const navigate = useNavigate();
  const handleCancelButton = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // image ????????? ??? ?????? ????????? ?????? ref
  const fileInputRef = useRef();
  const imageRef = useRef();

  // input ?????? ????????? ????????? ????????? ?????? ??????
  const handleChangeImage = (e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    request
      .post(
        `/api/study-board/image?file-size=${e.target.files[0].size}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        imageRef.current.src = res.data.data;
        setStudyBoardForm({ ...studyBoardForm, image: res.data.data });
      });
  };

  // ????????? ????????? ?????? ?????? ??? input ?????? ???????????? ??????
  const handleUploadClick = useCallback((e) => {
    e.preventDefault();
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  }, []);

  // ????????? ?????? ?????? ??????(??????)
  let startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  startDate = startDate.toISOString().slice(0, 10);

  // ????????? ?????? ?????? ??????(180??? ???)
  const [endMaximumDate, setEndMaximumDate] = useState();
  useEffect(() => {
    let emd = new Date(studyBoardForm.startDate);
    emd.setDate(emd.getDate() + 180);
    emd = emd.toISOString().slice(0, 10);
    setEndMaximumDate(emd);
  }, [studyBoardForm]);

  return (
    <>
      <main css={MainContainer}>
        <div css={ContentContainer}>
          <section css={MakeStudyTitle}>
            <h1>????????? ?????? ??????</h1>
          </section>
          <section>
            <form action="submit">
              {/* ????????? ?????? ?????? */}
              <div css={StudyDetailContainer}>
                <div css={StudyDetailLeft}>
                  <div>
                    <label htmlFor="studyName" css={Label}>
                      ????????? ?????? <span css={ValidStar}>*</span>
                    </label>
                    <input
                      type="text"
                      name="studyName"
                      placeholder="2??? ?????? 10??? ??????"
                      minLength={2}
                      maxLength={10}
                      onChange={handleChangeName}
                      required
                      css={InputLeft}
                    />
                  </div>
                  <div>
                    <label htmlFor="studyCapacity" css={Label}>
                      ????????? ?????? <span css={ValidStar}>*</span>
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={5}
                      name="studyCapacity"
                      placeholder="2 ~ 5"
                      required
                      onChange={handleChangeCapacity}
                      css={InputLeft}
                    />
                  </div>
                  <div>
                    <label htmlFor="studyStart" css={Label}>
                      ????????? ????????? <span css={ValidStar}>*</span>
                    </label>
                    <input
                      type="date"
                      name="studyStart"
                      min={startDate}
                      required
                      onChange={handleChangeStartDate}
                      css={InputLeft}
                    />
                  </div>
                  <div>
                    <label htmlFor="studyEnd" css={Label}>
                      ????????? ????????? <span css={ValidStar}>*</span>
                    </label>
                    <input
                      type="date"
                      name="studyEnd"
                      min={studyBoardForm.startDate}
                      max={endMaximumDate}
                      disabled={studyBoardForm.startDate ? false : true}
                      required
                      onChange={handleChangeEndDate}
                      css={InputLeft}
                    />
                  </div>
                </div>
                <div css={StudyDetailRight}>
                  <div css={SummaryContainer}>
                    <label htmlFor="summary" css={Label}>
                      ????????? ????????? <span css={ValidStar}>*</span>
                    </label>
                    <textarea
                      type="text"
                      name="summary"
                      placeholder="1??? ?????? 50??? ??????"
                      minLength={1}
                      maxLength={50}
                      spellCheck="false"
                      required
                      onChange={handleChangeSummary}
                      css={SummaryTextArea}
                    />
                  </div>
                  <div css={PhotoContainer}>
                    <label htmlFor="studyPhoto" css={Label}>
                      ????????? ?????? ??????
                    </label>
                    <input
                      type="file"
                      name="studyPhoto"
                      accept="image/png,image/jpg,image/jpeg"
                      ref={fileInputRef}
                      css={FileInput}
                      onChange={handleChangeImage}
                    />
                    <div css={ImageContainer}>
                      <img
                        src="/no_image.jpeg"
                        alt="profile_image"
                        ref={imageRef}
                        css={StudyImage}
                      />
                      <button onClick={handleUploadClick} css={UploadButton}>
                        ????????? ?????????
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div css={IntroduceAndRulesContainer}>
                <div>
                  <div>
                    <label htmlFor="introduce" css={BigLabel}>
                      ????????? ??????
                    </label>
                    <span css={BigLabelValidStar}> *</span>
                  </div>
                  <textarea
                    type="text"
                    name="introduce"
                    placeholder="5000??? ??????"
                    maxLength={5000}
                    spellCheck="false"
                    required
                    onChange={handleChangeDetail}
                    css={BigTextArea}
                  />
                </div>
                <div>
                  <div>
                    <label htmlFor="rules" css={BigLabel}>
                      ????????? ??????
                    </label>
                    <span css={BigLabelValidStar}> *</span>
                  </div>

                  <textarea
                    type="text"
                    name="rules"
                    placeholder="2000??? ??????"
                    maxLength={2000}
                    spellCheck="false"
                    required
                    onChange={handleChangeRule}
                    css={BigTextArea}
                  />
                </div>
              </div>
              <TaskContainer
                studyBoardForm={studyBoardForm}
                setStudyBoardForm={setStudyBoardForm}
                startDate={studyBoardForm.startDate}
                endMaximumDate={endMaximumDate}
              />
              <div
                css={css`
                  text-align: right;
                `}
              >
                <button onClick={handleCancelButton} css={Cancel}>
                  ??????
                </button>
                <button onClick={handleMakeStudyButton} css={Submit}>
                  ????????? ?????????
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default MakeStudy;
