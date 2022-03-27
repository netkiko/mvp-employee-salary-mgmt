import { EMPLOYEE_LIST } from '../configs/constants';

export const putEmployeeDetails = async (props) => {
    const { emplid, login, name, salary, EmployeeDetails } = props;
    const { employeeList, updateEmployeeList } = EmployeeDetails;

    try {
        let orderedEmpListById = [];
        if (window.localStorage.getItem(EMPLOYEE_LIST)) {
            orderedEmpListById = JSON.parse(window.localStorage.getItem(EMPLOYEE_LIST)).sort(
                (a, b) => a.id - b.id,
            );
        }

        return {
            data: orderedEmpListById,
            status: 200,
        };
    } catch (error) {
        return {
            data: [],
            status: 500,
        };
    }
};
