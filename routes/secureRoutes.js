const express = require('express');
const Company = require('../models/companyModel');
const router = express.Router();



//API Route /api/companies/
//GET: Getting all companies from DB
//POST: Creating a new company and storing it at DB
router.route('/')
    .get((req, res) => {
        Company.find({}, (err, companies) => {
            res.json(companies)
            console.log("Getting all companies");
            res.end();
        })  
    })
    
    .post((req,res) => {
      let company = new Company(req.body);
      company.save()
      res.status(201).send(company)
      console.log("Company added to DB");
      res.end();
    })

//Route /api/companies/:companyId
//GET: Getting the company with _id property equals to :companyId
//PUT: Updating the company with _id property equals to :companyId
//PATCH: Updating some specific properties from the company with _id property equals to :companyId
//DELETE: Removing the company with _id property equals to :companyId form DB

//This method is a middleware that allow us module better our code and dont repeat many time the interaction 
//with DB for retrieve the company
router.use('/:companyId', (req, res, next)=>{
    Company.findById( req.params.companyId, (err,company)=>{
        if(err)
            res.status(500).send(err);
        else {
            req.company = company;
            next();
        }
    })

})


router.route('/:companyId')
    .get((req, res) => {
        res.json(req.company)
        console.log("Trying to get company with id: ", req.params.companyId);
        res.end(); 
    })
    .put((req,res) => {
        req.company.name = req.body.name;
        req.company.permalink = req.body.permalink;
        req.company.crunchbase_url = req.body.crunchbase_url;
        req.company.homepage_url = req.body.homepage_url;
        req.company.blog_url = req.body.blog_url;
        req.company.blog_feed_url = req.body.blog_feed_url;
        req.company.twitter_username = req.body.twitter_username;
        req.company.category_code = req.body.category_code;
        req.company.number_of_employees = req.body.number_of_employees;
        req.company.founded_year = req.body.founded_year;
        req.company.founded_month = req.body.founded_month;
        req.company.founded_day = req.body.founded_day;
        req.company.deadpooled_year = req.body.deadpooled_year;
        req.company.tag_list = req.body.tag_list;
        req.company.alias_list = req.body.alias_list;
        req.company.email_address = req.body.email_address;
        req.company.phone_number = req.body.phone_number;
        req.company.description = req.body.description;
        req.company.created_at = req.body.created_at;
        req.company.updated_at = req.body.updated_at;
        req.company.overview = req.body.overview;
        req.company.products = req.body.products;
            

        req.company.save();
        res.json(req.company);

        console.log("Trying to update company with id: ", req.params.companyId);
        res.end(); 
    })
    .patch((req,res)=>{
        if(req.company._id){
            delete req.body._id;
        }
        for( let b in req.body ){
            req.company[b] = req.body[b];
        }
        req.company.save();
        res.json(req.company);

        console.log("Trying to patch company with id: ", req.params.companyId);
        res.end(); 
    })
    .delete((req,res)=>{
        req.company.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
        console.log("Trying to delete company with id: ", req.params.companyId);
         
        
    })

    module.exports = router;