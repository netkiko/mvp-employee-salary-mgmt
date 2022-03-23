const employeesApiHandler = (req, res) => {
    const { headers } = req;
    let orderedEmpListById = [];

    // Employees data taken from local storage
    if (headers?.data) {
        orderedEmpListById = JSON.parse(req.headers.data).sort((a, b) => a.id - b.id);
    }
    res.json({ status: 200, data: orderedEmpListById });
};

export default employeesApiHandler;
