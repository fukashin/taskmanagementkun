// api.ts
import axios from 'axios';
import { Comment } from '../domain/models/Comment';
import { Task2} from '../domain/models/models';
import { AxiosResponse } from 'axios';


const API_BASE_URL = 'http://localhost:8000';
//const API_BASE_URL = 'http://あなたのec2のパブリックIPアドレス:8000';


export const createTask = async (name:string ,current_time:Date,due_date:Date ,creator:string, assignee:string, status:string,importance:string,kind:string) => {
  const response = await axios.post(`${API_BASE_URL}/tasks/`, {name:name, current_time:current_time,due_date:due_date, creator:creator, assignee:assignee, status:status,importance:importance,kind:kind});
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

export const fetchTask = async (task_id: number): Promise<Task2> => {
  const response = await axios.get<Task2>(`${API_BASE_URL}/tasks/${task_id}`);
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
  try {
    const response = await axios.get(`${API_BASE_URL}/user_info/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user information');
  }
};
export const getUserInfoWithToken = async (): Promise<any> => {
  const token = localStorage.getItem('token');
      
  if (token) {
    try {
      const data = await getUserInfo(token);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

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

export const updateTask = async (id: number,current_time:Date, name: string, due_date: Date, creator: string, assignee: string, status: string, importance: string, kind: string) => {
  const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, { name, current_time,due_date, creator, assignee, status, importance, kind });
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  return response.data;
};

export const updateTaskDate = async (id: String, current_time: string, due_date: string) =>{
  const response = await axios.put(`${API_BASE_URL}/tasks_date/${id}`,{current_time,due_date})
  return response.data;
}


//export default api;
