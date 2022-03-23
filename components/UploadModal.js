import React, { useContext, useEffect, useState } from 'react';
import { Alert, Modal, Button, Input, Space } from 'antd';

import { EmployeeDetailsContext } from '../contexts/EmployeeDetails';

const UploadModal = ({ showUploadModal, setShowUploadModal }) => {
    const EmployeeDetails = useContext(EmployeeDetailsContext);
    const {
        EMPLOYEE_LIST_HEADERS: columnHeaders,
        employeeList,
        updateEmployeeList,
    } = EmployeeDetails;

    // Local states
    const [loading, setLoading] = useState(false);
    const [isNewList, setIsNewList] = useState(true);
    const [isInvalidFileFormat, setIsInvalidFileFormat] = useState(false);
    const [csvFiles, setCsvFiles] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [csvFileNames, setCsvFileNames] = useState('');

    const showModal = () => {
        // setVisible(true);
        setShowUploadModal(true);
    };

    const processCsvFile = (data, delimeter = ',') => {
        let arrExistingEmployeeList = employeeList;
        const arrHeaders = columnHeaders.split(delimeter);
        const arrRows = data.slice(0).split('\r\n');

        let newArrEmployees = arrRows.map((row) => {
            const values = row.split(delimeter);
            const eachObject = arrHeaders.reduce((obj, header, i) => {
                obj[header] = values[i]?.trim();
                return obj;
            }, {});

            return eachObject;
        });

        let arrValidEmployees = [];
        for (let i = 0; i < newArrEmployees.length; i++) {
            if (
                newArrEmployees[i]?.emplid?.length > 0 &&
                newArrEmployees[i]?.emplid?.substr(0, 1) !== '#' &&
                newArrEmployees[i]?.login?.length > 0 &&
                newArrEmployees[i]?.name?.length > 0 &&
                newArrEmployees[i]?.salary?.length > 0 &&
                parseFloat(newArrEmployees[i]?.salary) >= 0.0
            ) {
                arrValidEmployees.push(newArrEmployees[i]);
            }
        }

        if (arrExistingEmployeeList.length > 0) {
            for (let i = 0; i < arrValidEmployees.length; i++) {
                arrExistingEmployeeList = arrExistingEmployeeList.filter(
                    (d) => d.emplid !== arrValidEmployees[i].emplid,
                );
                const dupLoginIndex = arrExistingEmployeeList.findIndex(
                    (d) => d.login === arrValidEmployees[i].login,
                );
                if (dupLoginIndex < 0) {
                    arrExistingEmployeeList.push(arrValidEmployees[i]);
                }
            }
        } else {
            arrExistingEmployeeList = arrValidEmployees;
        }

        updateEmployeeList(arrExistingEmployeeList);
    };

    const handleCsvUpload = () => {
        setLoading(true);
        const file = csvFiles;
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;
            processCsvFile(text);
        };

        reader.readAsText(file);
        setLoading(false);
    };

    const handleCancel = () => setShowUploadModal(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file?.name?.includes('.csv')) {
            setIsInvalidFileFormat(true);
            setCsvFiles(file);
            return;
        }

        setIsInvalidFileFormat(false);
        setCsvFiles(file);
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
                    <Button key="submit" type="primary" loading={loading} onClick={handleCsvUpload}>
                        Upload CSV
                    </Button>,
                ]}
            >
                {/* <Space direction="vertical"> */}
                <Input
                    type="file"
                    id="files"
                    name="files"
                    // value={csvFiles}
                    accept=".csv"
                    multiple
                    onChange={handleFileChange}
                />
                {isInvalidFileFormat && (
                    <Alert
                        message="Please upload a CSV File."
                        description=""
                        type="error"
                        closable
                        // onClose={onClose}
                        style={{ marginTop: 15 }}
                    />
                )}
                {/* </Space> */}
            </Modal>
        </>
    );
};

export default UploadModal;
