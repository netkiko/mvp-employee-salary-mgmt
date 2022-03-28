import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Pre-defined Components
import { EMPLOYEE_LIST, EMPLOYEE_LIST_HEADERS, REQUEST_STATUS } from '../configs/constants';
import { getEmployees } from '../api/getEmployees';

export const EmployeeDetailsContext = createContext();

export default function useEmployeeDetails() {
    // Context States
    const [localDataChanged, setLocalDataChanged] = useState(true);
    const [employeeList, setEmployeeList] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [sorter, setSorter] = useState({
        key: 'emplid',
        field: 'emplid',
        order: 'ascend',
    });
    const [loading, setLoading] = useState(true);
    const [minSalary, setMinSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(0);

    const updateEmployeeList = ({ localData, data, pagination, sorter }) => {
        // console.log('localData', localData);
        if (localData) {
            window.localStorage.setItem(EMPLOYEE_LIST, JSON.stringify(localData));
            setLocalDataChanged(true);
        } else {
            setEmployeeList(data);
            setPagination({
                current: parseInt(pagination.current),
                pageSize: parseInt(pagination.pageSize),
                total: pagination.total,
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '15'],
            });
            setSorter(sorter);
        }
    };

    useEffect(() => {
        if (localDataChanged) {
            (async () => {
                const employeeResp = await getEmployees({
                    pagination,
                    filters: { minSalary, maxSalary },
                    sorter,
                });
                // console.log('employeeResp', employeeResp);
                if (employeeResp?.status === REQUEST_STATUS.OK && employeeResp?.data) {
                    updateEmployeeList(employeeResp);
                }
                setLoading(false);
            })();
            setLocalDataChanged(false);
        }
    }, [localDataChanged]);

    return {
        EMPLOYEE_LIST,
        EMPLOYEE_LIST_HEADERS,
        employeeList,
        setEmployeeList,
        updateEmployeeList,
        pagination,
        setPagination,
        sorter,
        setSorter,
        loading,
        setLoading,
        minSalary,
        setMinSalary,
        maxSalary,
        setMaxSalary,
    };
}

export const EmployeeDetailsProvider = (props) => {
    const { children } = props;
    return (
        <EmployeeDetailsContext.Provider value={useEmployeeDetails(props)}>
            {children}
        </EmployeeDetailsContext.Provider>
    );
};

EmployeeDetailsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
