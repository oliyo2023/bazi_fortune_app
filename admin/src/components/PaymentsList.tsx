import React, { useState, useEffect } from 'react';
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  Filter,
  SearchInput,
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
  Receipt as ReceiptIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { Payment } from '../types';
import { dataProvider } from '../dataProvider';

const PaymentsList = (props: any) => {
  const translate = useTranslate();
  const notify = useNotify();
  const refresh = useRefresh();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', userId: '', paymentMethod: '' });
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const loadPayments = async () => {
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

      if (filter.paymentMethod) {
        params.filter = { ...params.filter, paymentMethod: filter.paymentMethod };
      }

      const response = await dataProvider.getList('payments', params);
      setPayments(response.data);
    } catch (error) {
      notify('Error loading payments', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, [filter]);

  const handleFilterChange = (field: string, value: string) => {
    setFilter(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShowDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedPayment(null);
  };

  const handleProcessRefund = async (payment: Payment) => {
    try {
      await dataProvider.update('payments', {
        id: payment.id,
        data: { status: 'refunded' },
      });
      notify('Payment refunded successfully', { type: 'success' });
      refresh();
    } catch (error) {
      notify('Error processing refund', { type: 'error' });
    }
  };

  const getStatusChip = (status: string) => {
    let color = 'default';
    let label = status;
    let icon = null;

    switch (status) {
      case 'completed':
        color = 'success';
        label = translate('resources.payments.status.completed');
        icon = <CheckCircleIcon fontSize="small" />;
        break;
      case 'pending':
        color = 'warning';
        label = translate('resources.payments.status.pending');
        icon = <AccountBalanceIcon fontSize="small" />;
        break;
      case 'failed':
        color = 'error';
        label = translate('resources.payments.status.failed');
        icon = <ErrorIcon fontSize="small" />;
        break;
      case 'refunded':
        color = 'info';
        label = translate('resources.payments.status.refunded');
        icon = <RefreshIcon fontSize="small" />;
        break;
      default:
        color = 'default';
        label = status;
    }

    return (
      <Chip
        icon={icon}
        label={label}
        color={color}
        size="small"
      />
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'stripe':
        return <CreditCardIcon />;
      case 'paypal':
        return <ReceiptIcon />;
      case 'alipay':
        return <AccountBalanceIcon />;
      case 'wechat':
        return <AccountBalanceIcon />;
      default:
        return <ReceiptIcon />;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'stripe':
        return translate('resources.payments.methods.stripe');
      case 'paypal':
        return translate('resources.payments.methods.paypal');
      case 'alipay':
        return translate('resources.payments.methods.alipay');
      case 'wechat':
        return translate('resources.payments.methods.wechat');
      default:
        return method;
    }
  };

  const columns = [
    {
      field: 'transactionId',
      headerName: translate('resources.payments.fields.transactionId'),
      sortable: true,
    },
    {
      field: 'userId',
      headerName: translate('resources.payments.fields.userId'),
      sortable: true,
    },
    {
      field: 'orderId',
      headerName: translate('resources.payments.fields.orderId'),
      sortable: true,
    },
    {
      field: 'paymentMethod',
      headerName: translate('resources.payments.fields.paymentMethod'),
      sortable: true,
      render: (record: Payment) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getPaymentMethodIcon(record.paymentMethod)}
          <Typography variant="body2" sx={{ ml: 1 }}>
            {getPaymentMethodLabel(record.paymentMethod)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'amount',
      headerName: translate('resources.payments.fields.amount'),
      sortable: true,
      render: (record: Payment) => (
        <Typography variant="body2">
          {record.currency} {record.amount.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: translate('resources.payments.fields.status'),
      sortable: true,
      render: (record: Payment) => getStatusChip(record.status),
    },
    {
      field: 'paymentDate',
      headerName: translate('resources.payments.fields.paymentDate'),
      sortable: true,
      render: (record: Payment) => (
        <Box>
          <Typography variant="body2">
            {record.paymentDate 
              ? new Date(record.paymentDate).toLocaleDateString() 
              : '-'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'createdAt',
      headerName: translate('resources.payments.fields.createdAt'),
      sortable: true,
      render: (record: Payment) => (
        <Typography variant="body2">
          {new Date(record.createdAt).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: translate('resources.common.actions'),
      sortable: false,
      render: (record: Payment) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ShowButton
            onClick={() => handleShowDetails(record)}
            label={translate('resources.common.show')}
          />
          {record.status === 'completed' && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleProcessRefund(record)}
              startIcon={<RefreshIcon />}
            >
              {translate('resources.payments.refund')}
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const completedPayments = payments.filter(p => p.status === 'completed');
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const failedPayments = payments.filter(p => p.status === 'failed');
  const refundedPayments = payments.filter(p => p.status === 'refunded');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          {translate('resources.payments.title')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <SearchInput
            placeholder={translate('resources.payments.search_user')}
            value={filter.userId}
            onChange={(value) => handleFilterChange('userId', value)}
            sx={{ minWidth: 200 }}
          />
          <Filter
            source="status"
            label={translate('resources.payments.fields.status')}
            choices={[
              { id: 'completed', name: translate('resources.payments.status.completed') },
              { id: 'pending', name: translate('resources.payments.status.pending') },
              { id: 'failed', name: translate('resources.payments.status.failed') },
              { id: 'refunded', name: translate('resources.payments.status.refunded') },
            ]}
            value={filter.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
          <Filter
            source="paymentMethod"
            label={translate('resources.payments.fields.paymentMethod')}
            choices={[
              { id: 'stripe', name: translate('resources.payments.methods.stripe') },
              { id: 'paypal', name: translate('resources.payments.methods.paypal') },
              { id: 'alipay', name: translate('resources.payments.methods.alipay') },
              { id: 'wechat', name: translate('resources.payments.methods.wechat') },
            ]}
            value={filter.paymentMethod}
            onChange={(value) => handleFilterChange('paymentMethod', value)}
          />
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab 
              label={translate('resources.payments.tabs.completed', { count: completedPayments.length })} 
            />
            <Tab 
              label={translate('resources.payments.tabs.pending', { count: pendingPayments.length })} 
            />
            <Tab 
              label={translate('resources.payments.tabs.failed', { count: failedPayments.length })} 
            />
            <Tab 
              label={translate('resources.payments.tabs.refunded', { count: refundedPayments.length })} 
            />
          </Tabs>
          
          <Box sx={{ mt: 2 }}>
            <List>
              <Datagrid
                data={
                  tabValue === 0 ? completedPayments :
                  tabValue === 1 ? pendingPayments :
                  tabValue === 2 ? failedPayments :
                  refundedPayments
                }
                columns={columns}
                loading={loading}
                empty={
                  <Typography variant="body2" align="center" sx={{ py: 5 }}>
                    {translate('resources.payments.empty')}
                  </Typography>
                }
              />
            </List>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {translate('resources.payments.details_title')}
        </DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Box sx={{ pt: 2 }}>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.payments.fields.transactionId')}
                      </TableCell>
                      <TableCell>{selectedPayment.transactionId || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.payments.fields.userId')}
                      </TableCell>
                      <TableCell>{selectedPayment.userId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.payments.fields.orderId')}
                      </TableCell>
                      <TableCell>{selectedPayment.orderId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.payments.fields.paymentMethod')}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {getPaymentMethodLabel(selectedPayment.paymentMethod)}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.payments.fields.amount')}
                      </TableCell>
                      <TableCell>
                        {selectedPayment.currency} {selectedPayment.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.payments.fields.status')}
                      </TableCell>
                      <TableCell>{getStatusChip(selectedPayment.status)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.payments.fields.paymentDate')}
                      </TableCell>
                      <TableCell>
                        {selectedPayment.paymentDate 
                          ? new Date(selectedPayment.paymentDate).toLocaleString() 
                          : '-'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        {translate('resources.payments.fields.createdAt')}
                      </TableCell>
                      <TableCell>
                        {new Date(selectedPayment.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    {selectedPayment.gatewayResponse && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          {translate('resources.payments.fields.gatewayResponse')}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ maxWidth: 300, maxHeight: 100, overflow: 'auto' }}>
                            <Typography variant="body2" component="pre">
                              {JSON.stringify(selectedPayment.gatewayResponse, null, 2)}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
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

export default PaymentsList;