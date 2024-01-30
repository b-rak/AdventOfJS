
let re = /[^0-9]/
let test = "aaslödkms§(/$&dfaasdlkn123897asdkjn"

console.log(re.test(test))
console.log(test.match(re))
test = test.replaceAll(/[^0-9]/g, "")
console.log(test.replaceAll(/[^0-9]/g, ""))