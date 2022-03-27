import React, { useContext, useState, useEffect } from 'react';
import { Typography, Table, Modal, Input, Space } from 'antd';

import { EditOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';

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
    const { employeeList, updateEmployeeList, pagination, setPagination, loading, setLoading } =
        EmployeeDetails;

    const sortDirections = ['ascend', 'descend', 'ascend'];

    // Local States
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmpData, setSelectedEmpData] = useState('');
    const [employeedata, setEmployeedata] = useState([]);
    const [minSalary, setMinSalary] = useState();
    const [maxSalary, setMaxSalary] = useState();
    const [minSalaryError, setMinSalaryError] = useState('');
    const [maxSalaryError, setMaxSalaryError] = useState('');

    const formatCurrencyUSD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleEditItem = (data) => {
        setSelectedEmpData(data);
        setShowEditModal(true);
    };

    const displaySuccessModal = (message) => {
        Modal.success({
            content: message,
        });
    };

    const handleDeleteItem = async (data) => {
        confirm({
            title: `Do you really want to delete Employee Id: ${data.emplid} and its details?`,
            icon: <ExclamationCircleOutlined />,
            // content: '',
            async onOk() {
                const deleteResp = await deleteEmployeeById(data);
                if (deleteResp?.status === REQUEST_STATUS.OK) {
                    updateEmployeeList(deleteResp.data);
                    deleteResp?.message && displaySuccessModal(deleteResp.message);
                }
            },
            onCancel() {},
        });
    };

    const onChange = async (pagination, filters, sorter, extra) => {
        console.log('pagination', pagination, 'filters', filters, 'sorter', sorter, 'extra', extra);
        setLoading(true);
        const employeeResp = await getEmployees({ pagination, filters, sorter });
        console.log(employeeResp);
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
            defaultSortOrder: 'ascend',
            sortDirections: sortDirections,
            sorter: true,
            // sorter: (a, b) => a.emplid.localeCompare(b.emplid),
        },
        {
            key: 'login',
            title: 'Login',
            width: '15%',
            dataIndex: 'login',
            align: 'center',
            sortDirections: sortDirections,
            sorter: true,
            // sorter: (a, b) => a.login.localeCompare(b.login),
        },
        {
            key: 'name',
            title: 'Name',
            width: '35%',
            dataIndex: 'name',
            align: 'center',
            sortDirections: sortDirections,
            sorter: true,
            // sorter: (a, b) => a.name.localeCompare(b.name),
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
            // sorter: (a, b) => a.salary.localeCompare(b.salary),
        },
        {
            key: 'action',
            title: 'Action',
            width: '15%',
            align: 'center',
            fixed: 'right',
            render: (row) => (
                <>
                    <EditOutlined onClick={() => handleEditItem(row)} style={{ width: 30 }} />
                    <DeleteOutlined onClick={() => handleDeleteItem(row)} style={{ width: 30 }} />
                </>
            ),
        },
    ];

    // useEffect(() => {
    //     const empData = [...employeeList];
    //     for (let i = 0; i < employeeList.length; i++) {
    //         empData[i].key = (i + 1).toString();
    //     }
    //     setEmployeedata(empData);
    // }, [employeeList]);

    return (
        <PageLayout>
            <Title>Employee List</Title>
            <Space direction="horizontal" style={{ width: '100%', marginTop: 10 }} size="small">
                <div>
                    <Text>Name:</Text>
                    <Input
                        type="number"
                        id="minSalary"
                        name="minSalary"
                        value={minSalary}
                        allowClear
                        onChange={(e) => setMinSalary(e.target.value)}
                        // onBlur={(e) => {
                        //     e.target.value.length === 0 && setMinSalaryError('');
                        // }}
                        status={minSalaryError ? 'error' : ''}
                    />
                    {minSalaryError && <Text type="danger">{minSalaryError}</Text>}
                </div>
                <div>
                    <Text>Name:</Text>
                    <Input
                        type="number"
                        id="maxSalary"
                        name="maxSalary"
                        value={maxSalary}
                        allowClear
                        onChange={(e) => setMaxSalary(e.target.value)}
                        onBlur={(e) => {
                            e.target.value.length === 0 && setMaxSalaryError('');
                        }}
                        status={maxSalaryError ? 'error' : ''}
                    />
                    {maxSalaryError && <Text type="danger">{maxSalaryError}</Text>}
                </div>
            </Space>
            <Table
                columns={columns}
                dataSource={employeeList}
                rowKey={(record) => record.emplid}
                pagination={pagination}
                onChange={onChange}
                loading={loading}
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
