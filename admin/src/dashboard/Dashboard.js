import React from 'react';
import { Card, CardContent, CardHeader, Grid, Typography, Box, Avatar } from '@mui/material';
import { 
    TrendingUp,
    People,
    Star,
    AttachMoney,
    Visibility,
    PersonAdd,
    StarBorder,
    MonetizationOn,
} from '@mui/icons-material';

// 统计卡片组件
const StatCard = ({ title, value, icon, color, trend }) => (
    <Card sx={{ height: 140, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ height: '100%' }}>
                <Box sx={{ flex: 1, mr: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography color="textSecondary" gutterBottom variant="body2" sx={{ fontSize: '0.875rem', mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 600, color: '#2f3542', mb: 1, fontSize: '1.75rem' }}>
                        {value}
                    </Typography>
                    {trend && (
                        <Box display="flex" alignItems="center">
                            <TrendingUp sx={{ fontSize: 16, color: '#2ed573', mr: 0.5 }} />
                            <Typography variant="body2" sx={{ color: '#2ed573', fontSize: '0.8rem' }}>
                                +{trend}%
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
    return (
        <Box sx={{ p: 3 }}>
            {/* 欢迎标题 */}
            <Box mb={4}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#2f3542', mb: 1 }}>
                    欢迎回来！👋
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    这里是您的管理后台概览
                </Typography>
            </Box>

            {/* 统计卡片 */}
            <Grid container spacing={4} mb={4}>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="总用户数"
                        value="1,234"
                        icon={<People />}
                        color="#ff6900"
                        trend="12"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="认证大师"
                        value="56"
                        icon={<Star />}
                        color="#2ed573"
                        trend="8"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="今日收入"
                        value="¥2,580"
                        icon={<AttachMoney />}
                        color="#ff4757"
                        trend="15"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="在线大师"
                        value="23"
                        icon={<Visibility />}
                        color="#5f27cd"
                        trend="5"
                    />
                </Grid>
            </Grid>

            {/* 快速操作 */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#2f3542' }}>
                快速操作
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <QuickActionCard
                        title="添加大师"
                        description="快速添加新的大师账户"
                        icon={<PersonAdd />}
                        color="#ff6900"
                        onClick={() => window.location.href = '#/masters/create'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <QuickActionCard
                        title="大师管理"
                        description="查看和管理所有大师"
                        icon={<StarBorder />}
                        color="#2ed573"
                        onClick={() => window.location.href = '#/masters'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <QuickActionCard
                        title="用户管理"
                        description="管理用户账户和权限"
                        icon={<People />}
                        color="#ff4757"
                        onClick={() => window.location.href = '#/users'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <QuickActionCard
                        title="收入统计"
                        description="查看平台收入报表"
                        icon={<MonetizationOn />}
                        color="#5f27cd"
                        onClick={() => alert('收入统计功能开发中...')}
                    />
                </Grid>
            </Grid>

            {/* 最近活动 */}
            <Box mt={4}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#2f3542' }}>
                    最近活动
                </Typography>
                <Card>
                    <CardHeader 
                        title="系统动态" 
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
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar sx={{ bgcolor: '#2ed573', mr: 2, width: 32, height: 32 }}>
                                <Star sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="body1">新大师 "张老师" 已通过认证</Typography>
                                <Typography variant="body2" color="textSecondary">2 小时前</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar sx={{ bgcolor: '#ff4757', mr: 2, width: 32, height: 32 }}>
                                <People sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="body1">新用户注册数量达到 50 人</Typography>
                                <Typography variant="body2" color="textSecondary">5 小时前</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: '#5f27cd', mr: 2, width: 32, height: 32 }}>
                                <AttachMoney sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="body1">今日收入突破 ¥2000</Typography>
                                <Typography variant="body2" color="textSecondary">8 小时前</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};