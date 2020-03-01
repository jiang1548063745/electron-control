/**
 * 托盘和菜单
 */

if(process.platform === 'darwin') {
    require('./darwin.js')  // MAC
} else if (process.platform === 'win32') {
    require('./win32.js')   // WINDOWS
} else {
  // 不处理  
}