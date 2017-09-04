
// 区分命令行输入读取不同配置
module.exports = function(env) {
    return require('./webpack.config.'+env+'.js')
};