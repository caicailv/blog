const fn = (md: any,options:any) => {
  console.log('f n');
  var _a, _b, _c, _d;
  var useNative = (_b = (_a = options === null || options === void 0 ? void 0 : options.useNative) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.useLoading) !== null && _b !== void 0 ? _b : true;
  var selector = (_c = options === null || options === void 0 ? void 0 : options.selector) !== null && _c !== void 0 ? _c : 'lazy';
  var prefix = (_d = options === null || options === void 0 ? void 0 : options.prefix) !== null && _d !== void 0 ? _d : '';
  var defaultImageRenderer = md.renderer.rules.image || function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
  };
  
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    var token = tokens[idx];
    // var src = typeof prefix === 'fun ction' ? prefix(srcValue) : prefix + srcValue;
    console.log('token',token);
    token.attrPush(['style', `margin-bottom:10px`]);
    return defaultImageRenderer(tokens, idx, options, env, self);
};
}
 
// 快速排序  



 
export default fn
