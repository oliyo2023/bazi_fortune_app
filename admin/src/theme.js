import { createTheme } from '@mui/material/styles';

// 淘宝系橙色主题
export const taobaoTheme = createTheme({
    palette: {
        primary: {
            main: '#ff6900', // 淘宝橙
            light: '#ff9500',
            dark: '#e55100',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ff4757', // 辅助红色
            light: '#ff6b7a',
            dark: '#c44569',
            contrastText: '#ffffff',
        },
        success: {
            main: '#2ed573', // 成功绿
            light: '#7bed9f',
            dark: '#5f27cd',
        },
        warning: {
            main: '#ffa502', // 警告橙
            light: '#ffb142',
            dark: '#ff6348',
        },
        error: {
            main: '#ff3742', // 错误红
            light: '#ff5252',
            dark: '#c62828',
        },
        background: {
            default: '#f5f5f5', // 主内容区域背景
            paper: '#ffffff',
        },
        text: {
            primary: '#2f3542',
            secondary: '#57606f',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#2f3542',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#2f3542',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#2f3542',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#2f3542',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#2f3542',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            color: '#2f3542',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%)',
                    boxShadow: '0 2px 10px rgba(255, 105, 0, 0.3)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '0 0 12px 12px', // 只有底部圆角
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #f1f2f6',
                    transition: 'all 0.3s ease',
                    margin: '8px 0', // 增加垂直间距
                    '&:hover': {
                        boxShadow: '0 8px 30px rgba(255, 105, 0, 0.15)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 16px',
                },
                contained: {
                    background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%)',
                    boxShadow: '0 4px 15px rgba(255, 105, 0, 0.3)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #e55100 0%, #ff6900 100%)',
                        boxShadow: '0 6px 20px rgba(255, 105, 0, 0.4)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    fontWeight: 500,
                },
                colorPrimary: {
                    background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%)',
                    color: '#ffffff',
                },
                colorSecondary: {
                    background: 'linear-gradient(135deg, #ff4757 0%, #ff6b7a 100%)',
                    color: '#ffffff',
                },
                colorSuccess: {
                    background: 'linear-gradient(135deg, #2ed573 0%, #7bed9f 100%)',
                    color: '#ffffff',
                },
            },
        },

        MuiTableHead: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%) !important',
                    '& .MuiTableCell-head': {
                        background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%) !important',
                        color: '#ffffff !important',
                        fontWeight: '600 !important',
                        fontSize: '0.875rem !important',
                        padding: '16px !important',
                        whiteSpace: 'nowrap',
                        overflow: 'visible',
                        textOverflow: 'unset',
                    },
                    '& .RaDatagrid-headerCell': {
                        background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%) !important',
                        color: '#ffffff !important',
                        fontWeight: '600 !important',
                    },
                    '& .column-header': {
                        background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%) !important',
                        color: '#ffffff !important',
                    },
                    '& th': {
                        background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%) !important',
                        color: '#ffffff !important',
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#fafafa',
                    },
                    '&:hover': {
                        backgroundColor: '#fff3e0 !important',
                    },
                },
                head: {
                    '& .MuiTableCell-head': {
                        color: '#ffffff !important',
                        fontWeight: '600 !important',
                        fontSize: '0.875rem !important',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%) !important',
                    color: '#ffffff !important',
                    fontWeight: '600 !important',
                    fontSize: '0.875rem !important',
                    padding: '16px !important',
                },
                root: {
                    borderBottom: '1px solid #e0e0e0',
                    padding: '12px 16px',
                    '&.MuiTableCell-head': {
                        background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%) !important',
                        color: '#ffffff !important',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&.Mui-focused fieldset': {
                            borderColor: '#ff6900',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#ff6900',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                    },
                    '& .Mui-selected': {
                        color: '#ff6900 !important',
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#ff6900',
                        height: 3,
                        borderRadius: '3px 3px 0 0',
                    },
                },
            },
        },
        // 侧边栏样式
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: 'linear-gradient(180deg, #fff3e0 0%, #ffe0b2 100%)', // 浅橙色渐变背景
                    borderRight: '2px solid #ff6900',
                    '& .RaSidebar-fixed': {
                        background: 'transparent',
                    },
                },
            },
        },
        // 主内容区域样式
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f8f9fa', // 浅灰色背景
                    minHeight: 'calc(100vh - 48px)', // 减去新的应用栏高度
                    padding: '20px', // 稍微减少内边距
                    marginTop: '48px', // 为新的固定应用栏留出空间
                },
            },
        },
        // 侧边栏菜单项样式
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.RaMenuItemLink-active': {
                        backgroundColor: '#ff6900 !important',
                        borderRadius: '8px',
                        margin: '4px 8px',
                        '& .MuiListItemIcon-root': {
                            color: '#ffffff',
                        },
                        '& .MuiListItemText-primary': {
                            color: '#ffffff',
                            fontWeight: 600,
                        },
                    },
                    '&:hover': {
                        backgroundColor: '#ffe0b2',
                        borderRadius: '8px',
                        margin: '4px 8px',
                    },
                    borderRadius: '8px',
                    margin: '2px 8px',
                },
            },
        },
        // 主内容卡片样式增强
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '0 0 12px 12px', // 只有底部圆角
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    margin: '8px 0', // 增加垂直间距
                    backgroundColor: '#ffffff', // 确保卡片是白色背景
                    border: '1px solid #e0e0e0',
                },
            },
        },
    },
});