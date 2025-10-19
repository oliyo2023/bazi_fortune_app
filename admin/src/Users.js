import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    Show,
    SimpleShowLayout,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    Filter,
    SearchInput,
    TopToolbar,
    ExportButton,
    FunctionField,
    useRecordContext,
} from 'react-admin';
import { Card, CardContent, Typography, Chip, Avatar, Box, Grid } from '@mui/material';
import { Person, AdminPanelSettings, Star } from '@mui/icons-material';

// 用户筛选器
const UserFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" placeholder="搜索用户ID" alwaysOn />
        <SelectInput
            source="role"
            label="角色"
            choices={[
                { id: 'user', name: '普通用户' },
                { id: 'master', name: '大师' },
                { id: 'admin', name: '管理员' },
            ]}
        />
    </Filter>
);

// 自定义列表操作栏
const ListActions = () => (
    <TopToolbar>
        <ExportButton />
    </TopToolbar>
);

// 角色显示组件
const RoleChip = () => {
    const record = useRecordContext();
    if (!record) return null;

    const getRoleConfig = (role) => {
        switch (role) {
            case 'admin':
                return { label: '管理员', color: 'error', icon: <AdminPanelSettings /> };
            case 'master':
                return { label: '大师', color: 'warning', icon: <Star /> };
            case 'user':
            default:
                return { label: '普通用户', color: 'default', icon: <Person /> };
        }
    };

    const config = getRoleConfig(record.role);
    
    return (
        <Chip
            label={config.label}
            color={config.color}
            size="small"
            icon={config.icon}
        />
    );
};

// 用户列表组件
export const UserList = (props) => (
    <List
        {...props}
        filters={<UserFilter />}
        actions={<ListActions />}
        perPage={25}
        sort={{ field: 'created_at', order: 'DESC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="id" label="用户ID" />
            <FunctionField
                label="角色"
                render={record => <RoleChip />}
            />
            <DateField source="created_at" label="注册时间" showTime />
        </Datagrid>
    </List>
);

// 用户详情显示组件
export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                                    <Person sx={{ fontSize: 40 }} />
                                </Avatar>
                                <Typography variant="h6">用户详情</Typography>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={8}>
                            <TextField source="id" label="用户ID" />
                            <FunctionField
                                label="角色"
                                render={record => <RoleChip />}
                            />
                            <DateField source="created_at" label="注册时间" showTime />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </SimpleShowLayout>
    </Show>
);

// 用户编辑组件
export const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" label="用户ID" disabled />
            <SelectInput
                source="role"
                label="角色"
                choices={[
                    { id: 'user', name: '普通用户' },
                    { id: 'master', name: '大师' },
                    { id: 'admin', name: '管理员' },
                ]}
                fullWidth
            />
        </SimpleForm>
    </Edit>
);