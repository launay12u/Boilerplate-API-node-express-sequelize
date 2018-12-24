/**
 * Vehicules Schema
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vehicules = sequelize.define('Vehicules', {
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
            tableName: 'Vehicules'
        });

        Vehicules.associate = function (models){
  
            models.Vehicules.belongsTo(models.Users, {
                foreignKey: 'Users_Id',
                as:'vehicules'
            });


        };

    return Vehicules;
};
