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
    SelectInput,
    Filter,
    SearchInput,
    TopToolbar,
    ExportButton,
    FunctionField,
    useRecordContext,
    ReferenceField,
    NumberField,
} from 'react-admin';
import { Card, CardContent, Typography, Box, Grid, Chip, Avatar } from '@mui/material';
import { ShoppingCart, Payment, Person, AttachMoney } from '@mui/icons-material';

// 订单筛选器
const OrderFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" placeholder="🔍 搜索订单ID或用户" alwaysOn />
        <SelectInput
            source="status"
            label="📊 订单状态"
            choices={[
                { id: 'pending', name: '⏳ 待支付' },
                { id: 'paid', name: '✅ 已支付' },
                { id: 'completed', name: '🎉 已完成' },
                { id: 'cancelled', name: '❌ 已取消' },
                { id: 'refunded', name: '💸 已退款' },
            ]}
        />
        <SelectInput
            source="payment_method"
            label="💳 支付方式"
            choices={[
                { id: 'wechat', name: '💬 微信支付' },
                { id: 'alipay', name: '💰 支付宝' },
                { id: 'card', name: '💳 银行卡' },
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

// 订单状态组件
const OrderStatus = () => {
    const record = useRecordContext();
    if (!record) return null;

    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return { label: '⏳ 待支付', color: 'warning' };
            case 'paid':
                return { label: '✅ 已支付', color: 'success' };
            case 'completed':
                return { label: '🎉 已完成', color: 'info' };
            case 'cancelled':
                return { label: '❌ 已取消', color: 'error' };
            case 'refunded':
                return { label: '💸 已退款', color: 'secondary' };
            default:
                return { label: '❓ 未知', color: 'default' };
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

// 支付方式组件
const PaymentMethod = () => {
    const record = useRecordContext();
    if (!record || !record.payment_method) return null;

    const getMethodConfig = (method) => {
        switch (method) {
            case 'wechat':
                return { label: '💬 微信支付', color: '#07c160' };
            case 'alipay':
                return { label: '💰 支付宝', color: '#1677ff' };
            case 'card':
                return { label: '💳 银行卡', color: '#722ed1' };
            default:
                return { label: '❓ 其他', color: '#8c8c8c' };
        }
    };

    const config = getMethodConfig(record.payment_method);
    
    return (
        <Chip
            label={config.label}
            size="small"
            sx={{ 
                backgroundColor: config.color,
                color: 'white',
                fontWeight: 'bold'
            }}
        />
    );
};

// 订单列表组件
export const OrderList = (props) => (
    <List
        {...props}
        filters={<OrderFilter />}
        actions={<ListActions />}
        perPage={25}
        sort={{ field: 'created_at', order: 'DESC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="id" label="📋 订单ID" />
            <ReferenceField source="user_id" reference="users" label="👤 用户">
                <TextField source="id" />
            </ReferenceField>
            <ReferenceField source="master_id" reference="masters" label="🌟 大师">
                <TextField source="name" />
            </ReferenceField>
            <NumberField 
                source="amount" 
                label="💰 金额" 
                options={{ style: 'currency', currency: 'CNY' }} 
            />
            <FunctionField
                label="📊 状态"
                render={record => <OrderStatus />}
            />
            <FunctionField
                label="💳 支付方式"
                render={record => <PaymentMethod />}
            />
            <DateField source="created_at" label="📅 创建时间" showTime />
        </Datagrid>
    </List>
);

// 订单详情显示组件
export const OrderShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                                <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: '#ff6900' }}>
                                    <ShoppingCart sx={{ fontSize: 40 }} />
                                </Avatar>
                                <Typography variant="h6">订单详情</Typography>
                                <FunctionField
                                    render={record => <OrderStatus />}
                                />
                                <Box mt={1}>
                                    <FunctionField
                                        render={record => <PaymentMethod />}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={8}>
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    订单信息
                                </Typography>
                                <TextField source="id" label="📋 订单ID" />
                                <ReferenceField source="user_id" reference="users" label="👤 用户ID">
                                    <TextField source="id" />
                                </ReferenceField>
                                <ReferenceField source="master_id" reference="masters" label="🌟 大师">
                                    <TextField source="name" />
                                </ReferenceField>
                            </Box>
                            
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    <AttachMoney sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    金额信息
                                </Typography>
                                <NumberField 
                                    source="amount" 
                                    label="💰 订单金额" 
                                    options={{ style: 'currency', currency: 'CNY' }} 
                                />
                                <NumberField 
                                    source="platform_fee" 
                                    label="🏢 平台费用" 
                                    options={{ style: 'currency', currency: 'CNY' }} 
                                />
                                <NumberField 
                                    source="master_earning" 
                                    label="🌟 大师收入" 
                                    options={{ style: 'currency', currency: 'CNY' }} 
                                />
                            </Box>
                            
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    <Payment sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    支付信息
                                </Typography>
                                <TextField source="payment_id" label="💳 支付ID" />
                                <DateField source="paid_at" label="✅ 支付时间" showTime />
                                <DateField source="created_at" label="📅 创建时间" showTime />
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </SimpleShowLayout>
    </Show>
);

// 订单编辑组件
export const OrderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput
                source="status"
                label="📊 订单状态"
                choices={[
                    { id: 'pending', name: '⏳ 待支付' },
                    { id: 'paid', name: '✅ 已支付' },
                    { id: 'completed', name: '🎉 已完成' },
                    { id: 'cancelled', name: '❌ 已取消' },
                    { id: 'refunded', name: '💸 已退款' },
                ]}
                fullWidth
            />
        </SimpleForm>
    </Edit>
);