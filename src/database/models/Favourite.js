module.exports = (sequelize, dataTypes) => {
    let alias = 'Favourite';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        book_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        user_sub: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
    }
    const Favourite = sequelize.define(alias, cols, config);

    Favourite.associate = function(models){
        Favourite.belongsTo(models.Book, {
            as: 'book',
            foreignKey: 'book_id'
        })
    }

    return Favourite
};