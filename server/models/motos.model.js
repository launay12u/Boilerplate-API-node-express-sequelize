/**
 * Motos Schema
 */

module.exports = (sequelize, DataTypes) => {
    const Motos = sequelize.define('Motos', {
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
        displacement: {
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
        tableName: 'Motos',
    });

    Motos.associate = (models) => {
        models.Motos.belongsTo(models.Vehicules);
    };

    return Motos;
};
