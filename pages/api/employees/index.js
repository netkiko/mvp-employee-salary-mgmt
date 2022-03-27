import { REQUEST_STATUS } from '../../../configs/constants';

const employeesApiHandler = (req, res) => {
    // console.log('req', req.query);
    const { headers, query } = req;
    const { current, pageSize, sortField, sortOrder, minSalary, maxSalary } = query;
    console.log(current, pageSize, sortField, sortOrder, minSalary, maxSalary);

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

    // Filter Employees by Salary Range
    const filteredEmployeeList =
        parseFloat(minSalary) >= 0 &&
        parseFloat(maxSalary) > 0 &&
        parseFloat(minSalary) <= parseFloat(maxSalary)
            ? employeeList.filter(
                  (e) =>
                      parseFloat(e.salary) >= parseFloat(minSalary) &&
                      parseFloat(e.salary) <= parseFloat(maxSalary),
              )
            : employeeList;

    // Order Employees by either Id, Loginm Name or Salary
    const orderedEmployeeList =
        sortField && sortOrder
            ? sortOrder === 'ascend'
                ? sortField === 'salary'
                    ? filteredEmployeeList.sort(
                          (a, b) => parseFloat(a[sortField]) - parseFloat(b[sortField]),
                      )
                    : filteredEmployeeList.sort((a, b) => a[sortField].localeCompare(b[sortField]))
                : sortField === 'salary'
                ? filteredEmployeeList.sort(
                      (a, b) => parseFloat(b[sortField]) - parseFloat(a[sortField]),
                  )
                : filteredEmployeeList.sort((a, b) => b[sortField].localeCompare(a[sortField]))
            : filteredEmployeeList;

    return res.status(200).json({
        status: REQUEST_STATUS.OK,
        data: orderedEmployeeList.slice(rowStartFrom, rowEndsWith),
        pagination: { current, pageSize, total: orderedEmployeeList.length },
        sorter: { key: sortField, field: sortField, order: sortOrder },
    });
};

export default employeesApiHandler;
