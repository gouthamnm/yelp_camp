var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");

//campground index route
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            req.flash("error", "Something Went Wrong");
            res.render("back");
        } 
        else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
    
});

//campground create route
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampgrounds = {name: name, image: image, description: description, author: author}
    Campground.create(newCampgrounds, function(err, newCamp){
        if(err){
            req.flash("error", "Something Went Wrong");
           res.render("back");
        }
        else {
            req.flash("success", "Campground Created Successfully");
            res.redirect("/campgrounds");
        }
    });
    
    

});

//camground new route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
});


//Show route
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec (function(err, foundCampground){
        if(err){
            req.flash("error", "Something Went Wrong Please Try After Sometime")
            res.render("back");
        }
        else {
        //console.log(foundCampground);
        //render show template with that campgrounds
        res.render("campgrounds/show", {campground: foundCampground });
        }
    });
    
});

//Edit

router.get("/:id/edit", middleware.checkCampgroundOwnerShip, function(req, res){

        Campground.findById(req.params.id, function(err, foundCampground){
            if(err)
            {
                req.flash("error", "Campground Not Found");
                res.render("back");
            }
            else {
            res.render("campgrounds/edit", {campground: foundCampground});
            }
        });    
    });     


//UPDATE
router.put("/:id", middleware.checkCampgroundOwnerShip, function(req, res){

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err)
        {
            req.flash("error", "Something Went Wrong");
            res.redirect("/campgrounds");
        }
        else 
        {
            req.flash("success", "Campground Updated Successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy Campground route
router.delete("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            req.flash("error", "Something Went Wrong");
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success", "Campground Removed Successfully");
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;