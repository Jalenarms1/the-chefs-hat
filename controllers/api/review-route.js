const router = require("express").Router();
const { Review } = require("../../models");

router.post("/new/:id", async (req, res) => {
    try {
        let newReview = await Review.create({
            mealId: req.params.id,
            rating: req.body.rating,
            content: req.body.content
        })


        if(newReview.rating < 3){
            newReview.sendBadReview(req.body.ownerId, req.body.content);
        }

        console.log(newReview);
        res.json(newReview);

    } catch(err){
        console.log(err);
        res.json(err);
    }
})

module.exports = router;