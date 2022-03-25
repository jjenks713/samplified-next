import { Db } from 'mongodb'
import middleware from "../../../middleware/all"
import createSound from "../../../db/sound"
import nc from "next-connect";
import onError from '../../../middleware/error';

const handler = nc({
  onError
})

handler.use(middleware)

handler.post(async(req, res) => {
    const dataObj = req.body.dataObj
    //const file = req.body.dataObj.file
    
    
    console.log(req.body)

    const newSound = await createSound(req.db,
      { 
        createdBy: dataObj.user,
        name: dataObj.soundName,
        bpm: dataObj.bpm,
        key: dataObj.key,
        genre: dataObj.genre,
        loop: dataObj.loop,
        instrument: dataObj.instrument,
        url: dataObj.url,
        userName: dataObj.userName,
    })
    res.send({ data: newSound });
  })

export default handler;