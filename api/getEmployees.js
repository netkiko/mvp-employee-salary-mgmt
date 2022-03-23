import { EMPLOYEE_LIST } from '../configs/constants';

export const getEmployees = async () => {
    try {
        const employeeResult = await fetch('/api/employees', {
            method: 'GET',
            headers: { data: window.localStorage.getItem(EMPLOYEE_LIST) },
        });
        const employeeResp = await employeeResult.json();
        console.log(employeeResp);
        if (employeeResp.status === 200) {
            return employeeResp;
        }

        return { data: [] };

        // let orderedEmpListById = [];
        // if (window.localStorage.getItem(EMPLOYEE_LIST)) {
        //     orderedEmpListById = JSON.parse(window.localStorage.getItem(EMPLOYEE_LIST)).sort(
        //         (a, b) => a.id - b.id,
        //     );
        // }

        // return {
        //     data: orderedEmpListById,
        //     status: 200,
        // };
    } catch (error) {
        return { data: [] };
    }
};
