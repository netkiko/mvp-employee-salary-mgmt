import { REQUEST_STATUS } from '../../configs/constants';

const handleUpdateEmployeeDetailsById = async (req, res) => {
    const {
        query: { id: emplid },
        headers,
        body,
    } = req;
    const { login, name, salary } = body;

    // Validate local storage item existence
    if (!headers?.data) {
        return res.status(500).json({
            status: REQUEST_STATUS.FAILED,
            message: 'Database error. Please try again later...',
        });
    }

    // Validate Fields
    let fieldErrors = {};
    emplid?.length === 0 &&
        (fieldErrors = { ...fieldErrors, emplidError: 'Employee Id is required.' });
    login?.length === 0 && (fieldErrors = { ...fieldErrors, loginError: 'Login is required.' });
    name?.length === 0 && (fieldErrors = { ...fieldErrors, nameError: 'Name is required.' });
    (salary?.length === 0 || parseFloat(salary) <= 0) &&
        (fieldErrors = {
            ...fieldErrors,
            salaryError: 'Salary must not be blank or equal to zero.',
        });
    if (Object.keys(fieldErrors).length > 0)
        return res.status(400).json({
            status: REQUEST_STATUS.FAILED,
            ...fieldErrors,
        });

    // Employees data taken from local storage
    let employeeList = JSON.parse(headers.data) || [];

    // Search Employee Id (if exist)
    const searchedEmpIdData = employeeList.filter((emp) => emp.emplid === emplid);
    if (searchedEmpIdData?.length === 0) {
        return res.status(400).json({
            status: REQUEST_STATUS.FAILED,
            message: `Employee Id: ${emplid} does not exist!`,
        });
    }

    // Search Login (if exist)
    const searchedEmpLoginData = employeeList.filter(
        (emp) => emp.login === login && emp.emplid !== emplid,
    );
    if (searchedEmpLoginData?.length > 0) {
        return res.status(400).json({
            status: REQUEST_STATUS.FAILED,
            loginError: 'Login is already in use!',
        });
    }

    // Update existing employee details
    const empIndex = await employeeList.findIndex((e) => e.emplid === emplid);
    if (empIndex >= 0) {
        employeeList[empIndex].emplid = emplid;
        employeeList[empIndex].login = login;
        employeeList[empIndex].name = name;
        employeeList[empIndex].salary = salary;
    }

    return res.status(200).json({
        status: REQUEST_STATUS.OK,
        localData: employeeList,
        message: `Employee Id: ${emplid} has been successfully updated.`,
    });
};

export default handleUpdateEmployeeDetailsById;
