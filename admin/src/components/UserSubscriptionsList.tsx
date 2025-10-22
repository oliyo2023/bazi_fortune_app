import React, { useState, useEffect } from 'react';
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  DeleteWithConfirmButton,
  useTranslate,
  useNotify,
  useRefresh,
  Filter,
  SearchInput,
} from 'react-admin';
import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { UserSubscription } from '../types';
import { dataProvider } from '../dataProvider';

const UserSubscriptionsList = (props: any) => {
  const translate = useTranslate();
  const notify = useNotify();
  const refresh = useRefresh();

  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', userId: '' });
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<UserSubscription | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const loadSubscriptions = async () => {
    setLoading(true);
    try {
      const params: any = {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'createdAt', order: 'DESC' },
      };

      if (filter.status) {
        params.filter = { ...params.filter, status: filter.status };
      }

      if (filter.userId) {
        params.filter = { ...params.filter, userId: filter.userId };
      }

      const response = await dataProvider.getList('user_subscriptions', params);
      setSubscriptions(response.data);
    } catch (error) {
      notify('Error loading user subscriptions', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, [filter]);

  const handleFilterChange = (field: string, value: string) => {
    setFilter(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShowDetails = (subscription: UserSubscription) => {
    setSelectedSubscription(subscription);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedSubscription(null);
  };

  const handleCancelSubscription = async (subscription: UserSubscription) => {
    try {
      await dataProvider.update('user_subscriptions', {
        id: subscription.id,
        data: { status: 'cancelled' },
      });
      notify('Subscription cancelled successfully', { type: 'success' });
      refresh();
    } catch (error) {
      notify('Error cancelling subscription', { type: 'error' });
    }
  };

  const handleRenewSubscription = async (subscription: UserSubscription) => {
    try {
      await dataProvider.update('user_subscriptions', {
        id: subscription.id,
        data: { status: 'active' },
      });
      notify('Subscription renewed successfully', { type: 'success' });
      refresh();
    } catch (error) {
      notify('Error renewing subscription', { type: 'error' });
    }
  };

  const getStatusChip = (status: string) => {
    let color = 'default';
    let label = status;

    switch (status) {
      case 'active':
        color = 'success';
        label = translate('resources.user_subscriptions.status.active');
        break;
      case 'expired':
        color = 'error';
        label = translate('resources.user_subscriptions.status.expired');
        break;
      case 'cancelled':
        color = 'warning';
        label = translate('resources.user_subscriptions.status.cancelled');
        break;
      case 'pending':
        color = 'info';
        label = translate('resources.user_subscriptions.status.pending');
        break;
      default:
        color = 'default';
        label = status;
    }

    return <Chip label={label} color={color} size="small" />;
  };

  const getRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return translate('resources.user_subscriptions.expired');
    } else if (diffDays === 0) {
      return translate('resources.user_subscriptions.expires_today');
    } else if (diffDays === 1) {
      return translate('resources.user_subscriptions.expires_tomorrow');
    } else {
      return translate('resources.user_subscriptions.expires_in_days', { count: diffDays });
    }
  };

  const columns = [
    {
      field: 'userId',
      headerName: translate('resources.user_subscriptions.fields.userId'),
      sortable: true,
    },
    {
      field: 'planName',
      headerName: translate('resources.user_subscriptions.fields.planName'),
      sortable: true,
    },
    {
      field: 'status',
      headerName: translate('resources.user_subscriptions.fields.status'),
      sortable: true,
      render: (record: UserSubscription) => getStatusChip(record.status),
    },
    {
      field: 'startDate',
      headerName: translate('resources.user_subscriptions.fields.startDate'),
      sortable: true,
      render: (record: UserSubscription) => (
        <Typography variant="body2">
          {new Date(record.startDate).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'endDate',
      headerName: translate('resources.user_subscriptions.fields.endDate'),
      sortable: true,
      render: (record: UserSubscription) => (
        <Box>
          <Typography variant="body2">
            {new Date(record.endDate).toLocaleDateString()}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {getRemainingDays(record.endDate)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'autoRenewal',
      headerName: translate('resources.user_subscriptions.fields.autoRenewal'),
      sortable: true,
      render: (record: UserSubscription) => (
        <Chip
          label={record.autoRenewal 
            ? translate('resources.common.enabled') 
            : translate('resources.common.disabled')}
          color={record.autoRenewal ? 'primary' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'amount',
      headerName: translate('resources.user_subscriptions.fields.amount'),
      sortable: true,
      render: (record: UserSubscription) => (
        <Typography variant="body2">
          {record.currency} {record.amount.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: translate('resources.common.actions'),
      sortable: false,
      render: (record: UserSubscription) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ShowButton
            onClick={() => handleShowDetails(record)}
            label={translate('resources.common.show')}
          />
          {record.status === 'active' && (
            <DeleteWithConfirmButton
              confirmContent={translate('resources.user_subscriptions.cancel_confirm')}
              confirmTitle={translate('resources.user_subscriptions.cancel_title')}
              label={translate('resources.user_subscriptions.cancel')}
              onClick={() => handleCancelSubscription(record)}
              icon={<CancelIcon />}
            />
          )}
          {(record.status === 'expired' || record.status === 'cancelled') && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleRenewSubscription(record)}
              startIcon={<RefreshIcon />}
            >
              {translate('resources.user_subscriptions.renew')}
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
  const expiredSubscriptions = subscriptions.filter(s => s.status === 'expired');
  const cancelledSubscriptions = subscriptions.filter(s => s.status === 'cancelled');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          {translate('resources.user_subscriptions.title')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <SearchInput
            placeholder={translate('resources.user_subscriptions.search_user')}
            value={filter.userId}
            onChange={(value) => handleFilterChange('userId', value)}
            sx={{ minWidth: 200 }}
          />
          <Filter
            source="status"
            label={translate('resources.user_subscriptions.fields.status')}
            choices={[
              { id: 'active', name: translate('resources.user_subscriptions.status.active') },
              { id: 'expired', name: translate('resources.user_subscriptions.status.expired') },
              { id: 'cancelled', name: translate('resources.user_subscriptions.status.cancelled') },
              { id: 'pending', name: translate('resources.user_subscriptions.status.pending') },
            ]}
            value={filter.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab 
              label={translate('resources.user_subscriptions.tabs.active', { count: activeSubscriptions.length })} 
            />
            <Tab 
              label={translate('resources.user_subscriptions.tabs.expired', { count: expiredSubscriptions.length })} 
            />
            <Tab 
              label={translate('resources.user_subscriptions.tabs.cancelled', { count: cancelledSubscriptions.length })} 
            />
          </Tabs>
          
          <Box sx={{ mt: 2 }}>
            <List>
              <Datagrid
                data={
                  tabValue === 0 ? activeSubscriptions :
                  tabValue === 1 ? expiredSubscriptions :
                  cancelledSubscriptions
                }
                columns={columns}
                loading={loading}
                empty={
                  <Typography variant="body2" align="center" sx={{ py: 5 }}>
                    {translate('resources.user_subscriptions.empty')}
                  </Typography>
                }
              />
            </List>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {translate('resources.user_subscriptions.details_title')}
        </DialogTitle>
        <DialogContent>
          {selectedSubscription && (
            <Box sx={{ pt: 2 }}>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.user_subscriptions.fields.userId')}
                      </TableCell>
                      <TableCell>{selectedSubscription.userId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.user_subscriptions.fields.planName')}
                      </TableCell>
                      <TableCell>{selectedSubscription.planName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.user_subscriptions.fields.status')}
                      </TableCell>
                      <TableCell>{getStatusChip(selectedSubscription.status)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.user_subscriptions.fields.startDate')}
                      </TableCell>
                      <TableCell>
                        {new Date(selectedSubscription.startDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.user_subscriptions.fields.endDate')}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">
                            {new Date(selectedSubscription.endDate).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {getRemainingDays(selectedSubscription.endDate)}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.user_subscriptions.fields.autoRenewal')}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={selectedSubscription.autoRenewal 
                            ? translate('resources.common.enabled') 
                            : translate('resources.common.disabled')}
                          color={selectedSubscription.autoRenewal ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.user_subscriptions.fields.amount')}
                      </TableCell>
                      <TableCell>
                        {selectedSubscription.currency} {selectedSubscription.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.user_subscriptions.fields.createdAt')}
                      </TableCell>
                      <TableCell>
                        {new Date(selectedSubscription.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog}>
            {translate('resources.common.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserSubscriptionsList;