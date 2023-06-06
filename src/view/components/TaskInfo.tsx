// TaskDetails.tsx
import React from 'react';
import { Task2 as TaskModel } from '../../domain/models/models';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


interface TaskDetailsProps {
  task: TaskModel;
  onEditClick: () => void; // 編集ボタンクリック時のコールバック
  onDeleteClick: () => void; // 削除ボタンクリック時のコールバック 追加
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onEditClick ,onDeleteClick}) => {
  const navigate = useNavigate();

  const handleDeleteClick = async () => { // 追加
    await onDeleteClick();
    navigate("/");
  }
  return (
    <Card style={{ width: '30rem', marginTop: '2rem' }}>
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{task.kind}</Card.Subtitle>
        <Card.Text>
          <b>重要度:</b> {task.importance === "3" ? "大" : task.importance === "2" ? "中" : "小"} <br />
          <b>開始日:</b> {new Date(task.current_time).toLocaleString()} <br />
          <b>期限:</b> {new Date(task.due_date).toLocaleString()} <br />
          <b>作成者:</b> {task.creator} <br />
          <b>担当者:</b> {task.assignee} <br />
          <b>状況:</b> {task.status === "O" ? "Open" : "Closed"}
        </Card.Text>
        <Button variant="primary" onClick={onEditClick}>編集</Button> {/* 追加 */}
        <Button variant="danger" onClick={handleDeleteClick}>削除</Button> {/* 追加 */}
      </Card.Body>
    </Card>
  );
};

export default TaskDetails;


