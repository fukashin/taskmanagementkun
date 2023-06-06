// TaskEdit.tsx
import React, { useState } from 'react';
import { Task2 as TaskModel } from '../../domain/models/models';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { updateTask} from '../../services/apiService';



interface TaskEditProps {
  task: TaskModel;
  onEditSubmit: () => void; // 追加
}


const TaskEdit: React.FC<TaskEditProps> = ({ task }) => {
  // 各項目の初期値をstateとして保持
  const [name, setName] = useState(task.name);
  const [kind, setKind] = useState(task.kind);
  const [importance, setImportance] = useState(task.importance);
  const [startDate, setStartDate] = useState(new Date(task.current_time));  // 新たに開始予定日の状態を作成
  const [due_date, setDueDate] = useState(new Date(task.due_date));
  const [creator, setCreator] = useState(task.creator);
  const [assignee, setAssignee] = useState(task.assignee);
  const [status, setStatus] = useState(task.status);
  const navigate = useNavigate();

  // 更新ボタンが押されたときの処理
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      // updateTaskを呼び出してサーバーに更新したタスク情報を送信
      await updateTask(task.task_id, startDate,name, due_date, creator, assignee, status, importance, kind);
      alert('Task updated successfully');
      navigate("/");
    } catch (error) {
      alert('Failed to update task');
      console.error(error);
    }
  };

  return (
    <Card style={{ width: '30rem', marginTop: '2rem' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>タスク名</Form.Label>
            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>種類</Form.Label>
            <Form.Control type="text" value={kind} onChange={e => setKind(e.target.value)} />
          </Form.Group>

          <Form.Group >
          <Form.Label>重要度</Form.Label>
          <Form.Control
            as="select"
            value={importance}
            onChange={e => setImportance(e.target.value)}
          >
            <option value="3">大</option>
            <option value="2">中</option>
            <option value="1">小</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>開始日</Form.Label>
            <Form.Control type="date" value={startDate.toISOString().substr(0, 10)} onChange={e => setStartDate(new Date(e.target.value))} />
          </Form.Group>

          <Form.Group>
            <Form.Label>期限</Form.Label>
            <Form.Control type="date" value={due_date.toISOString().substr(0, 10)} onChange={e => setDueDate(new Date(e.target.value))} />
          </Form.Group>

          <Form.Group>
            <Form.Label>作成者</Form.Label>
            <Form.Control type="text" value={creator} onChange={e => setCreator(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>担当者</Form.Label>
            <Form.Control type="text" value={assignee} onChange={e => setAssignee(e.target.value)} />
          </Form.Group>

          <Form.Group className="col-md-6">
          <Form.Label>ステータス</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="O">Open</option>
            <option value="C">Closed</option>
          </Form.Control>
        </Form.Group>

          <Button variant="primary" type="submit">更新</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TaskEdit;
