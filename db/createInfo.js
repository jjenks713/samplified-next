import { Db } from 'mongodb'
import connectToDB from './connect';
import { nanoid } from 'nanoid'


const { db } = connectToDB()

const createInfo = async (Db, data) => {

    console.log(data)

    const info = await Db
    .collection('info')
    .insertOne({
      _id: nanoid(12),
      ...data,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])

    return info
}

export default createInfo