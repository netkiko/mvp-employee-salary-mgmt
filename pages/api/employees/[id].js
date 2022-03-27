import handleUpdateEmployeeDetailsById from '../../../helpers/api/handleUpdateEmployeeDetailsById';
import handleDeleteEmployeeDetailsById from '../../../helpers/api/handleDeleteEmployeeDetailsById';

export default function userHandler(req, res) {
    const { method } = req;

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
            return handleUpdateEmployeeDetailsById(req, res);
        case 'DELETE':
            // Update or create data in your database
            return handleDeleteEmployeeDetailsById(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
