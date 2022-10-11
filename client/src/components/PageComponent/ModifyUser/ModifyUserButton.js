import { css } from '@emotion/react';

function ModifyUserButton({ variant = 'primary', text, ...rest }) {
  return (
    <button
      css={css`
        width: 100%;
        height: 40px;
        border-radius: 5px;
        font-size: 18px;
        font-weight: normal;
        box-sizing: border-box;
        margin-top: 12px;
        margin-bottom: 30px;
        border: none;
        color: #ffffff;
        ${variant === 'primary' &&
        css`
          border: 1px solid #0b6ff2;
          background-color: #0b6ff2;
          &:hover:not(:disabled) {
            color: #0b6ff2;
            background-color: #ffffff;
          }
        `}
        ${variant === 'secondary' &&
        css`
          border: 1px solid #999999;
          background-color: #999999;
          &:hover:not(:disabled) {
            color: #999999;
            background-color: #ffffff;
          }
        `}
        &:disabled {
          background-color: #999999;
          border: none;
          cursor: not-allowed;
        }
      `}
      {...rest}
    >
      {text}
    </button>
  );
}

export default ModifyUserButton;
