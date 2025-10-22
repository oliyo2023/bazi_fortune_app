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
    Filter,
    SearchInput,
    TopToolbar,
    ExportButton,
    FunctionField,
    useRecordContext,
    ReferenceField,

    BooleanField,
} from 'react-admin';
import { Card, CardContent, Typography, Box, Grid, Chip } from '@mui/material';
import { Psychology, Timeline, Star } from '@mui/icons-material';

// 八字数据筛选器
const BaziFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" placeholder="🔍 搜索用户ID或八字信息" alwaysOn />
    </Filter>
);

// 自定义列表操作栏
const ListActions = () => (
    <TopToolbar>
        <ExportButton />
    </TopToolbar>
);

// 八字信息显示组件
const BaziInfo = () => {
    const record = useRecordContext();
    if (!record || !record.bazi_result) return null;

    const result = typeof record.bazi_result === 'string' 
        ? JSON.parse(record.bazi_result) 
        : record.bazi_result;

    return (
        <Box>
            <Typography variant="body2" component="div">
                <strong>🔮 八字:</strong> {result.year_pillar} {result.month_pillar} {result.day_pillar} {result.hour_pillar}
            </Typography>
            <Typography variant="body2" component="div">
                <strong>🐉 生肖:</strong> {result.zodiac} | <strong>🌟 纳音:</strong> {result.nayin}
            </Typography>
        </Box>
    );
};

// 五行分析组件
const FiveElementsAnalysis = () => {
    const record = useRecordContext();
    if (!record || !record.bazi_result) return null;

    const result = typeof record.bazi_result === 'string' 
        ? JSON.parse(record.bazi_result) 
        : record.bazi_result;

    const elements = result.five_elements || {};
    const colors = {
        '木': '#4caf50',
        '火': '#f44336', 
        '土': '#ff9800',
        '金': '#ffc107',
        '水': '#2196f3'
    };

    return (
        <Box display="flex" gap={1} flexWrap="wrap">
            {Object.entries(elements).map(([element, count]) => (
                <Chip
                    key={element}
                    label={`${element}: ${count}`}
                    size="small"
                    sx={{ 
                        backgroundColor: colors[element] || '#grey',
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                />
            ))}
        </Box>
    );
};

// 八字数据列表组件
export const BaziDataList = (props) => (
    <List
        {...props}
        filters={<BaziFilter />}
        actions={<ListActions />}
        perPage={25}
        sort={{ field: 'created_at', order: 'DESC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <ReferenceField source="user_id" reference="users" label="👤 用户">
                <TextField source="id" />
            </ReferenceField>
            <FunctionField
                label="🔮 八字信息"
                render={record => <BaziInfo />}
            />
            <FunctionField
                label="🌟 五行分析"
                render={record => <FiveElementsAnalysis />}
            />
            <BooleanField source="has_ai_analysis" label="🤖 AI分析" />
            <DateField source="created_at" label="📅 创建时间" showTime />
        </Datagrid>
    </List>
);

// 八字数据详情显示组件
export const BaziDataShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    基本信息
                                </Typography>
                                <ReferenceField source="user_id" reference="users" label="👤 用户ID">
                                    <TextField source="id" />
                                </ReferenceField>
                                <DateField source="birth_date" label="🎂 出生日期" />
                                <TextField source="birth_time" label="⏰ 出生时间" />
                                <TextField source="birth_location" label="📍 出生地点" />
                                <TextField source="gender" label="👥 性别" />
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    八字排盘
                                </Typography>
                                <FunctionField
                                    label="🔮 完整八字信息"
                                    render={record => <BaziInfo />}
                                />
                                <FunctionField
                                    label="🌟 五行分布"
                                    render={record => <FiveElementsAnalysis />}
                                />
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Box mb={3}>
                                <Typography variant="h6" gutterBottom>
                                    <Star sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    AI分析结果
                                </Typography>
                                <BooleanField source="has_ai_analysis" label="🤖 是否有AI分析" />
                                <TextField source="ai_analysis" label="📝 AI分析内容" multiline />
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </SimpleShowLayout>
    </Show>
);

// 八字数据编辑组件
export const BaziDataEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="birth_location" label="📍 出生地点" fullWidth />
            <TextInput source="ai_analysis" label="📝 AI分析内容" multiline rows={6} fullWidth />
        </SimpleForm>
    </Edit>
);