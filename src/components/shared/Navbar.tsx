import { colors } from '@/styles/colorPalette';
import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import Flex from './Flex';

function Navbar() {
  const location = useLocation();
  const showSignButton = !['/signup', '/signin'].includes(location.pathname);

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {showSignButton && (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )}
    </Flex>
  );
}

const navbarContainerStyles = css`
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.grey};
  padding: 10px 24px;
  z-index: 10;
`;

export default Navbar;
