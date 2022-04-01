import { Db } from 'mongodb'
import middleware from "../../../../middleware/all"
import updateUser from "../../../../db/editInfo"
import nc from "next-connect";
import onError from '../../../../middleware/error';

const handler = nc({
  onError
})

handler.use(middleware)

handler.post(async(req, res) => {
    const dataObj = req.body.editInfo
    //const file = req.body.dataObj.file
    
    
    console.log(req.body)

    const editUser = await updateUser(req.db,
      { 
        id: dataObj.id,
        info: dataObj.info,
        soundcloud: dataObj.soundcloud,
        twitter: dataObj.twitter,
        facebook: dataObj.facebook
    })
    res.send({ data: editUser });
  })

export default handler;