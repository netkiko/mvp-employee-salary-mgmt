import React, { useContext, useEffect, useState } from 'react';
import { Alert, Modal, Button, Input, Space, Typography } from 'antd';
const { Title, Text } = Typography;

import { EmployeeDetailsContext } from '../contexts/EmployeeDetails';
import { putEmployeeById } from '../api/putEmployeeById';

const EditEmployeeModal = ({ selectedEmpData, showEditModal, setShowEditModal }) => {
    console.log('selectedEmpData', selectedEmpData);
    const EmployeeDetails = useContext(EmployeeDetailsContext);
    const {
        EMPLOYEE_LIST,
        EMPLOYEE_LIST_HEADERS: columnHeaders,
        employeeList,
        updateEmployeeList,
    } = EmployeeDetails;

    // Local states
    const [loading, setLoading] = useState(false);
    const [emplid, setEmplid] = useState(selectedEmpData?.emplid);
    const [login, setLogin] = useState(selectedEmpData?.login);
    const [name, setName] = useState(selectedEmpData?.name);
    const [salary, setSalary] = useState(selectedEmpData?.salary);
    const [loginError, setLoginError] = useState('');
    const [nameError, setNameError] = useState('');
    const [salaryError, setSalaryError] = useState('');

    // useEffect(()=> {
    //     (async()=> {

    //     })()
    // }, [])
    const handleCancel = () => setShowEditModal(false);

    const handleUpdateEmpDetails = async () => {
        let formHasError = false;
        if (login.length === 0) {
            setLoginError('Login is required!');
            formHasError = true;
        }
        if (name.length === 0) {
            setNameError('Name is required!');
            formHasError = true;
        }
        if (salary.length === 0 || salary <= 0.0) {
            setSalaryError('Salary is required!');
            formHasError = true;
        }

        if (!formHasError) {
            const updateResp = await putEmployeeById({ emplid, login, name, salary });
            console.log(updateResp);
        }
    };

    return (
        <>
            <Modal
                visible={showEditModal}
                title="Edit Employee Details"
                // onOk={handleUpdateEmpDetails}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleUpdateEmpDetails}
                    >
                        Save
                    </Button>,
                ]}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                    <Title level={4}>Employee Id: {emplid}</Title>
                    <div style={{ marginTop: 10 }}>
                        <Text>Name:</Text>
                        <Input
                            id="name"
                            name="name"
                            value={name}
                            allowClear
                            onChange={(e) => setName(e.target.value)}
                            status={nameError ? 'error' : ''}
                        />
                        {nameError && <Text type="danger">{nameError}</Text>}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Text>Login:</Text>
                        <Input
                            id="login"
                            name="login"
                            value={login}
                            allowClear
                            onChange={(e) => setLogin(e.target.value)}
                            status={loginError ? 'error' : ''}
                        />
                        {loginError && <Text type="danger">{loginError}</Text>}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Text>Salary:</Text>
                        <Input
                            id="salary"
                            name="salary"
                            value={salary}
                            allowClear
                            onChange={(e) => setSalary(e.target.value)}
                            status={salaryError ? 'error' : ''}
                        />
                        {salaryError && <Text type="danger">{salaryError}</Text>}
                    </div>
                </Space>
            </Modal>
        </>
    );
};

export default EditEmployeeModal;
