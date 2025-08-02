const { Controller } = require('egg');
const fs = require('fs');
const xlsx = require('node-xlsx');
class ApiController extends Controller {
    async runFlow() {
        const { ctx } = this;
        let body = ctx.request.body
        let jsData = fs.readFileSync(body.dataPath, 'utf8')
        // /api/open/runFlow
        // 输出获取到的数据
        const data = { ...body, data: jsData }
        try {
            const response = await ctx.app.curl(`${data.hostPre}/api/open/runFlow`, {
                method: 'POST',
                contentType: 'json',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Host': data.host,
                    'Connection': 'keep-alive',
                },
                data: data
            });
            console.log(response.data)
            ctx.body = response.data;
        } catch (error) {
            ctx.logger.error(error);
            ctx.body = { error: 'Failed to fetch data' };
        }

    }
    async runFlowApi(params) {
        const { ctx } = this;
        return await ctx.helper.callErpApi(ctx, params);
    }
    async getOrders() {
        const { ctx } = this;
        const response = await ctx.app.curl(`https://erp.tone.top/api/runFlow`, {
            method: 'POST',
            contentType: 'json',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYzMCwibmFtZSI6IuWImOWHr-asoyIsIm1vYmlsZSI6ImxreCIsImlzQWN0aXZlIjp0cnVlLCJzdXBwbGllcklkIjpudWxsLCJjb21wYW55SWQiOjAsImRlcGFydG1lbnRJZCI6IjAiLCJyb2xlcyI6IjEiLCJjdXJSb2xlIjoxLCJ3eHVzZXJpZCI6bnVsbCwiYXV0b0xvZ2luIjpmYWxzZSwicG9zaXRpb24iOiIiLCJwd2RWZXJzaW9uIjoyLCJsb2dpblRva2VuVHlwZSI6Ind4IiwibG9naW5SZXF1ZXN0SWQiOiIwOTY1MTc3NC1iNTIzLTRhY2QtODFkNS1jMTE3ZGQzOTVhNzUiLCJpYXQiOjE3NTM5Mjc1ODQsImV4cCI6MTc1NDUzMjM4NH0.6V7UJG5W_B5gt65AtFdNk2i4ZnqHyMycOxnBl-VX8Ts',
                'app-version': 'v1.1.91',
                'Accept': '*/*',
                'Connection': 'keep-alive',
            },
            timeout: 100000,
            data: {
                "flowId": "ag0aubcjvfkxgeph",
                "action": "bills",
                "companyId": 11,
            }
        });
        return response.data;
    }
    async getData(orderIds) {
        const { ctx } = this;
        const response = await ctx.app.curl(`https://erp.tone.top/api/runFlow`, {
            method: 'POST',
            contentType: 'json',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYzMCwibmFtZSI6IuWImOWHr-asoyIsIm1vYmlsZSI6ImxreCIsImlzQWN0aXZlIjp0cnVlLCJzdXBwbGllcklkIjpudWxsLCJjb21wYW55SWQiOjAsImRlcGFydG1lbnRJZCI6IjAiLCJyb2xlcyI6IjEiLCJjdXJSb2xlIjoxLCJ3eHVzZXJpZCI6bnVsbCwiYXV0b0xvZ2luIjpmYWxzZSwicG9zaXRpb24iOiIiLCJwd2RWZXJzaW9uIjoyLCJsb2dpblRva2VuVHlwZSI6Ind4IiwibG9naW5SZXF1ZXN0SWQiOiIwOTY1MTc3NC1iNTIzLTRhY2QtODFkNS1jMTE3ZGQzOTVhNzUiLCJpYXQiOjE3NTM5Mjc1ODQsImV4cCI6MTc1NDUzMjM4NH0.6V7UJG5W_B5gt65AtFdNk2i4ZnqHyMycOxnBl-VX8Ts',
                'app-version': 'v1.1.91',
                'Accept': '*/*',
                'Connection': 'keep-alive',
            },
            timeout: 100000,
            data: {
                "flowId": "ag0aubcjvfkxgeph",
                "action": "orders",
                "orderIds": orderIds
            }
        });
        return response.data;

    }
    async aaaa() {
        const { ctx } = this;
        const columns = [
            {
                "title": "合同号",
                "field": "合同号",
                "width": "230px"
            },
            {
                "title": "客户姓名",
                "field": "客户姓名",
                "width": "150px"
            },
            {
                "title": "店面",
                "field": "店面",
                "width": "150px"
            },
            {
                "title": "设计师",
                "field": "设计师",
                "width": "150px"
            },
            {
                "title": "套餐类型",
                "field": "套餐类型",
                "width": "150px"
            },
            {
                "title": "面积",
                "field": "面积",
                "width": "150px"
            },
            {
                "title": "房屋类型室厅厨卫",
                "field": "房屋类型室厅厨卫",
                "width": "150px"
            },
            {
                "title": "新房/老房",
                "field": "新房/老房",
                "width": "150px"
            },
            {
                "title": "签单额",
                "field": "签单额",
                "width": "150px"
            },
            {
                "title": "直接费/发包额",
                "field": "直接费/发包额",
                "width": "150px"
            },
            {
                "title": "客户电话",
                "field": "客户电话",
                "width": "150px"
            },
            {
                "title": "客户地址",
                "field": "客户地址",
                "width": "150px"
            },
            {
                "title": "工长",
                "field": "工长",
                "width": "150px"
            },
            {
                "title": "工长等级",
                "field": "工长等级",
                "width": "150px"
            },
            {
                "title": "首期结算时间",
                "field": "首期结算时间",
                "width": "150px"
            },
            {
                "title": "首期结算金额",
                "field": "首期结算金额",
                "width": "150px"
            },
            {
                "title": "中期结算时间",
                "field": "中期结算时间",
                "width": "150px"
            },
            {
                "title": "中期结算金额",
                "field": "中期结算金额",
                "width": "150px"
            },
            {
                "title": "中期增项金额",
                "field": "中期增项金额",
                "width": "150px"
            },
            {
                "title": "中期减项金额",
                "field": "中期减项金额",
                "width": "150px"
            },
            // {
            //     "title": "中期合计",
            //     "field": "中期合计",
            //     "width": "150px"
            // },
            {
                "title": "尾期结算时间",
                "field": "尾期结算时间",
                "width": "150px"
            },
            {
                "title": "尾期结算金额",
                "field": "尾期结算金额",
                "width": "150px"
            },
            {
                "title": "退单结算",
                "field": "退单结算",
                "width": "150px"
            },
            {
                "title": "质保金",
                "field": "质保金",
                "width": "150px"
            },
            {
                "title": "应急金",
                "field": "应急金",
                "width": "150px"
            },
            {
                "title": "辅材",
                "field": "辅材",
                "width": "150px"
            },
            {
                "title": "墙漆",
                "field": "墙漆",
                "width": "150px"
            },
            {
                "title": "罚款",
                "field": "罚款",
                "width": "150px"
            },
            {
                "title": "3D费用",
                "field": "3D费用",
                "width": "150px"
            },
            {
                "title": "窗台石",
                "field": "窗台石",
                "width": "150px"
            },
            {
                "title": "尾期增项",
                "field": "尾期增项",
                "width": "150px"
            },
            {
                "title": "A级补差",
                "field": "A级补差",
                "width": "150px"
            },
            {
                "title": "好评补助",
                "field": "好评补助",
                "width": "150px"
            },
            {
                "title": "499补贴",
                "field": "499补贴",
                "width": "150px"
            },
            {
                "title": "卫生间补贴",
                "field": "卫生间补贴",
                "width": "150px"
            },
            {
                "title": "其他补贴",
                "field": "其他补贴",
                "width": "150px"
            }
        ];
        const titles = columns.map(item => item.title);
        const fields = columns.map(item => item.field);
        const data = [titles];
        // const orderIds = [11830, 14215]?.reverse();
        let orderIds = await this.getOrders();
        orderIds = orderIds.data.map(item => item.targetId);
        orderIds.reverse();
        // orderIds = orderIds.slice(0, 200);
        // orderIds = [11599,11601]
        function splitArrayIntoChunks(arr, chunkSize = 10) {
            const result = [];
            for (let i = 0; i < arr.length; i += chunkSize) {
                result.push(arr.slice(i, i + chunkSize));
            }
            return result;
        }
        //获取总条数
        const orderIdDatas = splitArrayIntoChunks(orderIds, 50);
        // const res = await this.getData();
        // const count = res?.data?.count
        const totalPages = orderIdDatas?.length;
        this.ctx.helper.logTotalInfo(totalPages, '总计');
        for (let page = 0; page < totalPages; page++) {
            this.ctx.helper.logPageProgress(page + 1, totalPages, '当前');
            const list = await this.getData(orderIdDatas[page]);
            // console.log(list)
            list?.data?.forEach(item => {
                let arr = fields.map(field => {
                    return item[field]
                });
                data.push(arr);
            })

        }
        let excelData = [
            {
                name: "项目经理结算相关数据表",//sheet名字
                data: data
            },
        ];
        const buffer = xlsx.build(excelData);
        fs.writeFileSync('./项目经理结算相关数据表.xlsx', buffer);//第一个就是文件的名字
        this.ctx.helper.logTableData({ success: true, length: data.length - 1 }, 'Excel文件生成成功');
    }
    async getJson() {
        const { ctx } = this;
        const body = ctx.request.body

        this.aaaa()
        return 666
    }
    async fetchTableData() {
        const { ctx } = this;
        try {
            const res = await this.runFlowApi({
                "flowId": "ag0aubcjvfkxgeph",
                "action": "基材",
            });
            
            if (res?.code === 1 && res?.data?.length) {
                // 使用第一条数据的字段作为列定义，保持原始数据
                const firstItem = res.data[0];
                const columns = Object.keys(firstItem).map(field => ({
                    title: field,
                    field: field,
                }));
                
                const titles = columns.map(item => item.title);
                const fields = columns.map(item => item.field);
                const data = [titles];
                
                // 保持原始数据，不做处理
                res.data.forEach(item => {
                    let arr = fields.map(field => {
                        return item[field];
                    });
                    data.push(arr);
                });
                
                const title = "社区基材物料";
                const now = new Date();
                const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
                const fileName = `./${title}_${timestamp}.xlsx`;
                
                let excelData = [
                    {
                        name: title,
                        data: data
                    },
                ];
                const buffer = xlsx.build(excelData);
                fs.writeFileSync(fileName, buffer);
                
                this.ctx.helper.logTableData({ 
                    success: true, 
                    length: data.length - 1,
                    columns: columns 
                }, 'Excel文件生成成功');
                
                ctx.body = {
                    success: true,
                    // columns,
                    length: res.data.length,
                    // data: res.data
                };
            } else {
                ctx.body = {
                    success: false,
                    message: res?.message || '获取数据失败',
                    code: res?.code
                };
            }
        } catch (error) {
            console.error('fetchTableData error:', error);
            ctx.body = {
                success: false,
                message: '服务器内部错误',
                error: error.message
            };
        }
    }
}

module.exports = ApiController;
