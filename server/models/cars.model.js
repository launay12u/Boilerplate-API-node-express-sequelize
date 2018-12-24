/**
 * Cars Schema
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Cars = sequelize.define('Cars', {
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
            tableName: 'Cars'
        });

        Cars.associate = function (models){
  

            models.Cars.belongsTo(models.Vehicules);

        };

    return Cars;
};
