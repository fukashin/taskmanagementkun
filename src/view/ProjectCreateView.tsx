// ProjectForm.tsx
import React, { useState } from 'react'; // ReactとuseStateフック（ローカルステートを管理するため）をインポート
import {createTask} from '../services/apiService'; // apiServiceからcreateTask関数をインポート
// 必要なフックをインポートします
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Row, Col, Button, Alert } from 'react-bootstrap';


// このコンポーネントが期待するプロパティを定義


// Reactの関数型コンポーネント。ProjectFormProps型のpropsを引数に取ります。
const ProjectForm: React.FC = () => {

  const navigate = useNavigate();
  
  // useStateの引数に`null`ではなく`string | null`という型を指定します
  const [error, setError] = useState<string | null>(null);
  // useStateフックを使用して各入力フィールドのローカルステートを管理
  const [name, setName] = useState(""); // タスク名
  const [dueDate, setDueDate] = useState(""); // 終了予定日
  const [creator, setCreator] = useState(""); // タスク作成者
  const [assignee, setAssignee] = useState(""); // タスク実行者
  const [status, setStatus] = useState("O"); // ステータス（初期値は'O'）
  const [importance, setimportance] = useState("2");
  const [kind, setkind] = useState("");

  // フォームが送信されたときに実行される関数
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
    
    // due_dateを文字列からDateオブジェクトに変換
    const dueDateObj = new Date(dueDate);
    
    try {
      // DjangoバックエンドへのPOSTリクエストを送信
      await createTask(name, dueDateObj, creator, assignee, status, importance, kind);
      
      // 入力フィールドをクリア
      setName("");
      setDueDate("");
      setCreator("");
      setAssignee("");
      setStatus("O");
      setkind("");

      // 成功した場合はユーザーを元のページにリダイレクトします
      navigate("/");
    } catch (error) {
      // エラーが発生した場合はエラーメッセージを設定します
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
          <Form.Control
            type="text"
            value={kind}
            placeholder="タスクの種類"
            onChange={e => setkind(e.target.value)}
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
