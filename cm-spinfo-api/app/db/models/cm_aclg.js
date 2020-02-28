/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cm_aclg', {
		al_idactv: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		al_nmactv: {
			type: DataTypes.STRING(40),
			allowNull: false
		},
		al_noactv: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		al_dtactv: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		al_cdsqsk: {
			type: DataTypes.STRING(8),
			allowNull: true
		},
		al_nmsqsk: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		al_nmsqbu: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		al_nmsqtn: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		al_txactv: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		al_susury: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		al_kgtnka: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		al_kggoke: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		al_txbiko: {
			type: DataTypes.STRING(500),
			allowNull: true
		},
		al_cdcstm: {
			type: DataTypes.STRING(8),
			allowNull: true
		},
		al_nmcstm: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		al_nmtnbu: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		al_nmtnto: {
			type: DataTypes.STRING(200),
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
		tableName: 'cm_aclg'
	});
};
