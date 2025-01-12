import { useUser } from '@/hooks/auth/useUser';
import { auth } from '@/remote/firebase';
import { colors } from '@/styles/colorPalette';
import { css } from '@emotion/react';
import { signOut } from 'firebase/auth';
import { useCallback } from 'react';

import { Link, useLocation } from 'react-router-dom';
import MyImage from '../my/MyImage';

import Button from './Button';
import Flex from './Flex';

function Navbar() {
  const location = useLocation();
  const showSignButton = !['/signup', '/signin'].includes(location.pathname);

  const user = useUser();

  const renderButton = useCallback(() => {
    if (user) {
      return (
        <Link to="/my">
          <MyImage size={40} />
        </Link>
      );
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }

    return null;
  }, [user, showSignButton]);

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
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
