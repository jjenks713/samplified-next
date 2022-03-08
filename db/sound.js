import { Db } from 'mongodb'
import connectToDB from './connect';
import { nanoid } from 'nanoid'

const { db } = connectToDB()
export const getSound = async (sound) => {
  console.log(sound)
  return db
    .collection("sounds")
    .find({}, {projection:{_id:0, createdAt:0, updatedAt: 0}})
    .sort({ metacritic: -1 })
    .toArray();
}

const createSound = async (Db, data) => {

  console.log(data, "THIS IS THE SOUNDS HERE", Db)
  const sounds = await Db
    .collection('sounds')
    .insertOne({
      _id: nanoid(12),
      ...data,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])

    return sounds
}

export default createSound
