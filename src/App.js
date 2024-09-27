import './App.css';
import DynamicForm from './DynamicForm';
import formStructure from './formJson.json';

function App() {
  return (
    <div>
    <DynamicForm jsonStructure={formStructure} />
  </div>
  );
}

export default App;
