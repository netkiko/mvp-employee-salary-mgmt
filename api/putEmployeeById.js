import { EMPLOYEE_LIST } from '../configs/constants';

export const putEmployeeById = async ({ emplid, login, name, salary }) => {
    try {
        const employeeResult = await fetch(`/api/employee`, {
            method: 'PUT',
            headers: {
                data: window.localStorage.getItem(EMPLOYEE_LIST),
            },
            body: {
                emplid,
                login,
                name,
                salary,
            },
        });
        const employeeResp = await employeeResult.json();
        console.log(employeeResp);
        // if (employeeResp.status === 204) {
        //     return employeeResp;
        // }
        return { data: [] };
    } catch (error) {
        return { data: [] };
    }
};
