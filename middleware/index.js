var Campground = require("../models/campground");
var Comment    = require("../models/comment");


var middlewareObj = {};

middlewareObj.checkCampgroundOwnerShip = function(req, res, next)
{

    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err)
            {
                req.flash("Something Went Wrong");
                res.redirect("back");
            }
            else {
                //Does user own the campground
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                }
                else {
                    req.flash("error, You Don't Have Permission");
                    res.redirect("back");
                }
            }
         });
    }
        else {
                req.flash("error", "You Are Not Logged In Please Login to Continue");
                res.redirect("back");
            }
}

middlewareObj.checkCommentOwnerShip = function(req, res, next)
{
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err)
                {
                    req.flash("Something Went Wrong");
                    res.redirect("back");
                }
                else 
                {
                    //Does user own the campground
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                }
                    else
                    {
                        req.flash("error, You Don't Have Permission");
                        res.redirect("back");
                    }
                }
            });
        }
            else 
            {
                req.flash("error", "You Are Not Logged In Please Login to Continue");
                res.redirect("back");
        }
}

middlewareObj.isLoggedIn = function(req, res, next)
    {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You Are Not Logged In Please Login to Continue");
        res.redirect("/login");
    }



module.exports = middlewareObj;