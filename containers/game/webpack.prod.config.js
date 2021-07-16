const path = require("path");
const devOptions = require("./webpack.config");

module.exports = {
    ...devOptions,

    mode: "production"
};