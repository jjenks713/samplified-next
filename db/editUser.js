import { Db } from 'mongodb'
import connectToDB from './connect';


export default async function updateUser(Db, data) {

    const { db } = connectToDB()

    console.log(data, "THIS IS THE SOUNDS HERE")

    const id = data.id
    const name = data.name
    const info = data.info
    const soundcloud = data.soundcloud
    const twitter = data.twitter
    const facebook = data.facebook


    const operation = await Db.collection('users').updateOne(
        {
        _id: id,
        },
        { $set: {
            name: name,
            info: info,
            soundcloud: soundcloud,
            twitter: twitter,
            facebook: facebook
        } },
    )

    if (!operation.result.ok) {
        throw new Error('Could not update document')
    } else {
        console.log("SUCCESS!!!!!!!!!!!!")
    }

    const updated = await Db.collection('users').findOne({ }, {projection:{_id:0, createdAt:0, updatedAt: 0}})
    //console.log("thishere", updated)
    return updated
}
