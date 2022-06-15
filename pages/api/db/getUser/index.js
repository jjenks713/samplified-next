import connectToDB  from '../../../../db/connect'

export default async function allUsers() {

    const { db } = await connectToDB()

    const allUsers = await db
    .collection("users")
    .find({}, {projection:{_id:0, createdAt:0, updatedAt: 0}})
    .sort({ metacritic: -1 })
    .toArray();
    //const account = accounts.toJSON();
    
    //const dataArray = accounts.map((account) => {})

    return allUsers
}