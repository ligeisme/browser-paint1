// 验证setTimout精确度
console.time('主线程结束')
new Promise((res) => {
  res()
}).then(() => {
  console.timeEnd('主线程微任务结束')
})
requestAnimationFrame(() => {
  console.timeEnd('主线程转宏任务2')
})
// 假设timeout0是最快的宏任务
setTimeout(() => {
  console.timeEnd('主线程转宏任务1')
}, 0)
setTimeout(() => {
  console.timeEnd('timeout10')
}, 10)
setTimeout(() => {
  console.timeEnd('timeout20')
}, 20)
setTimeout(() => {
  console.timeEnd('timeout100')
}, 100)
console.timeEnd('主线程结束')
console.time('timeout10')
console.time('timeout20')
console.time('timeout100')
console.time('主线程微任务结束')
console.time('主线程转宏任务2')
console.time('主线程转宏任务1')


/*
结果
0.主线程耗时在0.2ms左右，对timeout无影响
1.10ms在10-20间波动
2.20ms在20-25之间波动
3.100ms在92-101间波动
4.主线程结束后0.1ms左右开始执行微任务
5.主线程结束后1-10ms内执行宏任务2，
5.主任务执行完后过了10-17ms左右才开始执行第一个宏任务setTimeout0然后即将很快执行seTimeout10
6.修改后过一段时间再打开页面发现时间变得很长
*/
/*
问题：
1.同样是宏任务，在主线程空闲的情况下requestAnimationFrame立即执行了，而setTimeout0则在10ms后执行，目的是什么？
*/
/*结论：
  1.setTimeout存在10ms以内的误差范围
  2.setTimeout页面没展示的时候也会执行
*/