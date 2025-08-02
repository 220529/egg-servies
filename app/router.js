/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/runFlow', controller.api.runFlow);
  router.get('/api/json', controller.api.getJson);
  router.get('/api/table', controller.api.fetchTableData);
};
