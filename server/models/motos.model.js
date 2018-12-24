/**
 * Motos Schema
 */

module.exports = (sequelize, DataTypes) => {
    const Motos = sequelize.define('Motos', {
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
        },
    }, {
        paranoid: true,
        freezeTableName: true,
        tableName: 'Motos',
    });

    Motos.associate = (models) => {
        models.Motos.belongsTo(models.Vehicules);
    };

    return Motos;
};
