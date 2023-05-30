import React, { useState } from 'react';
import { createUsre } from '../../services/apiService';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');  // メッセージのステートを追加

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createUsre(username, email, password);  // resultを受け取る

      // createUsreがtrueを返した場合
      if(result) {
        setMessage('アカウント作成完了！');  // メッセージをセット
      } else {
        setMessage('作成失敗');  // メッセージをセット
      }
    } catch (error) {
      console.error(error);
      setMessage('作成失敗');  // エラーが発生した場合もメッセージをセット
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
      <p>{message}</p>  {/* メッセージを表示 */}
    </div>
  );
};

export default Signup;
