import './App.css';
import Text from './components/shared/Text';
import Button from './components/shared/Button';
import Input from './components/shared/Input';
import TextField from './components/shared/TextField';
import Alert from './components/shared/Alert';
import { useAlertContext } from './contexts/AlertContext';

function App() {
  const { open } = useAlertContext();

  return (
    <div>
      <Text typography="t1" display="block">
        t1
      </Text>
      <Text typography="t2" color="blue">
        t2
      </Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text>t5</Text>
      <Text>t6</Text>
      <Text>t7</Text>
      <div style={{ height: 10, width: '100%', background: '#efefef' }}></div>
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="success" weak={true}>
        클릭해주세요
      </Button>
      <Button color="error" weak={true}>
        클릭해주세요
      </Button>
      <Button full={true}>클릭해주세요</Button>
      <Button full={true} disabled={true}>
        클릭해주세요
      </Button>
      <div style={{ height: 10, width: '100%', background: '#efefef' }}></div>

      <Input placeholder="입력해요" />
      <Input aria-invalid={true} />

      <TextField label="아이디" placeholder="이름을 입력해주세요" />
      <TextField
        label="비밀번호"
        placeholder="이름을 입력해주세요"
        hasError={true}
      />
      {/* 
      <Alert
        title="알럿이 떴습니다"
        description="알럿이 떴습니다"
        onButtonClick={() => console.log('알럿이 닫혔습니다')}
        open={true}
      /> */}
      <Button
        onClick={() => {
          open({
            title: '알럿이 떴습니다',
            description: '알럿이 떴습니다',
            onButtonClick: () => console.log('알럿이 닫혔습니다'),
          });
        }}
      >
        알럿 오픈
      </Button>
    </div>
  );
}

export default App;
