// App.tsx
import React from 'react';
import ProjectsView from './view/ProjectsView';
import ProjectForm from './view/ProjectCreateView';
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import Task from './view/TaskDetailView'

const App: React.FC = () => {
  return (
    <Router>
    <div style={{ marginLeft: '50px' ,marginRight: '100px'}}>
    <div className="App">
      <header className="App-header">
        <h1>プロジェクト管理ツールver1</h1>
      </header>
      <Routes>
      {/* ルートに対応するコンポーネントを表示 */}
      <Route path="/" element={<ProjectsView/>}/>
      {/* タスク作成ページ*/}
      <Route path='/createTask' element={<ProjectForm />}/>
      {/* 個別のスレッドページ */}
      <Route path="/Tasks/:Task_id" element={<Task />} />
      </Routes>
    </div>
    </div>
    
    </Router>
  );
}

export default App;
