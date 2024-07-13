const express = require('express')
const router = express.Router();
const person = require('./../models/person');

router.post("/", async (req, res) => {
    try {
        const data = req.body

        const newPerson = new person(data);

        const response = await newPerson.save();
        console.log('response saved');
        res.status(200).json({ response })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await person.find()
        console.log("data was fetch");
        // console.log(data);
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error" });
    }
});


router.get('/:worktype', async (req, res) => {

    try {
        const worktype = req.params.worktype;// Extract the worktype from the URL paramenter 
        if (worktype == 'manager' || worktype == 'chef' || worktype == 'waiter') {

            const response = await person.find({ work: worktype })
            console.log('response fetched');
            // console.log(response)
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'invalid worktype' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error" });
    }

})

router.put('/:id',async (req,res)=>{
    try {
        
        const person_id=req.params.id;
        const updatedpersondata=req.body;
        const response=await person.findByIdAndUpdate(person_id,updatedpersondata,{
            new:true,
            runValidators:true
        })

        if (!response) {
            return res.status(404).json({error:"usernot found"});
        }

        console.log('data updated');
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error" });
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        const person_id=req.params.id;

        const response=await person.findByIdAndDelete(person_id)

        if (!response) {
            return res.status(404).json({error:"usernot found"});
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted secsessfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error" });
    }
})

module.exports = router;