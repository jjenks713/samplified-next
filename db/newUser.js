import { Db } from 'mongodb'
import connectToDB from './connect';
import { nanoid } from 'nanoid'


const { db } = connectToDB()

const createUser = async (Db, data) => {

    console.log(data)

    const info = await Db
    .collection('users')
    .insertOne({
      _id: nanoid(12),
      ...data,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])

    return info
}

export default createUser