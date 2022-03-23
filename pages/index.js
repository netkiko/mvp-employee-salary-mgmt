import React, { useContext, useState } from 'react';
import { Typography, Table, Form } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { EmployeeDetailsContext } from '../contexts/EmployeeDetails';
import PageLayout from '../components/PageLayout';
import EditEmployeeModal from '../components/EditEmployeeModal';

const { Title, Text } = Typography;

const HomePage = () => {
    const EmployeeDetails = useContext(EmployeeDetailsContext);
    const { employeeList } = EmployeeDetails;

    // Local States
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmpData, setSelectedEmpData] = useState('');

    const formatCurrencyUSD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const handleEditItem = (data) => {
        setSelectedEmpData(data);
        setShowEditModal(true);
    };

    const columns = [
        {
            title: 'Id',
            width: '15%',
            dataIndex: 'emplid',
            key: 'emplid',
            sorter: true,
            align: 'center',
        },
        {
            title: 'Login',
            width: '15%',
            dataIndex: 'login',
            key: 'login',
            align: 'center',
        },
        {
            title: 'Name',
            width: '35%',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Salary',
            width: '20%',
            dataIndex: 'salary',
            key: 'salary',
            align: 'right',
            render: (salary) => formatCurrencyUSD.format(salary),
        },
        {
            title: 'Action',
            width: '15%',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render: (row) => (
                <>
                    <EditOutlined onClick={() => handleEditItem(row)} style={{ width: 30 }} />
                    <DeleteOutlined onClick={() => {}} style={{ width: 30 }} />
                </>
            ),
        },
    ];

    return (
        <PageLayout>
            <Title>Employee List</Title>
            <Table columns={columns} dataSource={employeeList} />
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
