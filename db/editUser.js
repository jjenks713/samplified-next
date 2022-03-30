import { Db } from 'mongodb'
import connectToDB from './connect';


export default async function updateUser(Db, data) {

    const { db } = connectToDB()

    console.log(data.id, "THIS IS THE SOUNDS HERE", db)

    const id = data.id

    const operation = await Db.collection('users').updateOne(
        {
        _id: id,
        },
        { $set: data },
    )

    if (!operation.result.ok) {
        throw new Error('Could not update document')
    }

    const updated = await Db.collection('users').findOne({ _id: id })
    console.log("thishere", updated)
    return updated
}
