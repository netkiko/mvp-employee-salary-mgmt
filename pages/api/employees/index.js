const employeesApiHandler = (req, res) => {
    const { headers } = req;
    let orderedEmpListById = [];

    // Validate local storage item existence
    if (!headers?.data)
        return res.json({
            status: 500,
            message: 'Database error. Please try again later...',
        });

    // Employees data taken from local storage
    orderedEmpListById = JSON.parse(req.headers.data)?.sort((a, b) => a.id - b.id) || [];
    return res.json({ status: 200, data: orderedEmpListById });
};

export default employeesApiHandler;
