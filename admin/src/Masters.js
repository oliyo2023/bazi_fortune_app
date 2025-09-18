import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    NumberField,
    Edit,
    TextInput,
    BooleanInput,
    NumberInput,
    Create,
    ReferenceInput,
    SelectInput,
    ImageField,
    ImageInput,
    DateField,
    Show,
    SimpleShowLayout,
    TabbedForm,
    FormTab,
    ArrayInput,
    SimpleFormIterator,
    FunctionField,
    Filter,
    SearchInput,
    TopToolbar,
    ExportButton,
    CreateButton,
    useRecordContext,
} from 'react-admin';
import { Card, CardContent, Typography, Avatar, Box, Grid, Rating } from '@mui/material';
import { 
    Person,
} from '@mui/icons-material';

// 筛选器组件
const MasterFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" placeholder="🔍 搜索大师姓名或专长" alwaysOn />
        <SelectInput
            source="gender"
            label="👤 性别"
            choices={[
                { id: '', name: '全部性别' },
                { id: 'male', name: '👨 男' },
                { id: 'female', name: '👩 女' },
                { id: 'other', name: '🏳️‍⚧️ 其他' },
            ]}
            emptyText="全部性别"
            emptyValue=""
        />
        <SelectInput
            source="specialty"
            label="🔮 专长领域"
            choices={[
                { id: '', name: '全部专长' },
                { id: '八字算命', name: '🔮 八字算命' },
                { id: '塔罗占卜', name: '🃏 塔罗占卜' },
                { id: '风水布局', name: '🏠 风水布局' },
                { id: '姓名学', name: '📝 姓名学' },
                { id: '手相面相', name: '👋 手相面相' },
                { id: '星座运势', name: '⭐ 星座运势' },
            ]}
            emptyText="全部专长"
            emptyValue=""
        />
        <BooleanInput source="is_verified" label="✅ 仅显示已认证" />
        <BooleanInput source="is_online" label="🟢 仅显示在线" />
        <SelectInput
            source="price_range"
            label="💰 价格区间"
            choices={[
                { id: '', name: '全部价格' },
                { id: 'low', name: '💰 ¥0-50' },
                { id: 'medium', name: '💰 ¥50-100' },
                { id: 'high', name: '💰 ¥100+' },
            ]}
            emptyText="全部价格"
            emptyValue=""
        />
    </Filter>
);

// 自定义列表操作栏
const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);



// 大师列表组件
export const MasterList = (props) => (
    <List
        {...props}
        filters={<MasterFilter />}
        actions={<ListActions />}
        perPage={25}
        sort={{ field: 'created_at', order: 'DESC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <ImageField source="avatar_url" label="头像" />
            <TextField source="name" label="👤 姓名" />
            <FunctionField
                label="👥 性别/年龄"
                render={record => {
                    const genderIcon = record.gender === 'male' ? '👨' : record.gender === 'female' ? '👩' : '🏳️‍⚧️';
                    const gender = record.gender === 'male' ? '男' : record.gender === 'female' ? '女' : '其他';
                    return `${genderIcon} ${gender} / ${record.age || '未知'}岁`;
                }}
            />
            <TextField source="specialty" label="🔮 专长" />
            <NumberField 
                source="price_per_msg" 
                label="💰 价格/条" 
                options={{ style: 'currency', currency: 'CNY' }} 
            />
            <FunctionField
                label="⭐ 评分"
                render={record => (
                    <Box display="flex" alignItems="center">
                        <Rating value={record.rating || 0} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            {record.rating || 0}
                        </Typography>
                    </Box>
                )}
            />
            <NumberField source="total_consultations" label="📊 咨询数" />
            <BooleanField source="is_verified" label="✅ 已认证" />
            <BooleanField source="is_online" label="🟢 在线" />
            <DateField source="created_at" label="📅 创建时间" showTime />
        </Datagrid>
    </List>
);

// 大师详情显示组件
export const MasterShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Avatar
                                    src={useRecordContext()?.avatar_url}
                                    sx={{ width: 120, height: 120, mb: 2 }}
                                >
                                    <Person sx={{ fontSize: 60 }} />
                                </Avatar>
                                <TextField source="name" label="👤 姓名" />
                                <TextField source="specialty" label="🔮 专长" />
                                <Box display="flex" alignItems="center" mt={1}>
                                    <Rating value={useRecordContext()?.rating || 0} readOnly />
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        {useRecordContext()?.rating || 0} 分
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={8}>
                    <TextField source="bio" label="📝 个人简介" />
                    <NumberField 
                        source="price_per_msg" 
                        label="💰 价格/条" 
                        options={{ style: 'currency', currency: 'CNY' }} 
                    />
                    <NumberField source="experience_years" label="🎓 从业年限" />
                    <NumberField source="total_consultations" label="📊 总咨询数" />
                    <BooleanField source="is_verified" label="✅ 已认证" />
                    <BooleanField source="is_online" label="🟢 在线状态" />
                    <TextField source="phone" label="📱 电话" />
                    <TextField source="wechat" label="💬 微信" />
                    <TextField source="location" label="📍 所在地" />
                    <DateField source="last_active_at" label="⏰ 最后活跃时间" showTime />
                    <DateField source="created_at" label="📅 创建时间" showTime />
                </Grid>
            </Grid>
        </SimpleShowLayout>
    </Show>
);

// 大师编辑组件
export const MasterEdit = (props) => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="👤 基本信息">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <ReferenceInput source="user_id" reference="users" label="关联用户">
                            <SelectInput optionText="id" />
                        </ReferenceInput>
                        <TextInput source="name" label="👤 姓名" fullWidth required />
                        <SelectInput
                            source="gender"
                            label="👥 性别"
                            choices={[
                                { id: 'male', name: '👨 男' },
                                { id: 'female', name: '👩 女' },
                                { id: 'other', name: '🏳️‍⚧️ 其他' },
                            ]}
                            fullWidth
                        />
                        <NumberInput 
                            source="age" 
                            label="🎂 年龄" 
                            min={18} 
                            max={100} 
                            fullWidth 
                        />
                        <TextInput source="specialty" label="🔮 专长" fullWidth />
                        <NumberInput 
                            source="experience_years" 
                            label="🎓 从业年限" 
                            min={0} 
                            fullWidth 
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <ImageInput source="avatar_url" label="头像" accept="image/*">
                            <ImageField source="src" title="title" />
                        </ImageInput>
                        <TextInput 
                            source="bio" 
                            label="📝 个人简介" 
                            multiline 
                            rows={4} 
                            fullWidth 
                        />
                        <TextInput source="location" label="📍 所在地" fullWidth />
                        <TextInput source="phone" label="📱 电话" fullWidth />
                        <TextInput source="wechat" label="💬 微信" fullWidth />
                    </Grid>
                </Grid>
            </FormTab>
            
            <FormTab label="💼 业务设置">
                <NumberInput 
                    source="price_per_msg" 
                    label="💰 价格/条" 
                    min={0} 
                    step={0.01} 
                    fullWidth 
                />
                <BooleanInput source="is_verified" label="✅ 已认证" />
                <BooleanInput source="is_online" label="🟢 在线状态" />
                <TextInput source="invite_code" label="🎫 邀请码" fullWidth />
                <NumberInput 
                    source="rating" 
                    label="⭐ 评分" 
                    min={0} 
                    max={5} 
                    step={0.1} 
                    fullWidth 
                />
                <NumberInput 
                    source="total_consultations" 
                    label="📊 总咨询数" 
                    min={0} 
                    fullWidth 
                />
            </FormTab>
            
            <FormTab label="🏷️ 专长标签">
                <ArrayInput source="tags" label="🏷️ 专长标签">
                    <SimpleFormIterator>
                        <TextInput source="" label="🔖 标签" />
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);

// 大师创建组件
export const MasterCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="👤 基本信息">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <ReferenceInput 
                            source="user_id" 
                            reference="users" 
                            label="选择用户" 
                            isRequired
                        >
                            <SelectInput optionText="id" />
                        </ReferenceInput>
                        <TextInput source="name" label="👤 姓名" fullWidth required />
                        <SelectInput
                            source="gender"
                            label="👥 性别"
                            choices={[
                                { id: 'male', name: '👨 男' },
                                { id: 'female', name: '👩 女' },
                                { id: 'other', name: '🏳️‍⚧️ 其他' },
                            ]}
                            fullWidth
                            required
                        />
                        <NumberInput 
                            source="age" 
                            label="🎂 年龄" 
                            min={18} 
                            max={100} 
                            fullWidth 
                            required
                        />
                        <TextInput source="specialty" label="🔮 专长" fullWidth required />
                        <NumberInput 
                            source="experience_years" 
                            label="🎓 从业年限" 
                            min={0} 
                            fullWidth 
                            defaultValue={0}
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <ImageInput source="avatar_url" label="头像" accept="image/*">
                            <ImageField source="src" title="title" />
                        </ImageInput>
                        <TextInput 
                            source="bio" 
                            label="📝 个人简介" 
                            multiline 
                            rows={4} 
                            fullWidth 
                            required
                        />
                        <TextInput source="location" label="📍 所在地" fullWidth />
                        <TextInput source="phone" label="📱 电话" fullWidth />
                        <TextInput source="wechat" label="💬 微信" fullWidth />
                    </Grid>
                </Grid>
            </FormTab>
            
            <FormTab label="💼 业务设置">
                <NumberInput 
                    source="price_per_msg" 
                    label="💰 价格/条" 
                    min={0} 
                    step={0.01} 
                    fullWidth 
                    defaultValue={50.00}
                    required
                />
                <BooleanInput source="is_verified" label="✅ 已认证" defaultValue={false} />
                <BooleanInput source="is_online" label="🟢 在线状态" defaultValue={true} />
                <TextInput source="invite_code" label="🎫 邀请码" fullWidth />
                <NumberInput 
                    source="rating" 
                    label="⭐ 初始评分" 
                    min={0} 
                    max={5} 
                    step={0.1} 
                    fullWidth 
                    defaultValue={5.0}
                />
                <NumberInput 
                    source="total_consultations" 
                    label="📊 总咨询数" 
                    min={0} 
                    fullWidth 
                    defaultValue={0}
                />
            </FormTab>
            
            <FormTab label="🏷️ 专长标签">
                <ArrayInput source="tags" label="专长标签">
                    <SimpleFormIterator>
                        <TextInput source="" label="标签" />
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </Create>
);