import React, { useState } from 'react';
import { getUsre } from '../../services/apiService';

const Signin: React.FC = () => {
  // ステートを設定: text, password
  const [text, settext] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // フォームを送信する処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ

    try {
      // APIにリクエストを送信
      const response = await getUsre(text, password);
      console.log(response); // 受け取ったデータをコンソールに出力

      // トークンをローカルストレージに保存
      localStorage.setItem('token', response.token);

      // 成功メッセージをセット
      setMessage('サインインに成功しました');
    } catch (error) {
      console.error(error); // エラーがあればコンソールに出力

      // 失敗メッセージをセット
      setMessage('サインインに失敗しました');
    }
  };

  // サインインフォームを表示
  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="text"
          value={text}
          onChange={(e) => settext(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signin;
