import { EMPLOYEE_LIST } from '../configs/constants';

export const getEmployees = async (params) => {
    console.log('getEmployees', params);
    const { pagination, filters, sorter } = params;
    const { current, pageSize } = pagination;
    const { minSalary, maxSalary } = filters;
    const { field, order } = sorter || { columnKey: '', field: '', order: '' };
    try {
        const employeeResult = await fetch(
            `/api/employees?current=${current}&pageSize=${pageSize}&sortField=${field}&sortOrder=${order}&minSalary=${minSalary}&maxSalary=${maxSalary}`,
            {
                method: 'GET',
                headers: { data: window.localStorage.getItem(EMPLOYEE_LIST) },
            },
        );
        const employeeResp = await employeeResult.json();
        // console.log('getEmployees response', employeeResp);
        return employeeResp;
    } catch (error) {
        // console.log('getEmployees response', employeeResp);
        return error;
    }
};
