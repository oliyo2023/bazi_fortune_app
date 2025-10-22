import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    Show,
    SimpleShowLayout,
    Filter,
    SearchInput,
    TopToolbar,
    ExportButton,
    FunctionField,
    useRecordContext,
    ReferenceField,
    BooleanField,
    NumberField,
} from 'react-admin';
import { Card, CardContent, Typography, Box, Grid, Chip, Avatar } from '@mui/material';
import { Chat, Message, Person, Star } from '@mui/icons-material';

// 聊天记录筛选器
const ChatFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" placeholder="🔍 搜索用户或大师" alwaysOn />
        <BooleanField source="is_trial" label="🆓 仅显示试聊" />
    </Filter>
);

// 自定义列表操作栏
const ListActions = () => (
    <TopToolbar>
        <ExportButton />
    </TopToolbar>
);

// 聊天状态组件
const ChatStatus = () => {
    const record = useRecordContext();
    if (!record) return null;

    const getStatusConfig = (status) => {
        switch (status) {
            case 'active':
                return { label: '进行中', color: 'success' };
            case 'ended':
                return { label: '已结束', color: 'default' };
            case 'pending':
                return { label: '等待中', color: 'warning' };
            default:
                return { label: '未知', color: 'error' };
        }
    };

    const config = getStatusConfig(record.status);
    
    return (
        <Chip
            label={config.label}
            color={config.color}
            size="small"
        />
    );
};

// 聊天类型组件
const ChatType = () => {
    const record = useRecordContext();
    if (!record) return null;
    
    return (
        <Chip
            label={record.is_trial ? '🆓 试聊' : '💰 付费'}
            color={record.is_trial ? 'info' : 'warning'}
            size="small"
        />
    );
};

// 聊天记录列表组件
export const ChatList = (props) => (
    <List
        {...props}
        filters={<ChatFilter />}
        actions={<ListActions />}
        perPage={25}
        sort={{ field: 'created_at', order: 'DESC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <ReferenceField source="user_id" reference="users" label="👤 用户">
                <TextField source="id" />
            </ReferenceField>
            <ReferenceField source="master_id" reference="masters" label="🌟 大师">
                <TextField source="name" />
            </ReferenceField>
            <FunctionField
                label="💬 类型"
                render={record => <ChatType />}
            />
            <FunctionField
                label="📊 状态"
                render={record => <ChatStatus />}
            />
            <NumberField source="message_count" label="💬 消息数" />
            <DateField source="created_at" label="📅 开始时间" showTime />
            <DateField source="ended_at" label="⏰ 结束时间" showTime />
        </Datagrid>
    </List>
);

// 聊天记录详情显示组件
export const ChatShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                                <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: '#ff6900' }}>
                                    <Chat sx={{ fontSize: 40 }} />
                                </Avatar>
                                <Typography variant="h6">聊天详情</Typography>
                                <FunctionField
                                    render={record => <ChatType />}
                                />
                                <Box mt={1}>
                                    <FunctionField
                                        render={record => <ChatStatus />}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={8}>
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    参与者信息
                                </Typography>
                                <ReferenceField source="user_id" reference="users" label="👤 用户ID">
                                    <TextField source="id" />
                                </ReferenceField>
                                <ReferenceField source="master_id" reference="masters" label="🌟 大师">
                                    <TextField source="name" />
                                </ReferenceField>
                            </Box>
                            
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    <Message sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    聊天统计
                                </Typography>
                                <NumberField source="message_count" label="💬 消息总数" />
                                <BooleanField source="is_trial" label="🆓 是否试聊" />
                                <DateField source="created_at" label="📅 开始时间" showTime />
                                <DateField source="ended_at" label="⏰ 结束时间" showTime />
                            </Box>
                            
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    <Star sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    关联信息
                                </Typography>
                                <ReferenceField source="order_id" reference="orders" label="📋 关联订单" emptyText="无关联订单">
                                    <TextField source="id" />
                                </ReferenceField>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </SimpleShowLayout>
    </Show>
);