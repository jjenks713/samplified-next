//import middleware from "../../../middleware/all";
import connectToDB  from '../../../db/connect'



export default async function dbInfo() {

    const { db } = await connectToDB()

    const sounds = await db
    .collection("sounds")
    .find({}, {projection:{_id:0, createdAt:0, updatedAt: 0}})
    .sort({ metacritic: -1 })
    .toArray();
    //const account = accounts.toJSON();
    
    //const dataArray = accounts.map((account) => {})

    return sounds
}
