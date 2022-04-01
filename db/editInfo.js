import { Db } from 'mongodb'
import connectToDB from './connect';

const { db } = connectToDB()

const updateUser = async (Db, data) => {

    console.log(data, "THIS IS THE SOUNDS HERE")

    const id = data.id
    const info = data.info
    const soundcloud = data.soundcloud
    const twitter = data.twitter
    const facebook = data.facebook


    const operation = await Db.collection('info').updateOne(
        {
        _id: id,
        },
        { $set: {
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

export default updateUser
