// App.tsx
import React from 'react';
import ProjectsView from './view/ProjectsView';
import ProjectForm from './view/ProjectCreateView';
import { BrowserRouter as Router, Route ,Routes,Link} from "react-router-dom";
import Task from './view/TaskDetailView';
import Signup from './view/components/Signup';
import Signin from './view/components/Signin';
import MyPage from './view/components/MyPage';
import './App.css'; 

const App: React.FC = () => {
  return (
    <Router>
    <div style={{ marginLeft: '50px' ,marginRight: '100px'}}>
    <div className="App">
      <header className="App-header">
        <h1>プロジェクト管理ツールver1</h1>
        {/* ナビゲーション */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signup">アカウント作成</Link>
          <Link to="/signin">ログイン</Link>
          <Link to="/MyPage">マイページ</Link>
        </nav>

      </header>
      
      <Routes>
      {/* ルートに対応するコンポーネントを表示 */}
      <Route path="/" element={<ProjectsView/>}/>
      {/* タスク作成ページ*/}
      <Route path='/createTask' element={<ProjectForm />}/>
      {/* 個別のスレッドページ */}
      <Route path="/Tasks/:Task_id" element={<Task />} />
      {/* アカウント作成ページ */}
      <Route path="/signup" element={<Signup />} />
      {/* ログインページ */}
      <Route path="/signin" element={<Signin />} />
      {/* マイページ*/}
      <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
    </div>
    
    </Router>
  );
}

export default App;
