import { REQUEST_STATUS } from '../../configs/constants';

const handleCreateNewEmployeeDetails = async (req, res) => {
    const {
        query: { id: emplid },
        headers,
        body,
    } = req;
    const { login, name, salary } = body;

    // Validate Fields
    if (
        emplid?.length === 0 ||
        login?.length === 0 ||
        name?.length === 0 ||
        salary?.length === 0 ||
        parseFloat(salary) <= 0
    )
        return res.status(400).json({
            status: REQUEST_STATUS.FAILED,
            message: 'One or more rows failed the validation.',
        });

    // Employees data taken from local storage
    let employeeList =
        headers?.data && headers.data !== 'undefined' && headers.data !== 'null'
            ? JSON.parse(headers.data)
            : [];

    employeeList = employeeList.filter((d) => d.emplid !== emplid);
    const dupLoginIndex = employeeList.findIndex((d) => d.login === login);
    if (dupLoginIndex >= 0)
        return res.status(400).json({
            status: REQUEST_STATUS.FAILED,
            message: `Login: ${login} is used by another Employee Id!`,
        });

    employeeList.push({ emplid, login, name, salary });
    console.log('employeeList', employeeList);
    return res.status(200).json({
        status: REQUEST_STATUS.OK,
        localData: JSON.stringify(employeeList),
    });
};

export default handleCreateNewEmployeeDetails;
