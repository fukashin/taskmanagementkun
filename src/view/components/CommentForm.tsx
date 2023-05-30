//CommentForm.tsx
import React, { useState } from 'react';
import { createComment } from '../../services/apiService';
import { Button, Form } from 'react-bootstrap';

// コメントフォームコンポーネントのプロパティを定義するためのインターフェイス
interface CommentFormProps {
  TaskId: number; // スレッドの ID
  onCommentSubmit: () => void; // コメントが送信された後に呼び出される関数
}

// CommentForm コンポーネントは、新しいコメントを作成するためのフォームを表示します
const CommentForm: React.FC<CommentFormProps> = ({ TaskId, onCommentSubmit }) => {
  const [content, setContent] = useState(''); // コメントの内容を保持するための State

  // フォームが送信されたときに実行される関数
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // ページリロードを防ぐ
  try {
    // API を使用して新しいコメントを作成する前に、送信データをログ出力
    console.log("Sending data:", {
      task_id: TaskId,
      content: content,
      user_id: '通りすがりの名無し',
    });

    // API を使用して新しいコメントを作成する
    await createComment(TaskId, content, '通りすがりの名無し');
    onCommentSubmit(); // コメント送信後に呼び出される関数を実行
    setContent(''); // コメントの内容をリセット
  } catch (error) {
    console.log('Error creating comment:', error);
    }
  };

  // コメントフォームを表示する
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>
        Comment:
      </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};

export default CommentForm;
