// ProjectForm.tsx
import React, { useState, useEffect } from 'react';
import { createTask, getUserInfo, getKinds, createKind } from '../services/apiService';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Row, Button, Alert } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';

// ProjectFormという名前の関数コンポーネントを作ります。これはプロジェクトのフォームを表示します。
const ProjectForm: React.FC = () => {
  // navigateはページ遷移をするための関数です
  const navigate = useNavigate();

  // フォームの各フィールドのデータを保存するための状態（useStateを使用）を作成します。
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [creator, setCreator] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("O");
  const [importance, setimportance] = useState("2");
  const [kind, setKind] = useState<{value: string, label: string} | null>(null);
  const [kindOptions, setKindOptions] = useState<{value: string, label: string}[]>([]);  // タスクの種類のオプションを保存するための状態
  
  
  // コンポーネントがマウントされた時（最初に表示された時）にユーザー情報とタスクの種類を取得します
  useEffect(() => {
    // ユーザー情報を取得する非同期関数を定義します
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const data = await getUserInfo(token);
        setCreator(data.username);
      }
    };

    // タスクの種類を取得する非同期関数を定義します
    const fetchKinds = async () => {
      const kinds: {value: string, label: string}[] = await getKinds(); // APIを使ってタスクの種類を取得します
      console.log(kinds); // ログ出力
      setKindOptions(kinds); // 返されたオブジェクトの配列をそのままセット
    }

    // 非同期関数を実行します
    fetchUserInfo();
    fetchKinds();
  }, []);

  // フォームの送信ハンドラーを定義します。これはフォームが送信された時に実行される関数です
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const dueDateObj = new Date(dueDate);
    
    try {
      // タスクの種類がオプションリストにない場合、新しく作成します
      if (kind && !kindOptions.some(option => option.value === kind.value)) {
        console.log('Creating new kind:', kind.value);  // <- 追加
        await createKind(kind.value);
        setKindOptions([...kindOptions, kind]);  // 新しいタスクの種類をオプションに追加します
      }
      // タスクを作成します
      await createTask(name, dueDateObj, creator, assignee, status, importance, kind ? kind.value : '');

      // フォームフィールドをクリアします
      setName("");
      setDueDate("");
      setCreator("");
      setAssignee("");
      setStatus("O");
      setKind(null);

      // ホームページに戻ります
      navigate("/");
    } catch (error) {
      setError("すべての項目を入力してください");
    }
  };
  type OptionType = {value: string, label: string};

  const handleKindChange = async (value: OptionType | null) => {
    if (value && !kindOptions.some(option => option.value === value.value)) {
      // 新しい種類を作成します
      try {
        console.log( value.value); 
        await createKind(value.value);
        setKindOptions([...kindOptions, value]);  // 新しいタスクの種類をオプションに追加します
      } catch (error) {
        console.error(error);
      }
    }
    // 現在の選択された種類を更新
    setKind(value);
  }
  
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
            <CreatableSelect
            key={kindOptions.length}  // add this line
            value={kind}
            onChange={value => handleKindChange(value)}
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
      {error && <Alert variant="danger">{error.toString()}</Alert>}
      <Button type="submit" variant="primary">Create Task</Button>
    </Form>
  );
};

export default ProjectForm; // 他のファイルからこのコンポーネントをインポートできるように
