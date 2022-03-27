import { REQUEST_STATUS } from '../../../configs/constants';

const employeesApiHandler = (req, res) => {
    // console.log('req', req.query);
    const { headers, query } = req;
    const { current, pageSize, sortField, sortOrder } = query;
    console.log(current, pageSize, sortField, sortOrder);

    const rowEndsWith = current * pageSize;
    const rowStartFrom = rowEndsWith - pageSize;

    // Validate local storage item existence
    if (!headers?.data)
        return res.status(500).json({
            status: REQUEST_STATUS.FAILED,
            message: 'Database error. Please try again later...',
        });

    // Employees data taken from local storage
    const employeeList = JSON.parse(headers.data) || [];
    const orderedEmployeeList =
        sortField && sortOrder
            ? sortOrder === 'ascend'
                ? sortField === 'salary'
                    ? employeeList.sort(
                          (a, b) => parseFloat(a[sortField]) - parseFloat(b[sortField]),
                      )
                    : employeeList.sort((a, b) => a[sortField].localeCompare(b[sortField]))
                : sortField === 'salary'
                ? employeeList.sort((a, b) => parseFloat(b[sortField]) - parseFloat(a[sortField]))
                : employeeList.sort((a, b) => b[sortField].localeCompare(a[sortField]))
            : employeeList;

    return res.status(200).json({
        status: REQUEST_STATUS.OK,
        data: orderedEmployeeList.slice(rowStartFrom, rowEndsWith),
        pagination: { current, pageSize, total: employeeList.length },
        sorter: { key: sortField, field: sortField, order: sortOrder },
    });
};

export default employeesApiHandler;
