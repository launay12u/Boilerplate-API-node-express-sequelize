/**
 * Trucks Schema
 */

module.exports = (sequelize, DataTypes) => {
    const Trucks = sequelize.define('Trucks', {
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
        trailer_capacity: {
            type: DataTypes.STRING,
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
        tableName: 'Trucks',
    });

    Trucks.associate = (models) => {
        models.Trucks.belongsTo(models.Vehicules);
    };

    return Trucks;
};
