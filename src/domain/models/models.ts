// models.ts
export interface Task2 {
    task_id: number;
    name: string;
    kind: string;
    importance: string;
    current_time: Date;
    due_date: Date;
    creator: string;
    assignee: string;
    status: string;
  }
  