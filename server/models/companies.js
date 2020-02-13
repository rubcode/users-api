const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companiesSchema = new Schema({
    name: String,
    nivel: Number,
    logo: String,
    active:{
        type: Boolean,
        default: 1
    }
},{timestamps:true});

const Companies = mongoose.model('Companies',companiesSchema);

module.exports= {
    Companies
}


