'use strict';

$(document).ready(function () {
    var recipeCollection = {};
    var wrapper = $("#recipesList");

    helpers();

    var cookingResource = new Resource("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=<required>",
        {"X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"});

    cookingResource.query().then(function (result) {
        displayRecipesList(result);
    });

    $("#search-btn").click(function () {
        var searchValue = $("#search-field").val().trim();
        filterRequest(searchValue);
    });

    $(".nav-stacked").click(function (event) {
        var value = event.target.getAttribute('data-value');
        filterRequest(value);
    });


    function displayRecipesList(result) {
        wrapper.empty();
        if (result.hits.length != 0) {
            recipeCollection = result.hits;
            return displayWithJade(wrapper, "/views/recipes.jade", {
                recipes: result.hits
            }).then(function () {
                addEventOnBtnsForMoreInfo()
            });

        } else {
            wrapper.append("No results were found! Try again")
        }
    }

    function addEventOnBtnsForMoreInfo() {
        for (var i = 0; i < recipeCollection.length; i++) {
            var dataId = recipeCollection[i].recipe.calories;
            $("[data-id='" + dataId + "']").click(function (event) {
                var recipe = findRecipeFromCollection(event.target.getAttribute('data-id'));
                return displayRecipe(recipe)
            })
        }
    }

    function findRecipeFromCollection(searched) {
        for (var i = 0; i < recipeCollection.length; i++) {
            var lookedFrom = recipeCollection[i].recipe.calories;
            if (searched == lookedFrom) {
                return recipeCollection[i].recipe;
            }
        }
    }

    function displayRecipe(data) {
        wrapper.empty();
        return displayWithJade(wrapper, "/views/recipe.jade", {
            recipe: data
        });
    }

    function filterRequest(search) {
        var cookingFilter = new Resource("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=" + search,
            {"X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"});
        cookingFilter.query().then(function (result) {
            displayRecipesList(result)
        });
    }

    var yodaResource = new Resource("https://yoda.p.mashape.com/yoda?sentence=You+will+learn+how+to+speak+like+me+someday.++Oh+wait.",
        {"X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"});


    $("#yoda").click(function (event) {
        event.preventDefault();
        wrapper.empty();
        yodaResource.query().then(function (result) {
            return displayWithJade(wrapper, "/views/yoda.jade", {
                sentence: result
            });
        }).then(function () {
            addEventForYoda()
        });
    });

    function addEventForYoda() {
        $("#submit-btn").click(function (event) {
            event.preventDefault();
            var value = $('#sentence').val();
            if(value === ""){
                return yodaSentenceRequest("You must write something!");
            }
            return yodaSentenceRequest(value);
        });
    }

    function yodaSentenceRequest(search) {
        var yodaResourceNew = new Resource("https://yoda.p.mashape.com/yoda?sentence=" + search,
            {"X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"});

       return yodaResourceNew.query().then(function (result) {
            return displayWithJade(wrapper, "/views/yoda.jade", {
                sentence: result
            }).then(function () {
                addEventForYoda()
            });
        });
    }

    function displayWithJade(container, fileName, data) {

        return Q($.get(fileName)).then(function (jadeString) {

            var renderedHtml = jade.render(jadeString, data);
            container.html(renderedHtml);
        })
    }
});
