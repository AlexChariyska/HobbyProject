$(document).ready(function(){

    Router.addRoute({
        url: "/myRecipes",
        callback: MyRecipes.init
    });

    Router.addRoute({
        url: "/recipes",
        callback: RecipesApi.init
    });

    Router.init();

});