//TaskDetailView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments,fetchTask ,deleteTask} from '../services/apiService';
import Comment from './components/Comment';
import CommentForm from './components/CommentForm';
import { Comment as CommentModel } from '../domain/models/Comment';
import { Task2 as TaskModel } from '../domain/models/models';
import TaskDetails from './components/TaskInfo'
import TaskEdit from './components/TaskEdit';


// Task コンポーネントは、特定のスレッドのコメントを表示します
const Task: React.FC = () => {
  //useParamsは動的URLを取得できます。今回の場合だとApp.tsxのRoute path="/Tasks/:Task_id"　←Task_idの部分　ここを指定してやるとTask_idに入っている数字が取れる。
  const { Task_id } = useParams(); // URL パラメータからスレッド ID を取得
  const [task, setTask] = useState<TaskModel | null>(null);
  const [comments, setComments] = useState<CommentModel[]>([]); // スレッド内のコメントを保持するための State

    // 編集モードの状態を保持するためのstate
    const [isEditing, setIsEditing] = useState(false);

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
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleDelete = async () => {
    if (task) {
      await deleteTask(task.task_id); // deleteTaskは削除を行うAPIコール
      // ホーム画面に遷移する処理をここに書く
    }
  };

  // コメントとコメントフォームを表示する
  return (
    <div>
      {/* taskが存在し、かつisEditingが真(true)である場合に<TaskEdit />を表示します。onEditSubmitとしてtoggleEdit関数を渡します。 */}
      {/* taskが存在し、かつisEditingが偽(false)である場合に<TaskDetails />を表示します。onEditClickとしてtoggleEdit関数を渡します。 */}
      {task && (isEditing ? 
        <TaskEdit task={task} onEditSubmit={toggleEdit} /> 
        : 
        <TaskDetails task={task} onEditClick={toggleEdit} onDeleteClick={handleDelete}/>
      )}
  
      {/* commentsの配列をマップ（すなわち、配列の各要素に対して関数を適用）し、それぞれのコメントに対して<Comment />コンポーネントを表示します。 */}
      {comments.map((comment) => (
        <Comment key={comment.user_id} comment={comment} />
      ))}
  
      {/* <CommentForm />を表示します。TaskIdとしてTask_idを渡し、onCommentSubmitとしてhandleCommentSubmit関数を渡します。 */}
      <CommentForm TaskId={Number(Task_id)} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
  
};

export default Task;
