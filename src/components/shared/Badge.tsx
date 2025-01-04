import { colors } from '@/styles/colorPalette';
import styled from '@emotion/styled';
import Text from './Text';

interface IBageProps {
  label: string;
}

function Badge({ label }: IBageProps) {
  return (
    <Container>
      <Text bold={true} typography="t7" color="white">
        {label}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 2px 8px;
`;

export default Badge;
