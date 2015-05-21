var MyRecipes = (function () {

    var wrapper = $("#recipesList");

    function updateHeader(){
        var currentUser = sessionStorage.getItem("token");

        return myRecipes = new Resource("https://api.parse.com/1/classes/Recipes",
            {
                "X-Parse-Application-Id": "7kj30heq0KxoNNjG1wyWB3kjsrlS8zu7WJs1ayLo",
                "X-Parse-REST-API-Key": "Wxg26PjvySMaEAymeI3CVFjx6FZuocBo4TtdPGDz",
                "X-Parse-Session-Token": currentUser
            });
    }

    myRecipes = updateHeader();


    var displayMyRecipes = function(){
        wrapper.empty();
        myRecipes = updateHeader();
        myRecipes.query().then(function (result) {
            return helpers.displayWithJade(wrapper, "views/myRecipes.jade", {
                recipes: result.results
            });

        },function(){
            $("#recipesList").append("You are not logged in or authorized :) ")
        }).then(function () {

            removeRecipe();
            editRecipe();
        });
    };


    var removeRecipe =  function () {
        $(".recipe_remove").click(function (event) {
            var value = event.target.getAttribute('data-id');

            myRecipes.remove(value);
            displayMyRecipes();
        });
    };

    var editRecipe = function (){
        $(".recipe_edit").click(function (event) {
            var value = event.target.getAttribute('data-id');

            myRecipes.view(value)
                .then(function (result) {
                    return helpers.displayWithJade(wrapper, "views/edit-recipe.jade", {
                        recipe: result
                    });
                }).then(function(){
                    $("#submit-edit").click(function (event) {
                        event.preventDefault();
                        var value = event.target.getAttribute('data-id');
                        var data = JSON.stringify(helpers.getDataFromForm($('#edit-form')));
                        myRecipes.update(value, data).then(function(){
                            displayMyRecipes();
                        })
                    });
                });
        });
    };

    var init = function () {
        $("#myRecipes").click(function (event) {
            event.preventDefault();
            displayMyRecipes()
        });

        return displayMyRecipes();
    };


    return {
        init: init,
        editRecipe: editRecipe,
        removeRecipe: removeRecipe,
        displayMyRecipes: displayMyRecipes
    };

}());
