import React, { useEffect, useState, useCallback } from 'react';
import { Task } from '../domain/models/models';
import { getTasks } from '../services/apiService'; 
import { Link ,useNavigate} from 'react-router-dom';
import './TasksView.css'; 

const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sort_by, setSortBy] = useState("task_id");
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();


  const fetchTasks = useCallback(async () => {
    // If sort_by is task_id and sortOrder is desc, this will append '?sort_by=-task_id' to the URL
    const tasks = await getTasks(`${sortOrder === 'desc' ? '-' : ''}${sort_by}`);
  setTasks(tasks);
  console.log(tasks);
}, [sort_by, sortOrder]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Refetch when fetchTasks changes

  const handleSort = (sortKey: string) => {
    console.log(`Sort key: ${sortKey}`);
    if (sort_by === sortKey) {
      // If the column is already being sorted, reverse the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If the column is not being sorted, sort it in ascending order
      setSortBy(sortKey);
      setSortOrder('asc');
    }
  };
  const arrow = (sortKey: string) => {
    if (sort_by === sortKey) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
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
        <th onClick={() => handleSort('current_time')}>現在の時間 {arrow('current_time')}</th>
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
      {task.task_id}
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
