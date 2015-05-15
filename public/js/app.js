var app = function(){

    var ctrls = {};

    var router = Router();

    var routes = [{
        url: "/recipes",
        default: true,
        ctrl: "recipesController"
    },{
        url: "/myRecipes",
        ctrl: "recipesController"
    }];

    var init = function(){

        routes.forEach(function(route){
            if(typeof route.ctrl === "string" && ctrls[route.ctrl]){
                route.callback = ctrls[route.ctrl].init
            }
            router.addRoute(route);
        });

        router.init();

    };

    var addCtrl = function(name, ctrl){
        ctrls[name] = ctrl;
    };

    return {
        init: init,
        addCtrl: addCtrl
    }

}();