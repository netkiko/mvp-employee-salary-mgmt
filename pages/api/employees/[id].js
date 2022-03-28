import handleCreateNewEmployeeDetails from '../../../helpers/api/handleCreateNewEmployeeDetails';
import handleUpdateEmployeeDetailsById from '../../../helpers/api/handleUpdateEmployeeDetailsById';
import handleDeleteEmployeeDetailsById from '../../../helpers/api/handleDeleteEmployeeDetailsById';

const userHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'POST':
            return handleCreateNewEmployeeDetails(req, res);
        case 'PUT':
            return handleUpdateEmployeeDetailsById(req, res);
        case 'DELETE':
            return handleDeleteEmployeeDetailsById(req, res);
        default:
            res.setHeader('Allow', ['PUT', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default userHandler;
