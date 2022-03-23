// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default function userHandler(req, res) {
    const {
        query: { id: emplid },
        headers,
        body,
        method,
    } = req;
    const { login, name, salary } = body;

    // Validate Employee Id
    if (emplid.length === 0) {
        return res.json({
            status: 400,
            field: 'emplid',
            message: 'Employee Id is required.',
        });
    }

    // Validate Login
    if (login.length === 0) {
        return res.json({
            status: 400,
            field: 'login',
            message: 'Login is required.',
        });
    }

    // Validate Name
    if (name.length === 0) {
        return res.json({
            status: 400,
            field: 'name',
            message: 'Name is required.',
        });
    }

    // Validate Salary
    if (salary.length === 0 || parseFloat(salary) <= 0) {
        return res.json({
            status: 400,
            field: 'salary',
            message: 'Salary must not be blank or equal to zero.',
        });
    }

    // Validate local storage item existence
    if (!headers?.data) {
        return res.json({
            status: 500,
            message: 'Database error. Please try again later...',
        });
    }

    // orderedEmpListById = JSON.parse(req.headers.data).sort((a, b) => a.id - b.id);
    // Employees data taken from local storage
    let employeeList = JSON.parse(headers.data) || [];

    // Search Employee Id (if exist)
    const searchedEmpIdData = employeeList.filter((emp) => emp.emplid === emplid);
    if (searchedEmpIdData.length === 0) {
        return res.json({
            status: 400,
            message: `Employee Id: ${emplid} does not exist!`,
        });
    }

    // Search Login (if exist)
    const searchedEmpLoginData = employeeList.filter(
        (emp) => emp.login === body.login && emp.emplid !== emplid,
    );
    if (searchedEmpLoginData.length > 0) {
        return res.json({
            status: 400,
            message: `Employee's Login: ${body.login} already in use!`,
        });
    }

    switch (method) {
        // case 'GET':
        //     // Get data from your database
        //     res.status(200).json({ emplid, name: `User ${emplid}` });
        //     break;
        // case 'POST':
        //     // Get data from your database
        //     res.status(200).json({ emplid, name: `User ${emplid}` });
        //     break;
        case 'PUT':
            // Update or create data in your database
            return res.json({
                status: 204,
                message: `Employee Id: ${emplid} has been successfully updated.`,
            });
        case 'DELETE':
            // Update or create data in your database
            return res.status(200).json({ emplid, name: name || `User ${emplid}` });
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
