import React from 'react';
import { Layout, AppBar, Menu, Sidebar, useRecordContext } from 'react-admin';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { 
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Star as StarIcon,
    Home as HomeIcon,
} from '@mui/icons-material';

// 自定义应用栏 - 显示登录信息和刷新按钮
const CustomAppBar = (props) => (
    <AppBar 
        {...props} 
        sx={{
            '& .RaAppBar-title': {
                display: 'none', // 隐藏默认标题
            },
            '& .RaAppBar-toolbar': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '20px',
                paddingRight: '16px',
                minHeight: '48px', // 减小高度
                height: '48px',
            },
            '& .RaAppBar-menuButton': {
                marginRight: '12px',
            },
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Typography variant="h6" sx={{ 
                color: 'white', 
                fontWeight: 600, 
                ml: 1.5,
                fontSize: '1.1rem', // 稍微减小字体
            }}>
                后台管理
            </Typography>
        </Box>
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5, // 进一步减少间隙
            '& > *': {
                marginLeft: '0 !important', // 移除默认边距
            }
        }}>
            {props.children}
        </Box>
    </AppBar>
);

// 自定义面包屑组件
const CustomBreadcrumb = () => {
    const location = useLocation();
    const record = useRecordContext();
    
    const getBreadcrumbs = () => {
        const path = location.pathname;
        const breadcrumbs = [
            { label: '首页', href: '/', icon: <HomeIcon sx={{ fontSize: 14, mr: 0.5 }} /> }
        ];
        
        if (path.includes('/masters')) {
            breadcrumbs.push({ label: '⭐ 大师管理', href: '/masters' });
            if (path.includes('/create')) {
                breadcrumbs.push({ label: '创建大师', href: null });
            } else if (path.includes('/edit')) {
                breadcrumbs.push({ label: `编辑大师${record?.name ? ` - ${record.name}` : ''}`, href: null });
            } else if (path.match(/\/masters\/\d+$/)) {
                breadcrumbs.push({ label: `大师详情${record?.name ? ` - ${record.name}` : ''}`, href: null });
            }
        } else if (path.includes('/users')) {
            breadcrumbs.push({ label: '👥 用户管理', href: '/users' });
            if (path.includes('/create')) {
                breadcrumbs.push({ label: '创建用户', href: null });
            } else if (path.includes('/edit')) {
                breadcrumbs.push({ label: '编辑用户', href: null });
            } else if (path.match(/\/users\/\d+$/)) {
                breadcrumbs.push({ label: '用户详情', href: null });
            }
        }
        
        return breadcrumbs;
    };
    
    const breadcrumbs = getBreadcrumbs();
    
    return (
        <Box sx={{ 
            p: 1.5, // 减少内边距
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
            mb: 1.5 // 减少底部边距
        }}>
            <Breadcrumbs
                separator="›"
                sx={{
                    fontSize: '0.8rem', // 稍微减小字体
                    '& .MuiBreadcrumbs-separator': {
                        color: '#ff6900',
                        fontWeight: 'bold',
                    },
                }}
            >
                {breadcrumbs.map((crumb, index) => (
                    <Box key={index} display="flex" alignItems="center">
                        {crumb.href ? (
                            <Link
                                href={`#${crumb.href}`}
                                sx={{
                                    color: '#ff6900',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '0.8rem',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                {crumb.icon}
                                {crumb.label}
                            </Link>
                        ) : (
                            <Typography 
                                color="textPrimary" 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontWeight: 500,
                                    fontSize: '0.8rem',
                                }}
                            >
                                {crumb.label}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Breadcrumbs>
        </Box>
    );
};

// 自定义侧边栏
const CustomSidebar = (props) => (
    <Sidebar 
        {...props}
        sx={{
            '& .MuiDrawer-paper': {
                background: 'linear-gradient(180deg, #fff3e0 0%, #ffe0b2 100%)',
                borderRight: '2px solid #ff6900',
            }
        }}
    >
        <Box sx={{ 
            p: 3, 
            textAlign: 'center', 
            borderBottom: '2px solid #ff6900',
            background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%)',
            color: 'white'
        }}>
            <Box
                component="img"
                src="/logo.svg"
                alt="八字算命"
                sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    display: 'block',
                    mx: 'auto',
                }}
                onError={(e) => {
                    // 如果图片加载失败，显示默认图标
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                }}
            />
            <StarIcon 
                sx={{ 
                    fontSize: 80, 
                    color: '#ffffff', 
                    mb: 2,
                    display: 'none', // 默认隐藏，只在图片加载失败时显示
                }} 
            />
            <Typography variant="body2" sx={{ color: '#ffffff', opacity: 0.9 }}>
                管理系统
            </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
            <Menu {...props} />
        </Box>
    </Sidebar>
);

// 自定义菜单
const CustomMenu = (props) => (
    <Menu 
        {...props}
        sx={{
            '& .RaMenuItemLink-root': {
                borderRadius: '8px',
                margin: '4px 8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: '#ffe0b2',
                    transform: 'translateX(4px)',
                },
                '&.RaMenuItemLink-active': {
                    backgroundColor: '#ff6900',
                    color: '#ffffff',
                    '& .MuiListItemIcon-root': {
                        color: '#ffffff',
                    },
                    '& .MuiListItemText-primary': {
                        color: '#ffffff',
                        fontWeight: 600,
                    },
                },
            },
        }}
    >
        <Menu.DashboardItem 
            primaryText="📊 仪表板" 
            leftIcon={<DashboardIcon />}
        />
        <Menu.ResourceItem 
            name="masters" 
            primaryText="⭐ 大师管理" 
            leftIcon={<StarIcon />}
        />
        <Menu.ResourceItem 
            name="users" 
            primaryText="👥 用户管理" 
            leftIcon={<PeopleIcon />}
        />
    </Menu>
);

// 自定义主内容组件
const CustomContent = ({ children }) => (
    <Box sx={{ 
        paddingTop: '48px', // 调整为新的应用栏高度
        minHeight: '100vh',
    }}>
        <CustomBreadcrumb />
        {children}
    </Box>
);

// 自定义布局
export const CustomLayout = (props) => (
    <Layout
        {...props}
        appBar={CustomAppBar}
        sidebar={CustomSidebar}
        menu={CustomMenu}
    >
        <CustomContent>{props.children}</CustomContent>
    </Layout>
);