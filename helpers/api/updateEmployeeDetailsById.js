import { REQUEST_STATUS } from '../../configs/constants';

const updateEmployeeDetailsById = async (req, res) => {
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
    if (emplid?.length === 0)
        fieldErrors = { ...fieldErrors, emplidError: 'Employee Id is required.' };
    if (login?.length === 0) fieldErrors = { ...fieldErrors, loginError: 'Login is required.' };
    if (name?.length === 0) fieldErrors = { ...fieldErrors, nameError: 'Name is required.' };
    if (salary?.length === 0 || parseFloat(salary) <= 0)
        fieldErrors = { ...fieldErrors, salaryError: 'Salary must not be blank or equal to zero.' };
    if (Object.keys(fieldErrors).length > 0) {
        return res.status(400).json({
            status: REQUEST_STATUS.FAILED,
            ...fieldErrors,
        });
    }

    // Employees data taken from local storage
    let orderedEmpListById = JSON.parse(req.headers.data)?.sort((a, b) => a.id - b.id) || [];

    // Search Employee Id (if exist)
    const searchedEmpIdData = orderedEmpListById.filter((emp) => emp.emplid === emplid);
    if (searchedEmpIdData?.length === 0) {
        return res.status(400).json({
            status: REQUEST_STATUS.FAILED,
            message: `Employee Id: ${emplid} does not exist!`,
        });
    }

    // Search Login (if exist)
    const searchedEmpLoginData = orderedEmpListById.filter(
        (emp) => emp.login === login && emp.emplid !== emplid,
    );
    if (searchedEmpLoginData?.length > 0) {
        return res.status(400).json({
            status: REQUEST_STATUS.FAILED,
            loginError: 'Login is already in use!',
        });
    }

    // Update existing employee details
    const empIndex = await orderedEmpListById.findIndex((e) => e.emplid === emplid);
    if (empIndex >= 0) {
        orderedEmpListById[empIndex].emplid = emplid;
        orderedEmpListById[empIndex].login = login;
        orderedEmpListById[empIndex].name = name;
        orderedEmpListById[empIndex].salary = salary;
    }

    return res.status(200).json({
        status: REQUEST_STATUS.OK,
        data: orderedEmpListById,
        message: `Employee Id: ${emplid} has been successfully updated.`,
    });
};

export default updateEmployeeDetailsById;
