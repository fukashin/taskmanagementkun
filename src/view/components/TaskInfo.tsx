// TaskDetails.tsx
import React from 'react';
import { Task as TaskModel } from '../../domain/models/models';
import Card from 'react-bootstrap/Card';

interface TaskDetailsProps {
  task: TaskModel;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  return (
    <Card style={{ width: '30rem', marginTop: '2rem' }}>
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{task.kind}</Card.Subtitle>
        <Card.Text>
          <b>重要度:</b> {task.importance === "3" ? "大" : task.importance === "2" ? "中" : "小"} <br />
          <b>作成日:</b> {new Date(task.current_time).toLocaleString()} <br />
          <b>期限:</b> {new Date(task.due_date).toLocaleString()} <br />
          <b>作成者:</b> {task.creator} <br />
          <b>担当者:</b> {task.assignee} <br />
          <b>状況:</b> {task.status === "O" ? "Open" : "Closed"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TaskDetails;
