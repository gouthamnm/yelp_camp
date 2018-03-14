var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name: "Cloud's Rest",
    image: "http://www.wildnatureimages.com/images%203/060731-360..jpg",
    description: "Bacon ipsum dolor amet drumstick andouille tenderloin pancetta corned beef ribeye chuck turducken salami frankfurter brisket prosciutto. Brisket tenderloin capicola jerky porchetta kielbasa. Pork belly swine flank tongue. Shoulder rump tail jowl bacon. Pork chop brisket tail prosciutto sirloin. Rump venison shankle ham hock filet mignon picanha short loin doner shank. Tail sausage kielbasa frankfurter shankle filet mignon andouille, capicola picanha jerky meatloaf corned beef short loin."
},
{
    name: "Rajasthan desert",
    image: "http://www.wildnatureimages.com/images%203/060731-360..jpg",
    description: "Bacon ipsum dolor amet drumstick andouille tenderloin pancetta corned beef ribeye chuck turducken salami frankfurter brisket prosciutto. Brisket tenderloin capicola jerky porchetta kielbasa. Pork belly swine flank tongue. Shoulder rump tail jowl bacon. Pork chop brisket tail prosciutto sirloin. Rump venison shankle ham hock filet mignon picanha short loin doner shank. Tail sausage kielbasa frankfurter shankle filet mignon andouille, capicola picanha jerky meatloaf corned beef short loin."
},
{
    name: "Taj mahal",
    image: "http://www.wildnatureimages.com/images%203/060731-360..jpg",
    description: "Bacon ipsum dolor amet drumstick andouille tenderloin pancetta corned beef ribeye chuck turducken salami frankfurter brisket prosciutto. Brisket tenderloin capicola jerky porchetta kielbasa. Pork belly swine flank tongue. Shoulder rump tail jowl bacon. Pork chop brisket tail prosciutto sirloin. Rump venison shankle ham hock filet mignon picanha short loin doner shank. Tail sausage kielbasa frankfurter shankle filet mignon andouille, capicola picanha jerky meatloaf corned beef short loin."
}
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        // add a few campgrounds
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
            console.log(err);
            }
            else {
                console.log("Added a Campground");
                //create Comments
                Comment.create({
                    text: "This place is great for trucking and to enjoy with friends",
                    author: "Homer"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    }
                    else {
                        campground.comments.push(comment);
                        campground.save();
                            console.log("Created a new Comment");
                        
                    }
                });
                }
            });
        });
    });
}

module.exports = seedDB;