import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.scss"
import TasksView from "./layout/TasksScreen/TasksView";

function App() {
  return (
    <div className="App">
        <TasksView />
    </div>
  );
}

export default App;
