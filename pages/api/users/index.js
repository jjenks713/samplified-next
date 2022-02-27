//import middleware from "../../../middleware/all";
import connectToDB  from '../../../db/connect'



export default async function dbInfo() {

    const { db } = await connectToDB()

    const users = await db
    .collection("users")
    .find({}, {projection:{_id:0, createdAt:0, updatedAt: 0}})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
    //const account = accounts.toJSON();
    
    //const dataArray = accounts.map((account) => {})

    return users
}
