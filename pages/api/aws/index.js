

//console.log("1st outside")


    
const awsFunction = (req, res) => {

        const file = req.body
        console.log(file, "body inside")
        res.send({data: file})
        res.status(200).json({ success: true});
    
    
    
}

export default awsFunction


