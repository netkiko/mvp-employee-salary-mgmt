import { REQUEST_STATUS } from '../../../configs/constants';

const employeesApiHandler = (req, res) => {
    const { headers } = req;
    let orderedEmpListById = [];

    // Validate local storage item existence
    if (!headers?.data)
        return res.status(500).json({
            status: REQUEST_STATUS.FAILED,
            message: 'Database error. Please try again later...',
        });

    // Employees data taken from local storage
    orderedEmpListById = JSON.parse(req.headers.data)?.sort((a, b) => a.id - b.id) || [];
    return res.status(200).json({ status: REQUEST_STATUS.OK, data: orderedEmpListById });
};

export default employeesApiHandler;
