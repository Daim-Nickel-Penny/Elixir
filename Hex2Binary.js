function hex2bin(hex) {
  return ("00000000" + parseInt(hex, 16).toString(2)).substr(-8);
}

var inp = "00f75d6ed67ec619794642f3b66073e4c61a5f64a34199bd133317f07b04f24f";
var inp2 = "003175f5741e47dc97b8e2d6806650b3f97476af83cf8e4d629e25565039bf8f";
var inp3 = "0023b478ed421a4575271e704fafab7d5abba46051560bfe27ca16a4609dc6d0";
console.log(hex2bin(inp3));
