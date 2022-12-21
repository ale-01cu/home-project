const { response } = require("express");

const home = (req, res = response) => {
    res.render("index");
    
};

module.exports = {
    home
}