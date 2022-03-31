const db = require("../database/models")

module.exports = {
    createDelete: async (req, res) => {
        const isFavourite = await db.Favourite.findOne({where: {
            user_sub: req.body.user_sub,
            book_id: req.body.book_id
        }})

        if(isFavourite){

            await db.Favourite.destroy({where: {
                user_sub: req.body.user_sub,
                book_id: req.body.book_id
            }})
            console.log('done! deleted');
            res.send('done! deleted')
        } else {

            await db.Favourite.create({
                user_sub: req.body.user_sub,
                book_id: req.body.book_id
            })
            console.log('done! created');
            res.send('done! created')
        }
    },
    isFavourite: async (req, res) => {
        const isFavourite = await db.Favourite.findOne({where: {
            user_sub: req.body.user_sub,
            book_id: req.body.book_id
        }})

        console.log(isFavourite);
        res.send('done')
    }
}