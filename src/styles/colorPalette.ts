import { css } from '@emotion/react';

export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2196f3;
    --green: #4caf50;
    --black: #212121;
    --grey: #f0efef;
    --white: #ffffff;
  }
`;

export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  black: 'var(--black)',
  grey: 'var(--grey)',
  white: 'var(--white)',
};

export type Colors = keyof typeof colors;
