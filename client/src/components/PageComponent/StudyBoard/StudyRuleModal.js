import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import { ModalContent } from '../../Common/ModalContent';
import { useState } from 'react';
import request from '../../../api';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

function StudyRuleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editContent, setEditContent] = useState('');
  const { studyId } = useParams();

  const getStudyRule = () => {
    setIsOpen(true);
    return request(`/api/study-progress/rule/${studyId}`).then((res) => {
      // console.log(res);
      setContent(res.data.data.rule);
    });
  };

  const onChange = () => {
    setIsEditOpen(!isEditOpen);
  };

  const editHandler = () => {
    return request
      .patch(`/api/study-progress/rule/${studyId}`, { rule: editContent })
      .then(() => {
        // console.log('edit', res);
        setIsEditOpen(false);
        getStudyRule();
      });
  };

  return (
    <div css={displayBtn}>
      <div className="big">
        <Button type={'big_blue'} text={'규칙'} onClick={getStudyRule} />
      </div>
      <div className="small">
        <Button type={'small_blue'} text={'규칙'} onClick={getStudyRule} />
      </div>
      {isOpen && (
        <Modal
          style={{
            content: { width: 'auto', height: 'auto', borderRadius: '20px' },
          }}
        >
          <ModalContent
            text={'우리 스터디 규칙'}
            content={
              isEditOpen ? (
                <textarea
                  defaultValue={content}
                  css={editor}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              ) : (
                content
              )
            }
            firstBtnType={'small_blue'}
            secondBtnType={'small_grey'}
            firstBtnText={isEditOpen ? '완료' : '수정'}
            secondBtnText={'닫기'}
            setIsOpen={setIsOpen}
            onClick={isEditOpen ? editHandler : onChange}
          />
        </Modal>
      )}
    </div>
  );
}

export default StudyRuleModal;

const editor = css`
  display: block;
  border: 1px solid #d1d1d1;
  width: 100%;
  padding: 0.5rem;
  height: 100%;
  border-radius: 10px;
  resize: none;
  outline: none;
  font-size: 18px;
`;

const displayBtn = css`
  .big {
    @media all and (max-width: 767px) {
      display: none;
    }
  }
  .small {
    @media all and (min-width: 767px) {
      display: none;
    }
  }
`;
