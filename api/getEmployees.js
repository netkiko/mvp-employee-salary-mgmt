import { EMPLOYEE_LIST } from '../configs/constants';

export const getEmployees = async () => {
    try {
        const employeeResult = await fetch('/api/employees', {
            method: 'GET',
            headers: { data: window.localStorage.getItem(EMPLOYEE_LIST) },
        });
        const employeeResp = await employeeResult.json();
        return employeeResp;
    } catch (error) {
        return error;
    }
};
