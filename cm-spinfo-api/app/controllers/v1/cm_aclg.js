var models = require('../../db/models');

const path = require('path');
const basename = path.basename(__filename);
var log4js = require('log4js');
var logger = log4js.getLogger(basename);

exports.findAll = async (req, res, next) => {
  await models.cm_aclg.findAll ({
    where: {
      al_cdsqsk: req.params.id
    }
  })
  .then(result => {
    if (result.length === 0) {
      res.status(404).json({message: 'Not Found Data'});
      logger.info(`Searched: al_cdcstm:${req.params.id},message: Not Found Data`);
    } else {
      res.status(200).json({cm_aclgs: result});
      logger.info(`Searched: al_cdcstm:${req.params.id}`);
    }
  })
  .catch(error => {
    res.status(500).json({message: error.message});
    logger.error(`Searched: al_cdcstm:${req.params.id},message:${error.message}`);
  });
}

exports.create = (req, res, next) => {
  models.sequelize.transaction(async (t) => {
    await models.cm_aclg.create(req.body,{
    },{transaction: t}).then((result) => {
      res.status(201).json({message: 'Created'});
    }).catch((error) => {
      res.status(500).json({message: error.message});
    })
    logger.info(`create: al_cdcstm:${req.body.al_cdcstm}、al_nmactv:${req.body.al_nmactv}、al_noactv:${req.body.al_noactv}`);
  });
};