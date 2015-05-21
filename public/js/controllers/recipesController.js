var RecipesApi = (function () {

    var wrapper = $("#recipesList");

    var recipesResource = new Resource("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=<required>",
        {"X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"});

    var recipeCollection = {};

    var list = function () {
        return recipesResource.query().then(function (result) {
            displayRecipesList(result);
        });
    };


    var displayRecipesList = function (result) {
        wrapper.empty();
        if (result.hits.length != 0) {
            recipeCollection = result.hits;
            return helpers.displayWithJade(wrapper, "views/recipes.jade", {
                recipesFromApi: result.hits
            }).then(function () {
                addEventOnBtnsForMoreInfo()
            });

        } else {
            wrapper.append("No results were found! Try again")
        }
    };

    var addEventOnBtnsForMoreInfo = function () {
        for (var i = 0; i < recipeCollection.length; i++) {
            var dataId = recipeCollection[i].recipe.calories;
            $("[data-id='" + dataId + "']").click(function (event) {
                var recipe = findRecipeFromCollection(event.target.getAttribute('data-id'));
                return displayChosenRecipe(recipe)
            })
        }
    };

    var findRecipeFromCollection = function (searched) {
        for (var i = 0; i < recipeCollection.length; i++) {
            var lookedFrom = recipeCollection[i].recipe.calories;
            if (searched == lookedFrom) {
                return recipeCollection[i].recipe;
            }
        }
    };

    var displayChosenRecipe = function (data) {
        wrapper.empty();
        return helpers.displayWithJade(wrapper, "views/recipe.jade", {
            recipe: data
        });
    };

    var filterRequest = function (search) {
        var recipeFilter = new Resource("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=" + search,
            {"X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"});
        recipeFilter.query().then(function (result) {
            displayRecipesList(result)
        });
    };

    var init = function () {

        $("#search-btn").click(function () {
            var searchValue = $("#search-field").val().trim();
            filterRequest(searchValue);
        });

        $(".nav-stacked").click(function (event) {
            var value = event.target.getAttribute('data-value');
            filterRequest(value);
        });

        $(".nav-stacked").click(function (event) {
            var value = event.target.getAttribute('data-value');
            filterRequest(value);
        });

        $("#login-btn").click(function (event) {
            var name = $('#login-name').val();
            var password = $('#login-password').val();
            var logIn = new Resource("https://api.parse.com/1/login?username=" + name + "&password=" + password,
                {
                    "X-Parse-Application-Id": "7kj30heq0KxoNNjG1wyWB3kjsrlS8zu7WJs1ayLo",
                    "X-Parse-REST-API-Key": "Wxg26PjvySMaEAymeI3CVFjx6FZuocBo4TtdPGDz"
                });
            logIn.query().then(function (result) {
                sessionStorage.clear();
                sessionStorage.setItem("token", result.sessionToken);
                var name = $('#login-name').val('');
                var password = $('#login-password').val('');
                location.reload();
            });
        });


        if(sessionStorage.getItem('token')){
            $('.navbar-right').append("<li><a id='log-out' href=''>Log out</a></li>");
            $('#log-out').click(function(){
                sessionStorage.clear();
                location.reload();
            })
        }

        return list();

    };


    return {
        init: init,
        list: list,
        displayChosenRecipe: displayChosenRecipe,
        displayRecipesList: displayRecipesList,
        filterRequest: filterRequest
    };

}());
