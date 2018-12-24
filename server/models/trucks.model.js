/**
 * Trucks Schema
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Trucks = sequelize.define('Trucks', {
            Marque: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Couleur: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            immatriculation: {
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
            }
        },{
            paranoid: true,
            freezeTableName: true,
            tableName: 'Trucks'
        });

        Trucks.associate = function (models){
  
            models.Trucks.belongsTo(models.Vehicules);

        };

    return Trucks;
};
