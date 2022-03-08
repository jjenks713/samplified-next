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
    console.log(dataObj)
    const newSound = await createSound(req.db,
      { 
        createdBy: dataObj.user,
        name: dataObj.soundName,
        bpm: dataObj.bpm,
        key: dataObj.key,
        genre: dataObj.genre,
        loop: dataObj.loop,
        instrument: dataObj.instrument,
        file: dataObj.file,
        userName: dataObj.userName,
    })
    res.send({ data: newSound });
  })
/*   .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  }); */

export default handler;