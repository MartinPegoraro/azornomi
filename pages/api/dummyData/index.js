import { dummyData } from '../../../data/dummyData'

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return res.status(200).json(dummyData);
        case 'POST':
            console.log('metodo post', req.body.value, req.body);
            const dummyDataBody = req.body
            dummyData.push(dummyDataBody)
            // dummyData.save(dummyDataBody)
            return res.status(201).json(dummyDataBody)

        default:
            return res.status(405).end(`Method ${req.method} not allowed`)

    }



    //     if (req.method === 'GET') {
    //         res.status(200).json(dummyData)
    //     } else if (req.method === 'POST') {
    //         console.log('metodo post', req.body.value, req.body);
    //         const dummyDataBody = req.body
    //         dummyData.push(dummyDataBody)
    //         // dummyData.save(dummyDataBody)
    //         res.status(201).json(dummyDataBody)
    //     }
}
