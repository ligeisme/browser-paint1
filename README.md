# browser-paint1
浏览器渲染-1
写了几个demo验证一些已知结论

# 结论汇总
* setTimeout存在10ms以内的误差范围
* setTimeout页面没展示的时候也会执行
* setTimeout和requestAnimation虽然都是宏任务，但是没有必然的先后顺序，他们都会被js阻塞，requestAnimation还会被渲染阻塞
* requestAnimationFrame在页面没展示的时候不会执行
* GUI和js线程确实是互斥的，js阻塞渲染
* innerHTML的消耗巨大，innerText并无优化，cssText的优化效果比较有限
* dom修改具有一定的副作用，这个副作用的计算量是dom操作代价体现,结合demo2得出，js计算量+dom副作用计算量+回流计算量是延迟重绘导致丢帧的主要因素

#js方面的渲染优化
## 一、动画卡顿为什么用requestAnimationFrame会好一点
requestAnimationFrame保证我在一帧内不做多余的计算，但是这并不能保证动画不卡，计算量太大会降低刷新频率，还是会造成卡顿
如果用setTimeout延迟会有这两个问题
1.延时太长，浪费设备性能，可能2帧才完成一次计算
2.延时太短，可能1帧内产生了2次计算，导致动画被加速

优化方案：
1.首先获取浏览器刷新评率评估性能
2.对于性能差的设备，简化动画降低计算量保证流畅度

#GUI层面的渲染优化
1.class替换，css合并
2.离线处理
3.提取顶级渲染层，尽量避免回流
4...

# 参考
https://www.cnblogs.com/chenyoumei/p/9156849.html
