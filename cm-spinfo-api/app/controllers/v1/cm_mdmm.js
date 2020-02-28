var models = require('../../db/models');

const path = require('path');
const basename = path.basename(__filename);
var log4js = require('log4js');
var logger = log4js.getLogger(basename);

exports.findAll = async (req, res, next) => {
  await models.cm_mdmm.findAll ({
    where: {
      md_cdcstm: req.params.id
    }
  })
  .then(result => {
    if (result.length === 0) {
      res.status(404).json({message: 'Not Found Data'});
      logger.info(`Searched: md_cdcstm:${req.params.id},message: Not Found Data`);
    } else {
      res.status(200).json({cm_mdmms: result});
      logger.info(`Searched: md_cdcstm:${req.params.id}`);
    }
  })
  .catch(error => {
    res.status(500).json({message: error.message});
    logger.error(`Searched: md_cdcstm:${req.params.id},message:${error.message}`);
  });
}

exports.destroy = (req, res, next) => {
  models.sequelize.transaction(async (t) => {
    const beforeData = await models.cm_mdmm.findAll ({
      where: {
        md_cdcstm: req.params.id,
        md_nommrb: req.params.no
      }
    })
    if (beforeData.length === 0) {
      res.status(404).json({message: 'Not Found Data'});
    } else {
      const headerip = getip(req)
      await models.cm_mdmm.destroy({
        where: {
          md_cdcstm: req.params.id,
          md_nommrb: req.params.no
        }
      },{transaction: t}).then((result) => {
        res.status(204).json({message: 'Deleted'});
      }).catch((error) => {
        res.status(500).json({message: error.message});
      })
      logger.info(`Deleted: md_cdcstm:${req.params.id}、md_nommrb:${req.params.no}、ip:${headerip}`)
    }
  })
};

exports.create = (req, res, next) => {
  models.sequelize.transaction(async (t) => {
    const maxNo = await models.cm_mdmm.max('md_nommrb', {where : {'md_cdcstm': req.body.md_cdcstm }})
    var renban = !maxNo ? 1 : maxNo + 1
    data = req
    const headerip = getip(req)
    data.body.md_nommrb = renban
    data.body.md_ccadip = headerip
    await models.cm_mdmm.create(data.body,{
    },{transaction: t}).then((result) => {
      res.status(201).json({message: 'Created'});
    }).catch((error) => {
      res.status(500).json({message: error.message});
    })
    logger.info(`create: md_cdcstm:${req.body.md_cdcstm}、md_nommrb:${renban}`);
  });
};

exports.update = (req, res, next) => {
  models.sequelize.transaction(async (t) => {
    const beforeData = await models.cm_mdmm.findAll ({
      where: {
        md_cdcstm: req.params.id,
        md_nommrb: req.params.no
      }
    })
    if (beforeData.length !== null) {
      data = req
      const headerip = getip(req)
      data.body.md_idmdmm = beforeData.md_idmdmm
      data.body.md_cdcstm = req.params.id
      data.body.md_nommrb = req.params.no
      data.body.md_ccadip = headerip
      await models.cm_mdmm.update(data.body,{
        where: {
          md_cdcstm: req.params.id,
          md_nommrb: req.params.no
        }
      },{transaction: t}).then((result) => {
        res.status(204).json({message: 'Updated'});
      }).catch((error) => {
        res.status(500).json({message: error.message});
      })
      logger.info(`Updated: md_cdcstm:${req.params.id}、md_nommrb:${req.params.no}`)
    } else {
      res.status(404).json({message: 'Not Found Data'});
    }
  })
};

function getip(req) {
  var headerip = req.headers ? getheaderip(req) : 'unknown'
  if (headerip.length > 15) {headerip = headerip.match(/\d+\.\d+\.\d+\.\d/g)[0]}
  return headerip
  function getheaderip(req) {
    return req.headers['x-forwarded-for']
    ? req.headers['x-forwarded-for']
    : (req.connection && req.connection.remoteAddress)
    ? req.connection.remoteAddress
    : (req.connection.socket && req.connection.socket.remoteAddress)
    ? req.connection.socket.remoteAddress
    : (req.socket && req.socket.remoteAddress)
    ? req.socket.remoteAddress
    : '0.0.0.0';
  }
}