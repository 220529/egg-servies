const { Controller } = require('egg');

class JsonController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, json';
    }
    async getJson() {
        const { ctx } = this;
        const res = await ctx.helper.flow({
            "flowId": "ag0aubcjvfkxgeph",
            "action": "基材"
        })
        const filePath = ctx.helper.exportToExcel({
            title: '基材',
            data: res.data
        })
        ctx.body = {
            success: true,
            filePath
        }
    }
}

module.exports = JsonController;    