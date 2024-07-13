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
//this is testing comment
module.exports = router;