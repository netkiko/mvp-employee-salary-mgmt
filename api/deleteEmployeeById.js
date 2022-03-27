import { EMPLOYEE_LIST } from '../configs/constants';

export const deleteEmployeeById = async ({ emplid }) => {
    try {
        const employeeResult = await fetch(`/api/employees/${emplid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                data: window.localStorage.getItem(EMPLOYEE_LIST),
            },
        });
        const employeeResp = await employeeResult.json();
        // console.log('deleteEmployeeById response', employeeResp);
        return employeeResp;
    } catch (error) {
        // console.log('deleteEmployeeById error', error);
        return {};
    }
};
