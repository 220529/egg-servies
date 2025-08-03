const { Controller } = require('egg');
const dayjs = require('dayjs');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const time = dayjs().format('YYYYMMDD_HHmmss')
    ctx.body = time;
  }
}

module.exports = HomeController;
