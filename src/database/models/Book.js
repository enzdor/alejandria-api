module.exports = (sequelize, dataTypes) => {
    let alias = 'Book';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        author: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING(1000),
            allowNull: false,
            unique: true
        },
        image: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        genre_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        user_sub: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        available: {
            type: dataTypes.STRING(10),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
    }
    const Book = sequelize.define(alias, cols, config);

    Book.associate = function(models) {
        Book.belongsTo(models.Genre, {
            as: "genre", 
            foreignKey: "genre_id"
        })
        Book.hasMany(models.Favourite, {
            as: 'favourite',
            foreignKey: "book_id"
        })
    }

    return Book
};