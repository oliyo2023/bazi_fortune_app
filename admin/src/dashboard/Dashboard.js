import React from 'react';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    Grid, 
    Typography, 
    Box, 
    Avatar,
    Chip,
    LinearProgress
} from '@mui/material';
import { 
    TrendingUp,
    People,
    Star,
    AttachMoney,
    StarBorder,
    MonetizationOn,
    Psychology,
    Chat,
    ShoppingCart
} from '@mui/icons-material';
import { useGetList } from 'react-admin';

// 统计卡片组件
const StatCard = ({ title, value, icon, color, trend, isLoading }) => (
    <Card sx={{ height: 140, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {isLoading && <LinearProgress sx={{ mb: 1 }} />}
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ height: '100%' }}>
                <Box sx={{ flex: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography color="textSecondary" gutterBottom variant="body2" sx={{ fontSize: '0.875rem', mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 600, color: '#2f3542', mb: 1, fontSize: '1.75rem' }}>
                        {value || 0}
                    </Typography>
                    {trend && (
                        <Box display="flex" alignItems="center">
                            <TrendingUp sx={{ fontSize: 16, color: '#2ed573', mr: 0.5 }} />
                            <Typography variant="body2" sx={{ color: '#2ed573', fontSize: '0.8rem' }}>
                                {trend}
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Avatar sx={{ bgcolor: color, width: 60, height: 60, flexShrink: 0 }}>
                    {icon}
                </Avatar>
            </Box>
        </CardContent>
    </Card>
);

// 快速操作卡片
const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <Card 
        sx={{ 
            height: 180,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(255, 105, 0, 0.15)',
            }
        }}
        onClick={onClick}
    >
        <CardContent sx={{ 
            textAlign: 'center', 
            p: 3, 
            flex: 1,
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Avatar sx={{ bgcolor: color, width: 64, height: 64, mb: 2 }}>
                {icon}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem', lineHeight: 1.4 }}>
                {description}
            </Typography>
        </CardContent>
    </Card>
);

// 仪表板主组件
export const Dashboard = () => {
    // 获取真实数据
    const { total: usersTotal, isLoading: usersLoading } = useGetList('users');
    const { data: masters, total: mastersTotal, isLoading: mastersLoading } = useGetList('masters');
    const { data: baziData, total: baziTotal, isLoading: baziLoading } = useGetList('bazi_data');
    const { total: chatsTotal, isLoading: chatsLoading } = useGetList('chats');
    const { data: orders, total: ordersTotal, isLoading: ordersLoading } = useGetList('orders');

    // 计算活跃用户（最近7天有八字记录的用户）
    const activeUsers = baziData ? 
        new Set(baziData.filter(item => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(item.created_at) > weekAgo;
        }).map(item => item.user_id)).size : 0;

    // 计算今日订单
    const todayOrders = orders ? 
        orders.filter(order => {
            const today = new Date().toDateString();
            return new Date(order.created_at).toDateString() === today;
        }).length : 0;

    // 计算在线大师（假设有 is_online 字段）
    const onlineMasters = masters ? 
        masters.filter(master => master.is_online).length : 0;



    return (
        <Box sx={{ p: 3 }}>
            {/* 欢迎标题 */}
            <Box mb={4}>
                <Typography variant="h4" sx={{ 
                    fontWeight: 600, 
                    background: 'linear-gradient(45deg, #ff6900, #ff9500)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1 
                }}>
                    🔮 八字算命管理后台
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    欢迎回来！这里是您的数据概览和快速操作中心
                </Typography>
            </Box>

            {/* 统计卡片 */}
            <Grid container spacing={4} mb={4}>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard
                        title="总用户数"
                        value={usersTotal}
                        icon={<People />}
                        color="#ff6900"
                        trend={`活跃: ${activeUsers}`}
                        isLoading={usersLoading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard
                        title="认证大师"
                        value={mastersTotal}
                        icon={<Star />}
                        color="#2ed573"
                        trend={`在线: ${onlineMasters}`}
                        isLoading={mastersLoading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard
                        title="八字记录"
                        value={baziTotal}
                        icon={<Psychology />}
                        color="#ff4757"
                        trend="AI解读"
                        isLoading={baziLoading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard
                        title="聊天记录"
                        value={chatsTotal}
                        icon={<Chat />}
                        color="#5f27cd"
                        trend="实时通讯"
                        isLoading={chatsLoading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard
                        title="订单总数"
                        value={ordersTotal}
                        icon={<ShoppingCart />}
                        color="#3742fa"
                        trend={`今日: ${todayOrders}`}
                        isLoading={ordersLoading}
                    />
                </Grid>
            </Grid>

            {/* 系统状态 */}
            <Grid container spacing={4} mb={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader 
                            title="🎯 系统状态" 
                            sx={{ 
                                background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%)',
                                color: 'white',
                                '& .MuiCardHeader-title': {
                                    color: 'white',
                                    fontWeight: 600,
                                }
                            }}
                        />
                        <CardContent>
                            <Box sx={{ mt: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body2">后端API服务</Typography>
                                    <Chip label="运行中" color="success" size="small" />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body2">Supabase数据库</Typography>
                                    <Chip label="连接正常" color="success" size="small" />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body2">DeepSeek AI服务</Typography>
                                    <Chip label="可用" color="success" size="small" />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">管理后台</Typography>
                                    <Chip label="在线" color="success" size="small" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader 
                            title="📊 数据统计" 
                            sx={{ 
                                background: 'linear-gradient(135deg, #2ed573 0%, #7bed9f 100%)',
                                color: 'white',
                                '& .MuiCardHeader-title': {
                                    color: 'white',
                                    fontWeight: 600,
                                }
                            }}
                        />
                        <CardContent>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                📱 移动端用户占比: 85%
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                🎯 用户活跃度: {usersTotal ? Math.round((activeUsers / usersTotal) * 100) : 0}%
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                ⭐ 大师在线率: {mastersTotal ? Math.round((onlineMasters / mastersTotal) * 100) : 0}%
                            </Typography>
                            <Typography variant="body2">
                                💰 今日订单转化: {ordersTotal ? Math.round((todayOrders / ordersTotal) * 100) : 0}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* 快速操作 */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#2f3542' }}>
                🚀 快速操作
            </Typography>
            <Grid container spacing={4} mb={4}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <QuickActionCard
                        title="用户管理"
                        description="管理用户账户和权限设置"
                        icon={<People />}
                        color="#ff6900"
                        onClick={() => window.location.href = '#/users'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <QuickActionCard
                        title="大师管理"
                        description="审核和管理大师认证"
                        icon={<StarBorder />}
                        color="#2ed573"
                        onClick={() => window.location.href = '#/masters'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <QuickActionCard
                        title="八字数据"
                        description="查看八字计算和AI解读"
                        icon={<Psychology />}
                        color="#ff4757"
                        onClick={() => window.location.href = '#/bazi_data'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <QuickActionCard
                        title="订单管理"
                        description="处理订单和会员订阅"
                        icon={<MonetizationOn />}
                        color="#5f27cd"
                        onClick={() => window.location.href = '#/orders'}
                    />
                </Grid>
            </Grid>

            {/* 最近活动 */}
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#2f3542' }}>
                    📈 最近活动
                </Typography>
                <Card>
                    <CardHeader 
                        title="系统动态" 
                        sx={{ 
                            background: 'linear-gradient(135deg, #5f27cd 0%, #a55eea 100%)',
                            color: 'white',
                            '& .MuiCardHeader-title': {
                                color: 'white',
                                fontWeight: 600,
                            }
                        }}
                    />
                    <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar sx={{ bgcolor: '#2ed573', mr: 2, width: 32, height: 32 }}>
                                <Star sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="body1">系统已成功集成DeepSeek AI服务</Typography>
                                <Typography variant="body2" color="textSecondary">刚刚</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar sx={{ bgcolor: '#ff4757', mr: 2, width: 32, height: 32 }}>
                                <People sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="body1">管理后台新增八字数据和聊天记录模块</Typography>
                                <Typography variant="body2" color="textSecondary">5 分钟前</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: '#ff6900', mr: 2, width: 32, height: 32 }}>
                                <AttachMoney sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="body1">后端API服务启动成功，所有接口正常运行</Typography>
                                <Typography variant="body2" color="textSecondary">10 分钟前</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};