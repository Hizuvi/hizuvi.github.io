const path = require("path");
const conf = require("./webpack.config");

module.exports = {
    ...conf, 
    mode: "production"
};