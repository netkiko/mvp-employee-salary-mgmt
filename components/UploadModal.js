import React, { Fragment, useContext, useState } from 'react';
import { Alert, Modal, Button, Input, Space, Progress, Typography } from 'antd';

const { Title, Text } = Typography;

import { EmployeeDetailsContext } from '../contexts/EmployeeDetails';

const UploadModal = ({ showUploadModal, setShowUploadModal }) => {
    const EmployeeDetails = useContext(EmployeeDetailsContext);
    const {
        EMPLOYEE_LIST,
        EMPLOYEE_LIST_HEADERS: columnHeaders,
        updateEmployeeList,
    } = EmployeeDetails;

    // Local states
    const [loading, setLoading] = useState(false);
    const [invalidFileMessage, setInvalidFileMessage] = useState('');
    const [csvFiles, setCsvFiles] = useState([]);
    const [progressInfo, setProgressInfo] = useState([]);

    const processCsvFile = (data, idx, delimeter = ',') => {
        const _progressInfo = [...progressInfo];
        let existingEmployeeList = JSON.parse(window.localStorage.getItem(EMPLOYEE_LIST)) || [];
        const arrHeaders = columnHeaders.split(delimeter);
        const arrRows = data.slice(0).split('\r\n');
        _progressInfo[idx].percentage = 10;
        setProgressInfo([..._progressInfo]);

        let newArrEmployees = arrRows.map((row) => {
            const values = row.split(delimeter);
            const eachObject = arrHeaders.reduce((obj, header, i) => {
                obj[header] = values[i]?.trim();
                return obj;
            }, {});

            return eachObject;
        });
        _progressInfo[idx].percentage = 20;
        setProgressInfo([..._progressInfo]);

        // Remove empty rows
        newArrEmployees = newArrEmployees.filter(
            (e) =>
                e.emplid.length !== 0 &&
                e.login.length !== 0 &&
                e.name.length !== 0 &&
                e.salary.length !== 0,
        );
        progressInfo[idx].percentage = 30;
        setProgressInfo([..._progressInfo]);

        // Validate each field in each row
        for (let i = 0; i < newArrEmployees.length; i++) {
            if (
                newArrEmployees[i]?.emplid?.length === 0 ||
                newArrEmployees[i]?.login?.length === 0 ||
                newArrEmployees[i]?.name?.length === 0 ||
                newArrEmployees[i]?.salary?.length === 0 ||
                parseFloat(newArrEmployees[i]?.salary) <= 0
            ) {
                _progressInfo[idx].percentage = 40;
                _progressInfo[idx].errorMessage = 'One or more rows failed the validation.';
                setProgressInfo([..._progressInfo]);
                return;
            }
        }
        _progressInfo[idx].percentage = 50;
        setProgressInfo([..._progressInfo]);

        // Validate for uniqueness of Login
        if (existingEmployeeList.length > 0) {
            for (let i = 0; i < newArrEmployees.length; i++) {
                existingEmployeeList = existingEmployeeList.filter(
                    (d) => d.emplid !== newArrEmployees[i].emplid,
                );
                const dupLoginIndex = existingEmployeeList.findIndex(
                    (d) => d.login === newArrEmployees[i].login,
                );
                if (dupLoginIndex < 0) {
                    existingEmployeeList.push(newArrEmployees[i]);
                } else {
                    _progressInfo[idx].percentage = 60;
                    _progressInfo[idx].errorMessage =
                        'One or more rows has/have duplicate Login/s.';
                    setProgressInfo([..._progressInfo]);
                    return;
                }
            }
        } else {
            existingEmployeeList = newArrEmployees;
        }
        _progressInfo[idx].percentage = 90;
        setProgressInfo([..._progressInfo]);

        // Update to global employee list (reflects in table)
        updateEmployeeList({ localData: existingEmployeeList });
        _progressInfo[idx].percentage = 100;
        setProgressInfo([..._progressInfo]);
    };

    const handleCsvUpload = () => {
        setLoading(true);
        for (let i = 0; i < csvFiles.length; i++) {
            const file = csvFiles[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                const text = e.target.result;
                processCsvFile(text, i);
            };

            reader.readAsText(file);
        }
        setLoading(false);
    };

    const handleCancel = () => setShowUploadModal(false);

    const handleFileChange = (e) => {
        let _progressInfo = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            let errorMessage = '';
            if (file && !file?.name?.includes('.csv')) {
                setIsInvalidFile(true);
                errorMessage = 'Allow only CSV file.';
            }
            if (file && file?.size > 2000000) {
                setIsInvalidFile(true);
                errorMessage = 'File size must not exceed 2MB.';
            }
            _progressInfo.push({
                percentage: 0,
                fileName: e.target.files[i].name,
                fileSize: e.target.files[i].size,
                errorMessage,
            });
        }

        setProgressInfo(_progressInfo);
        setCsvFiles(e.target.files);
        setInvalidFileMessage('');
        return;
    };

    return (
        <>
            <Modal
                visible={showUploadModal}
                title="Upload Employee List"
                onOk={handleCsvUpload}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        disabled={!!invalidFileMessage}
                        onClick={handleCsvUpload}
                    >
                        Upload CSV
                    </Button>,
                ]}
            >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Input
                        type="file"
                        id="files"
                        name="files"
                        // value={csvFiles}
                        accept=".csv"
                        multiple
                        onChange={handleFileChange}
                    />
                    {invalidFileMessage.length > 0 && (
                        <Alert
                            message={invalidFileMessage}
                            description=""
                            type="error"
                            closable
                            showIcon
                            style={{ marginTop: 15 }}
                        />
                    )}
                    <div style={{ marginTop: 20 }}>
                        {progressInfo.length > 0 &&
                            progressInfo.map((f) => {
                                return (
                                    <Fragment key={f.fileName}>
                                        <Text>{`${f.fileName} (${f.fileSize}b)`}</Text>
                                        <Progress
                                            key={f.name}
                                            percent={f.percentage}
                                            status={
                                                f.percentage === 100
                                                    ? 'success'
                                                    : f.errorMessage
                                                    ? 'exception'
                                                    : 'active'
                                            }
                                            style={{ marginTop: 5 }}
                                        />
                                        {f.errorMessage && (
                                            <Alert
                                                message={f.errorMessage}
                                                description=""
                                                type="error"
                                                showIcon
                                                style={{ marginTop: 10 }}
                                            />
                                        )}
                                    </Fragment>
                                );
                            })}
                    </div>
                </Space>
            </Modal>
        </>
    );
};

export default UploadModal;
