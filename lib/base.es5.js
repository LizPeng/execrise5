function Base() {
    this.events = {}
}

//jQuery.extend简化版
function merge (a, b) {
    if(!b) return a
    for (var key in b) {
        a[key] = b[key]
    }
    return a
}
Base.extend = function (prototype, static) {
    var Super  = this
    function S() {}
    S.prototype = Super.prototype
    function Klass() {
        Super.call(this)
    }
    Klass.prototype = merge(new S, prototype)
    return merge(merge(Klass, Base), static);
}
//on 和trigger方法
var p = Base.prototype;
p.on = function(event, fn){
 (this.events[event] = this.events[event] || []).push(fn)
}
p.trigger = function(event, value){
    var self = this;
    (this.events[event] || []).forEach( fn => fn.call(self, value))
}
module.exports = Base
