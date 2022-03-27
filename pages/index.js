import React, { useContext, useState, useEffect } from 'react';
import { Typography, Table, Modal, InputNumber, Space, Button } from 'antd';

import {
    EditOutlined,
    ExclamationCircleOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';

// Pre-defined Components
import { deleteEmployeeById } from '../api/deleteEmployeeById';
import { EmployeeDetailsContext } from '../contexts/EmployeeDetails';
import { getEmployees } from '../api/getEmployees';
import { REQUEST_STATUS } from '../configs/constants';
import EditEmployeeModal from '../components/EditEmployeeModal';
import PageLayout from '../components/PageLayout';

const { Title, Text } = Typography;
const { confirm } = Modal;

const HomePage = () => {
    const EmployeeDetails = useContext(EmployeeDetailsContext);
    const {
        employeeList,
        updateEmployeeList,
        pagination,
        loading,
        sorter,
        setLoading,
        minSalary,
        setMinSalary,
        maxSalary,
        setMaxSalary,
    } = EmployeeDetails;

    const sortDirections = ['ascend', 'descend', 'ascend'];

    // Local States
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmpData, setSelectedEmpData] = useState('');

    const formatCurrencyUSD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleEditItem = (data) => {
        setSelectedEmpData(data);
        setShowEditModal(true);
    };

    const displaySuccessModal = (successMessage) => Modal.success({ title: successMessage });

    const displaySearchErrorModal = (searchError) => Modal.error({ title: searchError });

    const handleSalaryRangeSearch = async () => {
        let searchError = '';
        minSalary > maxSalary &&
            (searchError = 'Minimum Salary cannot be higher than Maximum Salary.');
        minSalary === 0 &&
            maxSalary === 0 &&
            (searchError = 'Minimum and Maximum Salaries cannot be both zero.');
        if (searchError.length > 0) {
            displaySearchErrorModal(searchError);
        } else {
            setLoading(true);
            const employeeResp = await getEmployees({
                pagination,
                filters: { minSalary, maxSalary },
                sorter,
            });
            if (employeeResp?.status === REQUEST_STATUS.OK && employeeResp?.data) {
                updateEmployeeList(employeeResp);
            }
            setLoading(false);
        }
    };

    const handleDeleteItem = async (data) => {
        confirm({
            title: `Do you really want to delete Employee Id: ${data.emplid} and its details?`,
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                const deleteResp = await deleteEmployeeById(data);
                if (deleteResp?.status === REQUEST_STATUS.OK) {
                    updateEmployeeList(deleteResp);
                    deleteResp?.message && displaySuccessModal(deleteResp.message);
                }
            },
            onCancel() {},
        });
    };

    const handleTableChange = async (pagination, filters, sorter, extra) => {
        console.log('pagination', pagination, 'filters', filters, 'sorter', sorter, 'extra', extra);
        setLoading(true);
        const employeeResp = await getEmployees({
            pagination,
            filters: { minSalary, maxSalary },
            sorter,
        });
        // console.log(employeeResp);
        if (employeeResp?.status === REQUEST_STATUS.OK && employeeResp?.data) {
            updateEmployeeList(employeeResp);
        }
        setLoading(false);
    };

    const columns = [
        {
            key: 'emplid',
            title: 'Id',
            width: '15%',
            dataIndex: 'emplid',
            align: 'center',
            // fixed: 'left',
            defaultSortOrder: 'ascend',
            sortDirections: sortDirections,
            sorter: true,
        },
        {
            key: 'login',
            title: 'Login',
            width: '15%',
            dataIndex: 'login',
            align: 'center',
            // fixed: 'left',
            sortDirections: sortDirections,
            sorter: true,
        },
        {
            key: 'name',
            title: 'Name',
            width: '35%',
            dataIndex: 'name',
            align: 'center',
            sortDirections: sortDirections,
            sorter: true,
        },
        {
            key: 'salary',
            title: 'Salary',
            width: '20%',
            dataIndex: 'salary',
            align: 'right',
            render: (salary) => formatCurrencyUSD.format(salary),
            sortDirections: sortDirections,
            sorter: true,
        },
        {
            key: 'action',
            title: 'Action',
            width: '15%',
            align: 'center',
            // fixed: 'right',
            render: (row) => (
                <>
                    <EditOutlined onClick={() => handleEditItem(row)} style={{ width: 30 }} />
                    <DeleteOutlined onClick={() => handleDeleteItem(row)} style={{ width: 30 }} />
                </>
            ),
        },
    ];

    return (
        <PageLayout>
            <Title level={3}>Employee List</Title>
            <Space
                direction="horizontal"
                style={{ width: '100%', marginTop: 10, display: 'flex', alignItems: 'center' }}
                size="small"
                wrap
            >
                <Text>Minimum Salary:</Text>
                <InputNumber
                    id="minSalary"
                    name="minSalary"
                    value={minSalary}
                    onChange={(value) => setMinSalary(value)}
                    min={0}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    autoFocus
                />
                &nbsp;&nbsp;-&nbsp;&nbsp;
                <Text>Maximum Salary:</Text>
                <InputNumber
                    id="maxSalary"
                    name="maxSalary"
                    value={maxSalary}
                    onChange={(value) => setMaxSalary(value)}
                    min={0}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
                <Button
                    key="search"
                    type="primary"
                    loading={loading}
                    onClick={handleSalaryRangeSearch}
                >
                    <SearchOutlined />
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={employeeList}
                rowKey={(record) => record.emplid}
                pagination={pagination}
                onChange={handleTableChange}
                loading={loading}
                scroll={{ x: 768 }}
                style={{ marginTop: 10 }}
            />
            {showEditModal && (
                <EditEmployeeModal
                    selectedEmpData={selectedEmpData}
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                />
            )}
        </PageLayout>
    );
};

export default HomePage;
