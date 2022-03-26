import React, { useContext, useEffect, useState } from 'react';
import { Alert, Modal, Button, Input, Space, Typography } from 'antd';
const { Title, Text } = Typography;

import { REQUEST_STATUS } from '../configs/constants';
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
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            console.log('updateResp', updateResp);
            if (updateResp?.status === REQUEST_STATUS.OK) {
                updateEmployeeList(updateResp.data);
                // console.log(updateResp);
            } else if (updateResp?.status === REQUEST_STATUS.FAILED) {
                if (updateResp?.message) setErrorMessage(updateResp?.message);
                if (updateResp?.loginError) setLoginError(updateResp?.loginError);
                if (updateResp?.nameError) setNameError(updateResp?.nameError);
                if (updateResp?.salaryError) setSalaryError(updateResp?.salaryError);
            }
        }
    };

    return (
        <>
            <Modal
                visible={showEditModal}
                title="Edit Employee Details"
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
                    {(successMessage.length > 0 || errorMessage.length > 0) && (
                        <Alert
                            message={successMessage || errorMessage}
                            description=""
                            type={successMessage.length > 0 ? 'success' : 'error'}
                            closable
                            // onClose={onClose}
                            style={{ marginTop: 15 }}
                        />
                    )}
                    <Title level={4}>Employee Id: {emplid}</Title>
                    <div style={{ marginTop: 10 }}>
                        <Text>Name:</Text>
                        <Input
                            id="name"
                            name="name"
                            value={name}
                            allowClear
                            onChange={(e) => setName(e.target.value)}
                            onBlur={(e) => {
                                e.target.value.length === 0 && setNameError('');
                            }}
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
                            onBlur={(e) => {
                                e.target.value.length === 0 && setLoginError('');
                            }}
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
                            onBlur={(e) => {
                                e.target.value.length === 0 && setSalaryError('');
                            }}
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
