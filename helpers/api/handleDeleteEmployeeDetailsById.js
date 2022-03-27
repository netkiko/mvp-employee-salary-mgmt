import { REQUEST_STATUS } from '../../configs/constants';

const deleteEmployeeDetailsById = async (req, res) => {
    const {
        query: { id: emplid },
        headers,
    } = req;

    // Validate local storage item existence
    if (!headers?.data) {
        return res.status(500).json({
            status: REQUEST_STATUS.FAILED,
            message: 'Database error. Please try again later...',
        });
    }

    // Employees data taken from local storage
    let employeeList = JSON.parse(headers.data);

    // Search Employee Id (if exist)
    const searchedEmpIdData = employeeList.filter((emp) => emp.emplid === emplid);
    if (searchedEmpIdData?.length === 0) {
        return res.status(400).json({
            status: REQUEST_STATUS.FAILED,
            message: `Employee Id: ${emplid} does not exist!`,
        });
    }

    return res.status(200).json({
        status: REQUEST_STATUS.OK,
        localData: employeeList.filter((emp) => emp.emplid !== emplid),
        message: `Employee Id: ${emplid} has been successfully deleted.`,
    });
};

export default deleteEmployeeDetailsById;
