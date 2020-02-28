var express = require('express');
var router = express.Router();
var controllers = require('../../controllers/v1');

router.get('/cm_aclgs/:id(\\d+)', controllers.cm_aclg_controller.findAll);
router.post('/cm_aclgs', controllers.cm_aclg_controller.create);

router.get('/cm_mdmms/:id(\\d+)', controllers.cm_mdmm_controller.findAll);
router.post('/cm_mdmms', controllers.cm_mdmm_controller.create);
router.put('/cm_mdmms/:id(\\d+)/:no(\\d+)', controllers.cm_mdmm_controller.update);
router.delete('/cm_mdmms/:id(\\d+)/:no(\\d+)', controllers.cm_mdmm_controller.destroy);

module.exports = router;
