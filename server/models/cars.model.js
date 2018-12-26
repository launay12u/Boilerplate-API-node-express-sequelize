/**
 * Cars Schema
 */

module.exports = (sequelize, DataTypes) => {
    const Cars = sequelize.define('Cars', {
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        registration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nbplace: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        paranoid: true,
        freezeTableName: true,
        tableName: 'Cars',
    });

    return Cars;
};
