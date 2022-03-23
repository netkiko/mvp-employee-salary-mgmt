import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Pre-defined Components
import { EMPLOYEE_LIST, EMPLOYEE_LIST_HEADERS } from '../configs/constants';
import { getEmployees } from '../api/getEmployees';

export const EmployeeDetailsContext = createContext();

export default function useEmployeeDetails() {
    // Context States
    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        (async () => {
            const employeeResp = await getEmployees();
            if (employeeResp?.data) {
                setEmployeeList(employeeResp.data);
            }
            // const employeeResult = await fetch('/api/employees', {
            //     method: 'get',
            //     headers: { storage: window.localStorage.getItem(EMPLOYEE_LIST) },
            // });
            // const employeeResp = await employeeResult.json();
            // if (employeeResp?.data) {
            //     setEmployeeList(employeeResp.data);
            // }
        })();
    }, []);

    const updateEmployeeList = (updatedEmpList) => {
        window.localStorage.setItem(EMPLOYEE_LIST, JSON.stringify(updatedEmpList));
        setEmployeeList(updatedEmpList);
    };

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
