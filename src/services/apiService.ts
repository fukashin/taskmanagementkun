// api.ts
import axios from 'axios';
import { Comment } from '../domain/models/Comment';
import { Task} from '../domain/models/models';
import { AxiosResponse } from 'axios';


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


export const createUsre = async  (username: string, email: string, password: string): Promise<Comment> => {
  const response = await axios.post(`${API_BASE_URL}/signup/`, {username:username,email:email,password:password,}); 
  return response.data;
};

// 他の定義の後に追加
interface SignInResponse {
  token: string;
}

// getUsre関数の定義
export async function getUsre(username: string, password: string): Promise<SignInResponse> {
  const response: AxiosResponse<SignInResponse> = await axios.post(`${API_BASE_URL}/signin/`, {
    username,
    password,
  });
  return response.data;
}

export const getUserInfo = async (token: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/user_info/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user information');
  }

  return await response.json();
};


// APIから種類を取得する関数
export const getKinds = async (): Promise<{value: string, label: string}[]> => {
  const response = await axios.get(`${API_BASE_URL}/kinds/`);
  return response.data;
};

// 新しい種類をAPIに作成する関数
export const createKind = async (name:string): Promise<string> => {
  const response = await axios.post(`${API_BASE_URL}/kinds_create/`, { 'kind':name });
  return response.data;
};


//export default api;
