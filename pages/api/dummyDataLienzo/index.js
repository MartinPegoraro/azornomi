import { dummyDataLienzo } from '../../../data/dummyDataLienzo'

export default function handler(req, res) {
    res.status(200).json(dummyDataLienzo)
}
