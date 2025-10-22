import React from 'react';
import { Admin, Resource } from 'react-admin';
import { MasterList, MasterEdit, MasterCreate, MasterShow } from './Masters';
import { UserList, UserShow, UserEdit } from './Users';
import { BaziDataList, BaziDataShow, BaziDataEdit } from './BaziData';
import { ChatList, ChatShow } from './Chats';
import { OrderList, OrderShow, OrderEdit } from './Orders';
import { CustomLayout } from './layout/CustomLayout';
import { Dashboard } from './dashboard/Dashboard';
import {
  supabaseAuthProvider,
  supabaseDataProvider,
  LoginPage,
} from 'ra-supabase';
import { supabaseClient, supabaseUrl, supabaseKey } from './supabaseClient';
import { chineseMessages } from './i18n/chinese';
import { englishMessages } from './i18n/english';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { taobaoTheme } from './theme';

// 使用单一的 Supabase 客户端实例来创建 dataProvider 和 authProvider
// 这确保不会创建多个 GoTrueClient 实例
const dataProvider = supabaseDataProvider({
  instanceUrl: supabaseUrl,
  apiKey: supabaseKey,
  supabaseClient: supabaseClient, // 明确传入客户端实例，避免内部重复创建
});
const authProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    let { data, error } = await supabaseClient
      .from('users')
      .select('role')
      .match({ id: user.id })
      .single();

    // 防御性编程：如果 public.users 里没有记录（可能 trigger 失败），则自动创建
    if (error) {
      console.warn('Failed to get user role, attempting to create profile.', error);
      const { data: newData, error: insertError } = await supabaseClient
        .from('users')
        .insert({ id: user.id, role: 'user' })
        .select()
        .single();
      
      if (insertError) {
        console.error('Failed to create user profile.', insertError);
        // 出错时，给一个默认的 user 角色，避免应用崩溃
        return { id: user.id, fullName: user.email, ...user, role: 'user' };
      }
      data = newData;
    }
    
    return {
      id: user.id,
      fullName: user.email,
      ...user,
      role: data.role,
    };
  },
  checkAuth: async () => {
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError || !session) {
      throw new Error('Authentication failed');
    }

    let { data, error } = await supabaseClient
      .from('users')
      .select('role')
      .match({ id: session.user.id })
      .single();

    // 同样进行防御性编程
    if (error) {
        console.warn('Failed to get user role in checkAuth, attempting to create profile.', error);
        const { data: newData, error: insertError } = await supabaseClient
            .from('users')
            .insert({ id: session.user.id, role: 'user' })
            .select()
            .single();

        if (insertError) {
            console.error('Failed to create user profile in checkAuth.', insertError);
            throw new Error('Permission denied, profile creation failed.');
        }
        data = newData;
    }

    if (data?.role !== 'admin') {
      throw new Error('Permission denied');
    }
  },
});

// 创建动态国际化提供者
const createI18nProvider = (getCurrentMessages) => {
  return polyglotI18nProvider(() => getCurrentMessages(), 'zh');
};

// 应用组件
const AppContent = () => {
  const { getCurrentMessages } = useLanguage();
  const i18nProvider = createI18nProvider(getCurrentMessages);

  return (
    <Admin 
      dataProvider={dataProvider} 
      authProvider={authProvider}
      loginPage={LoginPage}
      i18nProvider={i18nProvider}
      title="八字算命管理后台"
      theme={taobaoTheme}
      layout={CustomLayout}
      dashboard={Dashboard}
      disableTelemetry
    >
      <Resource 
        name="masters" 
        list={MasterList} 
        show={MasterShow}
        edit={MasterEdit} 
        create={MasterCreate}
        options={{ label: 'masters.name' }}
      />
      <Resource 
        name="users" 
        list={UserList}
        show={UserShow}
        edit={UserEdit}
        options={{ label: 'users.name' }}
      />
      <Resource 
        name="bazi_data" 
        list={BaziDataList} 
        show={BaziDataShow} 
        edit={BaziDataEdit}
        options={{ label: '八字数据' }}
      />
      <Resource 
        name="chats" 
        list={ChatList} 
        show={ChatShow}
        options={{ label: '聊天记录' }}
      />
      <Resource 
        name="orders" 
        list={OrderList} 
        show={OrderShow} 
        edit={OrderEdit}
        options={{ label: '订单管理' }}
      />
    </Admin>
  );
};

const App = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;