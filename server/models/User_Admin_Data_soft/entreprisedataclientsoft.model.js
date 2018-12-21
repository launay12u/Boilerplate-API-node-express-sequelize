/**
 * EntrepriseDataClientSoft Schema
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const EntrepriseDataClientSoft = sequelize.define('EntrepriseDataClientSoft', {
            NomEnt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            RaisonSocialeEnt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            SiretEnt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            MailContactEnt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            TelEnt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            UrlLogoEnt: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            NumClient: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            CompltAddrsEnt: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            NumLibEnt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            VilleEnt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            CpEnt: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            LatAddrsEnt:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            LongAddrsEnt: {
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
            }
        },{
            paranoid: true,
            freezeTableName: true,
            tableName: 'EntrepriseDataClientSoft'
        });

        EntrepriseDataClientSoft.associate = function (models){

            EntrepriseDataClientSoft.belongsTo(models.CorpsEtat, {
                foreignKey: 'CorpsEtat_CorpsEtatID',
                as:'Corpsetat'
              });
        };

        

    return EntrepriseDataClientSoft;
};
