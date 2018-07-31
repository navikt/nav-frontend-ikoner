export function autobind(ctx: any) {
  Object.getOwnPropertyNames(ctx.constructor.prototype)
    .filter(prop => typeof ctx[prop] === "function")
    .forEach(method => {
      // eslint-disable-next-line
      ctx[method] = ctx[method].bind(ctx);
    });
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString()
    .substring(1);
}

export function guid() {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function mergeObject(mergeFn: any) {
  return (acc: any, element: any) => ({
    ...acc,
    ...mergeFn(element)
  });
}

/* eslint-disable */
export function throttle(fn: any, threshold = 250) {
  let last: any;
  let deferTimer: any;

  return function closure(this: any) {
    const context: any = this;

    const now = +new Date();
    const args = arguments;
    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
