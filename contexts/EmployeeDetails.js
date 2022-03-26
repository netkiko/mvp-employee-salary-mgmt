import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Pre-defined Components
import { EMPLOYEE_LIST, EMPLOYEE_LIST_HEADERS, REQUEST_STATUS } from '../configs/constants';
import { getEmployees } from '../api/getEmployees';

export const EmployeeDetailsContext = createContext();

export default function useEmployeeDetails() {
    // Context States
    const [employeeList, setEmployeeList] = useState([]);

    const updateEmployeeList = (updatedEmpList) => {
        window.localStorage.setItem(EMPLOYEE_LIST, JSON.stringify(updatedEmpList));
        setEmployeeList(updatedEmpList);
    };

    useEffect(() => {
        (async () => {
            const employeeResp = await getEmployees();
            console.log(employeeResp);
            if (employeeResp?.status === REQUEST_STATUS.OK && employeeResp?.data) {
                updateEmployeeList(employeeResp.data);
            }
        })();
    }, []);

    return {
        EMPLOYEE_LIST,
        EMPLOYEE_LIST_HEADERS,
        employeeList,
        setEmployeeList,
        updateEmployeeList,
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
