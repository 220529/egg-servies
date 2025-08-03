const fs = require('fs');
const xlsx = require('node-xlsx');
const dayjs = require('dayjs');

module.exports = {
  /**
   * 调用 ERP API
   * @param {Object} ctx - egg context
   * @param {Object} params - API 参数
   * @returns {Promise<Object>} API 响应结果
   */
  async flow(params) {
    const { ctx } = this
    const Authorization = fs.readFileSync(__dirname + '/Authorization.txt', 'utf8').trim();
    try {
      const response = await ctx.app.curl(`https://erp.tone.top/api/runFlow`, {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Authorization,
          'app-version': 'v1.1.91',
          'Accept': '*/*',
          'Connection': 'keep-alive',
        },
        timeout: 100000,
        data: params
      });
      
    //   console.log('ERP API 响应:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('ERP API 调用失败:', error);
      throw error;
    }
  },

  /**
   * 打印表格数据信息
   * @param {Object} data - 表格数据
   * @param {string} title - 标题
   */
  logTableData(data, title = '表格数据') {
    console.log(`\n=== ${title} ===`);
    if (data?.success) {
      console.log(`数据条数: ${data.length || 0}`);
      console.log(`列数: ${data.columns?.length || 0}`);
      if (data.columns?.length > 0) {
        console.log('列名:', data.columns.map(col => col.title).join(', '));
      }
    } else {
      console.log('获取数据失败:', data?.message || '未知错误');
    }
    console.log('================\n');
  },

  /**
   * 打印分页处理信息
   * @param {number} currentPage - 当前页
   * @param {number} totalPages - 总页数
   * @param {string} action - 操作描述
   */
  logPageProgress(currentPage, totalPages, action = '处理') {
    console.log(`----------${action}第${currentPage}/${totalPages}页----------`);
  },

  /**
   * 打印总数信息
   * @param {number} total - 总数
   * @param {string} description - 描述
   */
  logTotalInfo(total, description = '总计') {
    console.log(`----------${description}${total}条----------`);
  },

  /**
   * 导出数据到Excel文件
   * @param {string} title - 表格标题
   * @param {Array} data - 数据数组，每个元素应该是一个对象
   * @returns {string} 导出的文件路径
   */
  exportToExcel({title, data}) {
    // 获取第一条数据的keys作为表头
    const headers = Object.keys(data[0]);

    // 生成文件名
    const timestamp = dayjs().format('YYYYMMDD_HHmmss');
    const fileName = `${title}_${timestamp}.xlsx`;
    const filePath = `./data/${fileName}`;

    // 准备Excel数据
    const excelData = [headers]; // 第一行是表头

    // 添加数据行
    data.forEach(item => {
      const row = headers.map(header => item[header]);
      excelData.push(row);
    });

    // 创建Excel文件
    const buffer = xlsx.build([{
      name: title,
      data: excelData
    }]);

    // 确保data目录存在
    if (!fs.existsSync('./data')) {
      fs.mkdirSync('./data', { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(filePath, buffer);

    console.log(`Excel文件已导出: ${filePath}`);
    return filePath;
  }
}; 