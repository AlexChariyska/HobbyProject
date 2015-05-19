var AddRecipe = (function () {

    var wrapper = $("#recipesList");

    var myRecipes = new Resource("https://api.parse.com/1/classes/Recipes",
        {
            "X-Parse-Application-Id": "7kj30heq0KxoNNjG1wyWB3kjsrlS8zu7WJs1ayLo",
            "X-Parse-REST-API-Key": "Wxg26PjvySMaEAymeI3CVFjx6FZuocBo4TtdPGDz"
        });


    var addRecipe = function (data) {
        $("#add-recipe").click(function (event) {
            event.preventDefault();
            var data = JSON.stringify(helpers.getDataFromForm($('#add-form')));
            myRecipes.create(data).then(function () {
                return displayForm();
            })
        });
    };

    var displayForm = function () {
        return helpers.displayWithJade(wrapper, "views/add-recipe.jade", {})
            .then(function(){addRecipe()});
    };


    var init = function () {
        addRecipe();

        return displayForm()
    };


    return {
        init: init,
        displayForm: displayForm,
        addRecipe: addRecipe
    };

}());

