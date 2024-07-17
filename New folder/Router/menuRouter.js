const express = require('express')
const router = express.Router();

const menu = require('./../models/menu');


router.post("/", async (req, res) => {
    try {
        const data = req.body

        const newPerson = new menu(data);

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
        const menudata = await menu.find()
        console.log("data was fetch");
        console.log(menudata);
        res.status(200).json(menudata)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error" });
    }
})

router.get('/:waters', async (req, res) => {
    try {
        const waters = req.params.waters;
        if (waters == 'boil' || waters == 'stil' || waters == 'fresh') {
            const response = await menu.find({ water: waters });
            console.log('response fetched', response);
            res.status(200).json(response);
        }
        else {
            console.log('invalid water type');
            res.status(404).json({ error: 'invalid water type' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error" });
    }
})
router.delete('/del/:id',async (req,res)=>{
    try {
        const menu_id=req.params.id;

        const response=await menu.findByIdAndDelete(menu_id);

        if (!response) {
            return res.status(404).json({error:"usernot found"});
        }
        console.log('data deleted');
        res.status(200).json({message:'item deleted succcesfuly'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error" });
    }
})
router.put('/:id', async (req, res) => {
    const menuId = req.params.id;
    const updateData = req.body;
  
    // const client = new MongoClient(uri);
    // const db = client.db(dbName);
    // const collection = db.collection(collectionName);
    

    try {
     
      const result = await menu.findByIdAndUpdate(menuId,updateData);
      res.send(`Updated ${menuId} document(s)`);
    } catch (err) {
      console.error(err);   
      res.status(500).send('Error updating menu item');
    } finally {
      client.close();
    }
  });
//this is testing comment
module.exports = router;
