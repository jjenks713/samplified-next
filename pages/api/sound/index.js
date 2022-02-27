import { Db } from 'mongodb'
import { nanoid } from 'nanoid'
import connectToDB  from '../../../db/connect'


/* export const getOneDoc = async (db: Db, id: string) => {
  return db.collection('docs').findOne({ _id: id })
}

export const getDocsByFolder = async (db: Db, folderId: string) => {
  return db.collection('docs').find({ folder: folderId }).toArray()
} */

export default async function Sounds (req, res) {
        const { db } = await connectToDB()
        const dataObj = req.body.dataObj
        const sound = { 
            createdBy: dataObj.user,
            name: dataObj.soundName,
            bpm: dataObj.bpm,
            key: dataObj.key,
            genre: dataObj.genre,
            loop: dataObj.loop,
            instrument: dataObj.instrument,
            file: dataObj.file,
            userName: dataObj.userName,
        }
        console.log(sound, 'THASLDJHFGUIYSBFNFWJSHKFV')

     

  const sounds = await db
    .collection("sounds")
    .insertOne({
      _id: nanoid(12),
      ...sound,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])

    const getSounds = await db
    .collection("sounds")
    .find({}, {projection:{_id:0, createdAt:0, updatedAt: 0}})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

    return {sounds, getSounds}


}

/* export const updateOne = async (db: Db, id: string, updates: any) => {
  const operation = await db.collection('docs').updateOne(
    {
      _id: id,
    },
    { $set: updates },
  )

  if (!operation.result.ok) {
    throw new Error('Could not update document')
  }

  const updated = await db.collection('docs').findOne({ _id: id })
  return updated 
}
*/