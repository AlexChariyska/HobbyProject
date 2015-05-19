$(document).ready(function () {

    Router.addRoute({
        url: "/addRecipe",
        callback: AddRecipe.init
    });

    Router.addRoute({
        url: "/myRecipes",
        callback: MyRecipes.init
    });

    Router.addRoute({
        url: "/recipes",
        default: true,
        callback: RecipesApi.init
    });


    Router.init();

});