// Logout.tsx

import React, { useState } from 'react';

const Logout: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleLogout = () => {
    // ローカルストレージからトークンを取得
    const token = localStorage.getItem('token');

    // トークンが存在する場合
    if (token) {
      // ローカルストレージのトークンを削除
      localStorage.removeItem('token');
      // ページをリロードしてユーザー情報を更新
      window.location.reload();
      // メッセージを更新
      setMessage('ログアウト成功');
    } else {
      // メッセージを更新
      setMessage('ログインしていません');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Logout;
