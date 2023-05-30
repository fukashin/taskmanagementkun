//Thread.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments,fetchTask } from '../services/apiService';
import Comment from './components/Comment';
import CommentForm from './components/CommentForm';
import { Comment as CommentModel } from '../domain/models/Comment';
import { Task as TaskModel } from '../domain/models/models';
import TaskDetails from './components/TaskInfo'


// Thread コンポーネントは、特定のスレッドのコメントを表示します
const Task: React.FC = () => {
  //useParamsは動的URLを取得できます。今回の場合だとApp.tsxのRoute path="/Tasks/:Task_id"　←Task_idの部分　ここを指定してやるとTask_idに入っている数字が取れる。
  const { Task_id } = useParams(); // URL パラメータからスレッド ID を取得
  const [task, setTask] = useState<TaskModel | null>(null);
  const [comments, setComments] = useState<CommentModel[]>([]); // スレッド内のコメントを保持するための State

  // コンポーネントがマウントされたときにコメントを取得する
  //コメントがないとエラーが起きるので
  useEffect(() => {
    if (Task_id) {
      const fetchTaskData = async () => {
        const fetchedTask = await fetchTask(Number(Task_id));
        setTask(fetchedTask);
        
        const fetchedComments = await fetchComments(Number(Task_id));
        setComments(fetchedComments);
      };

      fetchTaskData();
    }
  }, [Task_id]);

  // コメントが送信された後にコメントをリフレッシュするための関数
  const handleCommentSubmit = () => {
    fetchComments(Number(Task_id)).then(setComments);
  };

  // コメントとコメントフォームを表示する
  return (
    <div>
      {task && <TaskDetails task={task} />} 
      {comments.map((comment) => (
        <Comment key={comment.user_id} comment={comment} />
      ))}
      <CommentForm TaskId={Number(Task_id)} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default Task;
