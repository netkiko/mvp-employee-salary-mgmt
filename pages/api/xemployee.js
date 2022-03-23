// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default function userHandler(req, res) {
    const {
        headers,
        // query: { emplid },
        method,
    } = req;
    console.log('req', req.body);
    res.status(200).json({ emplid: '45645' });
    // switch (method) {
    //     case 'GET':
    //         // Get data from your database
    //         res.status(200).json({ emplid, name: `User ${emplid}` });
    //         break;
    //     case 'POST':
    //         // Get data from your database
    //         res.status(200).json({ emplid, name: `User ${emplid}` });
    //         break;
    //     case 'PUT':
    //         // Update or create data in your database
    //         res.status(200).json({ emplid, name: name || `User ${emplid}` });
    //         break;
    //     case 'DELETE':
    //         // Update or create data in your database
    //         res.status(200).json({ emplid, name: name || `User ${emplid}` });
    //         break;
    //     default:
    //         res.setHeader('Allow', ['GET', 'PUT']);
    //         res.status(405).end(`Method ${method} Not Allowed`);
    // }
}
