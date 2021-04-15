// 验证重绘时间受哪些因素影响
console.time('time1')
requestAnimationFrame(
  () => {
    for(let i= 0; i< 10000; i++) {
      var p =  document.createElement('p');
      p.innerHTML = 'hhh' + i
      document.body.appendChild(p)
      p.style.height = '100px'
      p.style.color = 'red';
      p.style.margin = '-10px'
    }
    console.timeEnd('time1')
    console.time('第2帧')
    requestAnimationFrame(() => {
      console.timeEnd('第2帧')
    })
  }
)
/*
结果
1.在不操作dom的情况下第2帧耗时1-16ms之间
2.在大量dom操作后第2帧耗时150ms左右
3.查看性能分析结果
js:260ms
渲染:138ms
绘制:4ms
4.过一段时间后再打开页面，发现time1很久
*/

/**
 * 疑问：
 * 1.dom操作完成到下一次渲染中间的耗时成分？
 * 2.dom操作结束后，进行渲染+重绘，渲染的耗时(138)与第二帧触发(150)的时间非常接近，渲染是否就是回流？
 * 3.猜测：一帧=js宏任务+js微任务+空闲时间(requestIdleCallback)+渲染(回流)+requestAnimationFrame+重绘
 */

/**
 * 结论：
 * 1.dom操作完成后，浏览器不会立即刷新页面，而是需要做一些事情为下一次渲染做准备
 * 2.requestAnimationFrame在页面没展示的时候不会执行
 * 3.GUI和js线程确实是互斥的
 */