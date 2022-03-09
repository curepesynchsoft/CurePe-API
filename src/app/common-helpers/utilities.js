var bcrypt = require("bcrypt");

const GeneratePasskey = async (passkey) => {
  return bcrypt.hash(passkey, 10);
};

const ComparePassKey = async (passkey, hash) => {
  return bcrypt.compare(passkey, hash);
};

const GenerateOTP = ()=>{
  return Math.floor(100000 + Math.random() * 900000);
}
const GenerateUsername = (full_name)=>{
  let [first, last] = full_name.split(' ');
  return first+Math.floor(100000 + Math.random() * 900000);
}
const GenerateHealthid = ()=>{
  return Math.floor(100000+Math.random()*900000);
}

module.exports = { GeneratePasskey, ComparePassKey ,GenerateOTP,GenerateUsername,GenerateHealthid};
