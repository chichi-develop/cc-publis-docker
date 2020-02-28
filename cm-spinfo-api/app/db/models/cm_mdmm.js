/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cm_mdmm', {
		md_idmdmm: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		md_cdcstm: {
			type: DataTypes.STRING(8),
			allowNull: false
		},
		md_nommrb: {
			type: DataTypes.INTEGER(3),
			allowNull: false
		},
		md_nmmmbr: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		md_txmdmm: {
			type: DataTypes.STRING(400),
			allowNull: false
		},
		md_fganch: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		md_clmdmm: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		md_ccadip: {
			type: DataTypes.STRING(15),
			allowNull: true
		},
		md_ccmodu: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATEONLY,
			allowNull: false
		}
	}, {
		tableName: 'cm_mdmm'
	});
};
