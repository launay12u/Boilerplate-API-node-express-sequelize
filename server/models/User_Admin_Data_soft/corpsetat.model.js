/**
 * CorpsEtat Schema
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const CorpsEtat = sequelize.define('CorpsEtat', {
            DetailCorpsEtat: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
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
            tableName: 'CorpsEtat'
        });

        CorpsEtat.associate = function (models){
  
            CorpsEtat.hasMany(models.EntrepriseDataClientSoft, {
                foreignKey: 'CorpsEtat_CorpsEtatID',
                as: 'corpsetat'
            });

        };

    return CorpsEtat;
};
