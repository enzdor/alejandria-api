module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(200),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
    }
    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function(models) {
        Genre.hasMany(models.Book, {
            as: "books", 
            foreignKey: "genre_id"
        })
    }

    return Genre
};