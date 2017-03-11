/* 
 */

(function() {
  var module = QUnit.module;
  
  module("utilities");
  
  test("zeroPad", function(){
      var str = Crafty.Utilities.zeroPad(123, 5);
      strictEqual(str, "00123", "ok");
      
      str = Crafty.Utilities.zeroPad(123, 0);
      strictEqual(str, "123", "ok");
  });
}());
