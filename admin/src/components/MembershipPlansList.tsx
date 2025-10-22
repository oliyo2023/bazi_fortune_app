import React, { useState, useEffect } from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton,
  DeleteWithConfirmButton,
  useTranslate,
  useNotify,
  useRefresh,
} from 'react-admin';
import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControl,
  InputLabel,
  Input,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { MembershipPlan } from '../types';
import { dataProvider } from '../dataProvider';

const MembershipPlansList = (props: any) => {
  const translate = useTranslate();
  const notify = useNotify();
  const refresh = useRefresh();

  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'CNY',
    duration: '',
    durationUnit: 'month',
    features: '',
    isActive: true,
    sortOrder: 0,
  });

  const loadPlans = async () => {
    setLoading(true);
    try {
      const response = await dataProvider.getList('membership_plans', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'sortOrder', order: 'ASC' },
      });
      setPlans(response.data);
    } catch (error) {
      notify('Error loading membership plans', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleOpenDialog = (plan?: MembershipPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        description: plan.description || '',
        price: plan.price.toString(),
        currency: plan.currency,
        duration: plan.duration.toString(),
        durationUnit: plan.durationUnit,
        features: Array.isArray(plan.features) ? plan.features.join(', ') : '',
        isActive: plan.isActive,
        sortOrder: plan.sortOrder,
      });
    } else {
      setEditingPlan(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        currency: 'CNY',
        duration: '',
        durationUnit: 'month',
        features: '',
        isActive: true,
        sortOrder: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPlan(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      currency: 'CNY',
      duration: '',
      durationUnit: 'month',
      features: '',
      isActive: true,
      sortOrder: 0,
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSavePlan = async () => {
    try {
      const features = formData.features
        .split(',')
        .map(feature => feature.trim())
        .filter(feature => feature !== '');

      const planData = {
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        features,
      };

      if (editingPlan) {
        await dataProvider.update('membership_plans', {
          id: editingPlan.id,
          data: planData,
        });
        notify('Membership plan updated successfully', { type: 'success' });
      } else {
        await dataProvider.create('membership_plans', { data: planData });
        notify('Membership plan created successfully', { type: 'success' });
      }

      handleCloseDialog();
      refresh();
    } catch (error) {
      notify('Error saving membership plan', { type: 'error' });
    }
  };

  const handleDeletePlan = async (id: string) => {
    try {
      await dataProvider.delete('membership_plans', { id });
      notify('Membership plan deleted successfully', { type: 'success' });
      refresh();
    } catch (error) {
      notify('Error deleting membership plan', { type: 'error' });
    }
  };

  const handleToggleActive = async (plan: MembershipPlan) => {
    try {
      await dataProvider.update('membership_plans', {
        id: plan.id,
        data: { isActive: !plan.isActive },
      });
      notify(`Membership plan ${plan.isActive ? 'deactivated' : 'activated'} successfully`, { type: 'success' });
      refresh();
    } catch (error) {
      notify('Error updating membership plan', { type: 'error' });
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: translate('resources.membership_plans.fields.name'),
      sortable: true,
    },
    {
      field: 'description',
      headerName: translate('resources.membership_plans.fields.description'),
      sortable: false,
      render: (record: MembershipPlan) => (
        <Tooltip title={record.description} placement="top-start">
          <Typography variant="body2" noWrap>
            {record.description ? (record.description.length > 50 
              ? `${record.description.substring(0, 50)}...` 
              : record.description) : '-'}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'price',
      headerName: translate('resources.membership_plans.fields.price'),
      sortable: true,
      render: (record: MembershipPlan) => (
        <Typography variant="body2">
          {record.currency} {record.price.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: 'duration',
      headerName: translate('resources.membership_plans.fields.duration'),
      sortable: true,
      render: (record: MembershipPlan) => (
        <Typography variant="body2">
          {record.duration} {translate(`resources.membership_plans.duration_units.${record.durationUnit}`)}
        </Typography>
      ),
    },
    {
      field: 'features',
      headerName: translate('resources.membership_plans.fields.features'),
      sortable: false,
      render: (record: MembershipPlan) => (
        <Box sx={{ maxWidth: 200 }}>
          {Array.isArray(record.features) && record.features.length > 0 ? (
            record.features.slice(0, 2).map((feature, index) => (
              <Chip key={index} label={feature} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
            ))
          ) : (
            <Typography variant="body2">-</Typography>
          )}
          {Array.isArray(record.features) && record.features.length > 2 && (
            <Typography variant="caption" color="textSecondary">
              +{record.features.length - 2} more
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: 'isActive',
      headerName: translate('resources.membership_plans.fields.isActive'),
      sortable: true,
      render: (record: MembershipPlan) => (
        <Switch
          checked={record.isActive}
          onChange={() => handleToggleActive(record)}
          color="primary"
        />
      ),
    },
    {
      field: 'sortOrder',
      headerName: translate('resources.membership_plans.fields.sortOrder'),
      sortable: true,
    },
    {
      field: 'actions',
      headerName: translate('resources.common.actions'),
      sortable: false,
      render: (record: MembershipPlan) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <EditButton
            onClick={() => handleOpenDialog(record)}
            label={translate('resources.common.edit')}
          />
          <DeleteWithConfirmButton
            confirmContent={translate('resources.membership_plans.delete_confirm')}
            confirmTitle={translate('resources.membership_plans.delete_title')}
            label={translate('resources.common.delete')}
            onClick={() => handleDeletePlan(record.id)}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          {translate('resources.membership_plans.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          {translate('resources.membership_plans.create')}
        </Button>
      </Box>

      <Card>
        <CardContent>
          <List>
            <Datagrid
              data={plans}
              columns={columns}
              loading={loading}
              empty={
                <Typography variant="body2" align="center" sx={{ py: 5 }}>
                  {translate('resources.membership_plans.empty')}
                </Typography>
              }
            />
          </List>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPlan 
            ? translate('resources.membership_plans.edit') 
            : translate('resources.membership_plans.create')}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth margin="normal">
              <TextField
                label={translate('resources.membership_plans.fields.name')}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                fullWidth
                required
              />
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <TextField
                label={translate('resources.membership_plans.fields.description')}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                fullWidth
                multiline
                rows={3}
              />
            </FormControl>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <TextField
                  label={translate('resources.membership_plans.fields.price')}
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  type="number"
                  fullWidth
                  required
                />
              </FormControl>
              
              <FormControl sx={{ width: 120 }}>
                <TextField
                  label={translate('resources.membership_plans.fields.currency')}
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  select
                  fullWidth
                >
                  <option value="CNY">CNY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </TextField>
              </FormControl>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <TextField
                  label={translate('resources.membership_plans.fields.duration')}
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  type="number"
                  fullWidth
                  required
                />
              </FormControl>
              
              <FormControl sx={{ width: 120 }}>
                <TextField
                  label={translate('resources.membership_plans.fields.durationUnit')}
                  value={formData.durationUnit}
                  onChange={(e) => handleInputChange('durationUnit', e.target.value)}
                  select
                  fullWidth
                >
                  <option value="day">
                    {translate('resources.membership_plans.duration_units.day')}
                  </option>
                  <option value="month">
                    {translate('resources.membership_plans.duration_units.month')}
                  </option>
                  <option value="year">
                    {translate('resources.membership_plans.duration_units.year')}
                  </option>
                </TextField>
              </FormControl>
            </Box>
            
            <FormControl fullWidth margin="normal">
              <TextField
                label={translate('resources.membership_plans.fields.features')}
                value={formData.features}
                onChange={(e) => handleInputChange('features', e.target.value)}
                helperText={translate('resources.membership_plans.features_helper')}
                fullWidth
              />
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InputLabel sx={{ mr: 1 }}>
                  {translate('resources.membership_plans.fields.isActive')}
                </InputLabel>
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                />
              </Box>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <TextField
                label={translate('resources.membership_plans.fields.sortOrder')}
                value={formData.sortOrder}
                onChange={(e) => handleInputChange('sortOrder', e.target.value)}
                type="number"
                fullWidth
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {translate('resources.common.cancel')}
          </Button>
          <Button onClick={handleSavePlan} variant="contained">
            {translate('resources.common.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MembershipPlansList;