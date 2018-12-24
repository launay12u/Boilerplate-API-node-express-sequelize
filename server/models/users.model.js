/**
 * Users Schema
 */

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UrlLicence: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UrlIdentity: {
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
        tableName: 'Users',
    });

    Users.associate = (models) => {
        models.Users.belongsToMany(models.Users, {
            through: 'Sponsorship',
            as: 'users',
            foreignKey: 'User_id',
        });

        models.Users.hasMany(models.Vehicules, {
            foreignKey: 'Users_Id',
            as: 'vehicules',
        });
    };

    return Users;
};
