import AWS from 'aws-sdk'

export default async function awsFunction(req, res) {

    console.log(req.body, "hello")

    const file = req.body.newFile

    const S3_BUCKET = process.env.S3_BUCKET;
    const AWSAccessKeyId = process.env.AWSAccessKeyId
    const AWSSecretKey = process.env.AWSSecretKey
    const REGION ='us-east-1';

    AWS.config.update({
        accessKeyId: AWSAccessKeyId,
        secretAccessKey: AWSSecretKey
      })
    console.log(S3_BUCKET)
 
    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET},
        region: REGION,
        url: `https://${S3_BUCKET}.s3.amazonAWS.com/${file.name}`
    })
  
    console.log(file)
  
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
        ContentType: file.type,
    };
 
    myBucket.putObject(params)
        .send((err) => {
            if (err) {
            console.log(err)
            } else (
            console.log("successfully uploaded")
            )
        })

    res.status(200).json({ success: true});
    res.send(myBucket)

}
