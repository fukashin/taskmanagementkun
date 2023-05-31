// ProjectForm.tsx
import React, { useState, useEffect } from 'react';
import { createTask, getUserInfo, getKinds, createKind } from '../services/apiService';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Row, Button, Alert } from 'react-bootstrap';
import Select from 'react-select';

const ProjectForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [creator, setCreator] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("O");
  const [importance, setimportance] = useState("2");
  const [kind, setKind] = useState<{value: string, label: string} | null>(null);
  const [kindOptions, setKindOptions] = useState<{value: string, label: string}[]>([]);  // to hold our fetched kind options

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const data = await getUserInfo(token);
        setCreator(data.username);
      }
    };

    const fetchKinds = async () => {
      const kinds: string[] = await getKinds(); // Specify the type of 'kinds' as string array
      const formattedKinds = kinds.map((kind: string) => ({value: kind, label: kind})); // Specify the type of 'kind' as string
      setKindOptions(formattedKinds);
    }

    fetchUserInfo();
    fetchKinds();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const dueDateObj = new Date(dueDate);
    
    try {
      // If the kind is not in the options list, we try to create it
      if (kind && !kindOptions.some(option => option.value === kind.value)) {
        const newKind = await createKind(kind.value);
        setKindOptions([...kindOptions, {value: newKind, label: newKind}]);  // we add it to our kind options
      }

      await createTask(name, dueDateObj, creator, assignee, status, importance, kind ? kind.value : '');

      setName("");
      setDueDate("");
      setCreator("");
      setAssignee("");
      setStatus("O");
      setKind(null);

      navigate("/");
    } catch (error) {
      setError("すべての項目を入力してください");
    }
  };

  // フォーム要素をレンダリング
  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Row>
        <FormGroup className="col-md-6">
          <Form.Label>タスク名</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="タスク名"
            onChange={e => setName(e.target.value)}
          />
          </FormGroup>
          <FormGroup className="col-md-6">
          <Form.Label>タスクの種類</Form.Label>
          <Select
            value={kind}
            onChange={value => setKind(value)}
            options={kindOptions}  // use the fetched kind options
            isClearable
            isSearchable
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup className="col-md-6">
          <Form.Label>重要度</Form.Label>
          <Form.Control
            as="select"
            value={importance}
            onChange={e => setimportance(e.target.value)}
          >
            <option value="3">大</option>
            <option value="2">中</option>
            <option value="1">小</option>
          </Form.Control>
        </FormGroup>
        <FormGroup className="col-md-6">
          <Form.Label>終了予定日</Form.Label>
          <Form.Control
            type="datetime-local"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup className="col-md-6">
          <Form.Label>作成者</Form.Label>
          <Form.Control
            type="text"
            value={creator}
            placeholder="作成者"
            onChange={e => setCreator(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="col-md-6">
          <Form.Label>実行者</Form.Label>
          <Form.Control
            type="text"
            value={assignee}
            placeholder="実行者"
            onChange={e => setAssignee(e.target.value)}
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup className="col-md-6">
          <Form.Label>ステータス</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="O">Open</option>
            <option value="C">Closed</option>
          </Form.Control>
        </FormGroup>
      </Row>
      {/* エラーメッセージを表示します */}
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit" variant="primary">Create Task</Button>
    </Form>
  );
};

export default ProjectForm; // 他のファイルからこのコンポーネントをインポートできるように
