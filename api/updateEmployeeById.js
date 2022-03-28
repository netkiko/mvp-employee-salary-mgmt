import { EMPLOYEE_LIST } from '../configs/constants';

export const updateEmployeeById = async ({ emplid, login, name, salary }) => {
    try {
        const reqBody = {
            login,
            name,
            salary,
        };
        const employeeResult = await fetch(`/api/employees/${emplid}`, {
            method: 'PUT',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                data: window.localStorage.getItem(EMPLOYEE_LIST),
            },
        });
        const employeeResp = await employeeResult.json();
        // console.log('updateEmployeeById response', employeeResp);
        return employeeResp;
    } catch (error) {
        // console.log('updateEmployeeById error', error);
        return {};
    }
};
