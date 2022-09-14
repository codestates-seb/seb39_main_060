import { css } from '@emotion/react';
const color = 'white';

function App() {
  return (
    <div
      css={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${color};
        }
      `}
    >
      App test
    </div>
  );
}

export default App;
