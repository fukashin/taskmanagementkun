import React, { useEffect, useState } from "react";
import { Gantt, Task as GanttTask } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { getTasks,updateTaskDate} from '../../services/apiService';  // getTasksとTaskのインポート
import { Task2 } from '../../domain/models/models'; 


//参考にしました
//https://cybozudev.zendesk.com/hc/ja/articles/7505492467225-React-%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6-kintone-%E3%81%AB%E3%82%AC%E3%83%B3%E3%83%88%E3%83%81%E3%83%A3%E3%83%BC%E3%83%88%E3%81%A8%E3%82%AB%E3%83%B3%E3%83%90%E3%83%B3%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%97%E3%82%88%E3%81%86-

const GanttChartComponent: React.FC = () => {
  const dummyTask: GanttTask[] = [{
    id: '0',
    name: 'Loading...',
    start: new Date(2023, 4, 19),
    end: new Date(2023, 4, 31),
    progress: 0,
    type: 'task',
  }];
  

  const [tasks, setTasks] = useState<GanttTask[]>(dummyTask);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks('current_time');

      
      
      
      const tasksForGanttChart = tasksData.map((task: Task2) => ({
        
        id: String(task.task_id),
        name: task.name,
        type: 'task',
        start: new Date(task.current_time),
        end: new Date(task.due_date),
        progress: 50,
      }));
      tasksForGanttChart.forEach((task: GanttTask) => console.log(task.start));


      

      setTasks(tasksForGanttChart);
    };

    fetchTasks();
  }, []);

  

  const onTaskChange = (task: GanttTask, children: GanttTask[]) => {
    // Start and end date strings in the format that your updateTaskDate function expects
    const start = task.start.toISOString();
    const end = task.end.toISOString();
  
    // API call to update the task with the new dates
    updateTaskDate(task.id, start, end);
  }
  const onDoubleClick = (task: GanttTask) => {
    // タスクの詳細ページへの新しいURLを生成します。
    // この場合、それは 'http://localhost:3000/Tasks/' にタスクのIDを追加したものになります。
    const url = window.location.protocol + '//' + window.location.host + '/Tasks/' + task.id;

    // window.location.assign() を使用して、ブラウザを新しく生成したURL（タスクの詳細ページ）にリダイレクトします。
    window.location.assign(url);
}

  
  


  return (
    <div>
      <Gantt
        tasks={tasks}
        onDateChange={onTaskChange}
        onDoubleClick={onDoubleClick}
        // 他のプロパティも必要に応じて追加してください
      />
    </div>
  );
};

export default GanttChartComponent;
