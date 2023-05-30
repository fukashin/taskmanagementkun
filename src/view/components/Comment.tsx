//Comment.tsx
import React from 'react';
import { Comment as CommentModel } from '../../domain/models/Comment';
import { Card } from 'react-bootstrap';

// コメントコンポーネントのプロパティを定義するためのインターフェイス
interface CommentProps {
  comment: CommentModel;
}

// Comment コンポーネントは、コメントの内容と投稿者を表示します
const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Card style={{ width: '80rem', marginTop: '1rem' }}>
      <Card.Title>No: {comment.comment_number}</Card.Title> 
      <Card.Title>名前: {comment.user_id}</Card.Title> 
      <Card.Text
      dangerouslySetInnerHTML={{
        __html: comment.content.replace(/\n/g, '<br>')
      }}
    />
    <Card.Text>
      日時: {`${new Date(comment.createdAt).getFullYear()}/ ${new Date(comment.createdAt).getDate()}/ ${new Date(comment.createdAt).getMonth() + 1}/${["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"][new Date(comment.createdAt).getDay()]} ${new Date(comment.createdAt).toLocaleTimeString()}`}
    </Card.Text>

    </Card>
  );
};

export default Comment;
