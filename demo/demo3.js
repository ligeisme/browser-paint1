// dom操作耗时

for(let i= 0; i< 10000; i++) {
  var p =  document.createElement('p');
  document.body.appendChild(p)
}
var ps =  document.getElementsByTagName('p');
// 因为文字没有溢出，此时scrollWidth为80和offsetWidth一样
console.log('scrollWidth1',ps[1].scrollWidth);
console.time('dom修改')
ps.forEach((p, index) => {
  // p.innerHTML = '测试测试测试测试测试'
  // p.innerText = '测试测试测试测试测试'
  // p.style.height = '80px';
  // p.style.color = 'red';
  // p.style.marginLeft = '10px'
  // p.style.paddingBottom = '10px'
  ////通过cssText修改平均耗时30ms
  p.style.cssText = 'height:80px;color:red;margin-left:10px;padding-bottom:10px'
  if(index === 1){
    // 修改文字导致文字溢出，此时scrollWidth为160px，说明对dom的修改会有立即造成一定的副作用，这些副作用是会阻塞js的，但是这个副作用并不是回流
    console.log('scrollWidth2',ps[1].scrollWidth);
  }
})
console.timeEnd('dom修改')

/**
 * 结果
 * 1.只innerHTML或innerText修改耗时1.3s左右，非常久
 * 2.一个一个修改css耗时50ms左右
 * 3.cssText修改耗时45ms左右
 *
 */

/**
 * 结论
 * 1.innerHTML的消耗巨大，有较大的优化空进，innerText并无优化，而cssText的优化比较有限
 * 2.dom修改具有一定的副作用，这个副作用的计算量是dom操作代价的提现,结合demo2得出，js计算量+dom副作用计算量+回流计算量是阻塞渲染的主要因素
 */