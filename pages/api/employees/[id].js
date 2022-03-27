import handleUpdateEmployeeDetailsById from '../../../helpers/api/handleUpdateEmployeeDetailsById';
import handleDeleteEmployeeDetailsById from '../../../helpers/api/handleDeleteEmployeeDetailsById';

export default function userHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'PUT':
            return handleUpdateEmployeeDetailsById(req, res);
        case 'DELETE':
            return handleDeleteEmployeeDetailsById(req, res);
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
