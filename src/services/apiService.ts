// api.ts
import axios from 'axios';
import { Comment } from '../domain/models/Comment';
import { Task} from '../domain/models/models';

const API_BASE_URL = 'http://localhost:8000';


export const createTask = async (name:string ,due_date:Date ,creator:string, assignee:string, status:string,importance:string,kind:string) => {
  const response = await axios.post(`${API_BASE_URL}/tasks/`, {name:name, due_date:due_date, creator:creator, assignee:assignee, status:status,importance:importance,kind:kind});
  return response.data;
};

export const getTasks = async (sort_by:string) => {
  const response = await axios.get(`${API_BASE_URL}/update-info/?sort_by=${sort_by}`);

  return response.data;
};

export const fetchComments = async (task_id: number): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>(`${API_BASE_URL}/comments?taskid=${task_id}`);
  return response.data;
};

export const createComment = async (task_id: number, content: string, user_id: string): Promise<Comment> => {
  const response = await axios.post<Comment>(`${API_BASE_URL}/comments/`, { 'task_id': task_id, 'content':content, 'user_id': user_id ,});
  return response.data;
};

export const fetchTask = async (task_id: number): Promise<Task> => {
  const response = await axios.get<Task>(`${API_BASE_URL}/tasks/${task_id}`);
  return response.data;
};




//export default api;
