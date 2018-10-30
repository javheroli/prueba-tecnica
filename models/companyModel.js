const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const companyModel = new Schema({
    name: { type: String },
    permalink: { type: String   },
    crunchbase_url: { type: String },
    homepage_url: { type: String   },
    blog_url: { type: String },
    blog_feed_url: { type: String   },
    twitter_username: { type: String },
    category_code: { type: String   },
    number_of_employees: { type: Number },
    founded_year: { type: Number   },
    founded_month: { type: Number },
    founded_day: { type: Number   },
    deadpooled_year: { type: Number },
    tag_list: { type: String   },
    alias_list: { type: String },
    email_address: { type: String   },
    phone_number: { type: String },
    description: { type: String   },
    created_at: { type: Date },
    updated_at: { type: Date   },
    overview: { type: String },
    products: { type: Array },
})
module.exports = mongoose.model('company', companyModel)
