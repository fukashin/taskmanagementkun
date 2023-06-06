import React, { useEffect, useState, useCallback } from 'react';
import { Task2 } from '../domain/models/models';
import { getTasks } from '../services/apiService'; 
import { Link ,useNavigate} from 'react-router-dom';
import './TasksView.css'; 

const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<Task2[]>([]);
  const [sort_by, setSortBy] = useState("task_id");
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();


  // useCallbackを使用してメモ化されたfetchTasks関数を定義します。
// これにより、sort_byとsortOrderが変更されるたびに新しい関数が生成されます
const fetchTasks = useCallback(async () => {
  // sortOrderが'desc'でsort_byが'task_id'の場合、URLに'?sort_by=-task_id'を追加します
  // getTasks関数は引数のURLでHTTP GETリクエストを発行し、取得したタスクのリストを返します
  const tasks = await getTasks(`${sortOrder === '降順' ? '-' : ''}${sort_by}`);
  
  // タスクのリストをステートにセットします
  setTasks(tasks);
  
  // デバッグ用にコンソールにタスクのリストを出力します
  console.log(tasks);
}, [sort_by, sortOrder]); // sort_by, sortOrderが変更されたときにfetchTasksを再生成

// useEffectを使用して、コンポーネントのマウントとfetchTasksの更新時にタスクをフェッチします
useEffect(() => {
  fetchTasks();
}, [fetchTasks]); // fetchTasksが変更されたときに再フェッチ

// ソートキー（クリックされたカラム名）を受け取り、ソート順を更新する関数
const handleSort = (sortKey: string) => {
  console.log(`Sort key: ${sortKey}`);
  if (sort_by === sortKey) {
    // すでにソートされているカラムがクリックされた場合、ソート順を反転します
    setSortOrder(sortOrder === '昇順' ? '降順' : '昇順');
  } else {
    // まだソートされていないカラムがクリックされた場合、昇順にソートします
    setSortBy(sortKey);
    setSortOrder('昇順');
  }
};

// ソート中のカラムに表示する矢印を返す関数
const arrow = (sortKey: string) => {
  if (sort_by === sortKey) {
    // ソート順により異なる矢印を表示します（昇順：'▲'、降順：'▼'）
    return sortOrder === '昇順' ? '▲' : '▼';
  }
  // ソートされていないカラムには矢印を表示しません
  return '';
};

  

  return (
  <div>
    <Link to="/createTask" style={{ float: 'right' ,marginBottom:'15px'}} className="button-link">新しいタスクを追加</Link> 

    
    <table className="tasks-table">
    <thead>
      <tr>
        <th onClick={() => handleSort('task_id')}>ナンバー {arrow('task_id')}</th>
        <th onClick={() => handleSort('name')}>タスク名 {arrow('name')}</th>
        <th onClick={() => handleSort('kind')}>種類 {arrow('kind')}</th>
        <th onClick={() => handleSort('importance')}>重要度 {arrow('importance')}</th>
        <th onClick={() => handleSort('current_time')}>開始日 {arrow('current_time')}</th>
        <th onClick={() => handleSort('due_date')}>終了予定日 {arrow('due_date')}</th>
        <th onClick={() => handleSort('creator')}>作成者 {arrow('creator')}</th>
        <th onClick={() => handleSort('assignee')}>担当者 {arrow('assignee')}</th>
        <th onClick={() => handleSort('status')}>ステータス {arrow('status')}</th>
      </tr>
    </thead>
    <tbody>
  {tasks.map((task, index) => (
    <tr key={index} onClick={() => navigate(`/Tasks/${task.task_id}`)}>  {/* Make the row clickable */}
      <td>{task.task_id}</td>
      <td>
      {task.name}
      </td>
      <td>{task.kind}</td>
      <td>{task.importance === "3" ? "大" : task.importance === "2" ? "中" : "小"}</td>
      <td>{new Date(task.current_time).toLocaleString()}</td>
      <td>{new Date(task.due_date).toLocaleString()}</td>
      <td>{task.creator}</td>
      <td>{task.assignee}</td>
      <td>{task.status === "O" ? "Open" : "Closed"}</td>
    </tr>
  ))}
</tbody>
    </table>
    </div>
  );
};

export default TasksView;
