import connectToDB  from '../../../../db/connect'

export default async function userInfo() {

    const { db } = await connectToDB()

    const userInfo = await db
    .collection("info")
    .find({}, {projection:{_id:0, createdAt:0, updatedAt: 0}})
    .sort({ metacritic: -1 })
    .toArray();
    //const account = accounts.toJSON();
    
    //const dataArray = accounts.map((account) => {})

    return userInfo
}
