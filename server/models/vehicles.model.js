/**
 * Vehicules Schema
 */

module.exports = (sequelize, DataTypes) => {
    const Vehicles = sequelize.define('Vehicles', {
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
        tableName: 'Vehicles',
    });

    Vehicles.associate = (models) => {
        models.Vehicles.belongsTo(models.Users, {
            foreignKey: 'Users_Id',
            as: 'vehicles',
        });

        models.Vehicles.belongsTo(models.Cars);
        models.Vehicles.belongsTo(models.Motos);
        models.Vehicles.belongsTo(models.Trucks);
    };

    return Vehicles;
};
