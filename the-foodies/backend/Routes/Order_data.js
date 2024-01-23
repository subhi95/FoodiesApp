const express = require("express");
const router = express.Router();
const order = require("../models/Orders");
const { route } = require("./CreateUser");

router.post('/Order_data', async (req, res) => {
    try {
        const { email, order_data, Order_date } = req.body;
        console.log(req.body)
        // Validate required fields
        if (!email) {
            return res.status(400).send({ error: "Email is required" });
        }

        // Add Order_date to order_data
        order_data.splice(0, 0, { Order_date });

        const existingOrder = await order.findOne({ email });

        if (!existingOrder) {
            await order.create({ email, order_data });
        } else {
            await order.findOneAndUpdate({ email }, { $push: { order_data } });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

router.post('/MyOrder_data', async (req, res) => {
    try {

        let myData = await order.findOne({ "email": req.body.email })
        console.log("myData:", myData);
        res.json({ orderData: myData })

    } catch (error) {

        console.log("Server Error", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

})


module.exports = router;








// router.post('/Order_data', async (req, res) => {
//     let data = req.body.order_data
//     await data.splice(0, 0, { Order_date: req.body.Order_date })

//     //if email not existing in bd then create: else: InsertMany()
//     let eId = await order.findOne({ 'email': req.body.email })
//     console.log(eId)
//     if (eId === null) {
//         try {
//             await order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }

//     else {
//         try {
//             await order.findOneAndUpdate({ email: req.body.email },
//                 { $push: { order_data: data } }).then(() => {
//                     res.json({ success: true })
//                 })


//         } catch (error) {
//             res.send("Server Error", error.message)
//         }
//     }
// })
