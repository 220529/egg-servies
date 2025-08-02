const fs = require('fs');

module.exports = {
  /**
   * 调用 ERP API
   * @param {Object} ctx - egg context
   * @param {Object} params - API 参数
   * @returns {Promise<Object>} API 响应结果
   */
  async callErpApi(ctx, params) {
    const Authorization = fs.readFileSync(__dirname + 'Authorization.txt', 'utf8').trim();
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
  }
}; 