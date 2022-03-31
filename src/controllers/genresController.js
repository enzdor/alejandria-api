const db = require('../database/models')

module.exports = {
    list: async (req, res) => {
        let genres = await db.Genre.findAll({include: {all: true}})

        let response = {
            meta: {
                status: 200,
                total: genres.length,
                url: "api/genres",
            },
            data: genres
        }

        res.json(response)
    }
}