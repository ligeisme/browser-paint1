export function nextTick (cb) {
  return new Promise((res) => {
    res();
  }).then(()=>{
    cb();
  })
}