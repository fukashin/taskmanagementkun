declare module 'gantt-task-react' {
  export type Task = {
      start: Date,
      end: Date,
      name: string,
      id: string,
      type: string,
      progress: number,
      isDisabled: boolean,
      styles: {
          progressColor: string,
          progressSelectedColor: string
      },
  };

  export interface Gantt {
      tasks: Task[],
      viewMode?: string,
      onDateChange?: Function,
      onTaskDelete?: Function,
      onProgressChange?: Function,
      onDoubleClick?: Function,
      onClick?: Function
  }
}
