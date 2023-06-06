// MyPage.tsx

import React, { useState, useEffect } from 'react';
import { getUserInfoWithToken} from '../../services/apiService';
import Logout from './Logout'; // ログアウトコンポーネントをインポート

const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ username: string; email: string }>({ username: '', email: '' });

  useEffect(() => {
    // fetchData 関数を定義して、トークンを使ってユーザー情報を取得する
    const fetchData = async () => {
      try {
        // getUserInfoWithTokenを呼び出してユーザー情報を取得
        const data = await getUserInfoWithToken();
          
        // 取得したユーザー情報をステートにセット
        setUserInfo(data);
      } catch (error) {
        // エラーが発生した場合、コンソールにエラーを出力
        console.error(error);
      }
    };
    
    // fetchData 関数を呼び出し
    fetchData();
  }, []);

  // ユーザー情報を表示するマイページコンポーネントのレンダリング
  return (
    <div>
      <h1>マイページです</h1>
      <div>
        <h2>ユーザー情報</h2>
        <p>ユーザー名: {userInfo.username}</p>
        <p>登録されているメールアドレス: {userInfo.email}</p>
        <Logout /> {/* ログアウトコンポーネントを追加 */}
      </div>
    </div>
  );
};

export default MyPage;

