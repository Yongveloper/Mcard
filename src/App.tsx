import './App.css';
import Text from './components/shared/Text';
import Button from './components/shared/Button';

function App() {
  console.log(process.env);

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
    </div>
  );
}

export default App;
