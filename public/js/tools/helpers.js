var helpers = function () {
    var nav = $('.navbar')[0];
    requestAnimationFrame(navigationEffect);

    function navigationEffect() {
        if (window.scrollY >= 70) {
            nav.style.background = '#F6F6EF';
            nav.classList.add('nav-moveFromTopFade');
        } else {
            nav.classList.remove('nav-moveFromTopFade');
            nav.style.background = 'transparent';
        }

        requestAnimationFrame(navigationEffect);
    }

    $(window).scroll(function () {
        $('#bs-example-navbar-collapse-1').removeClass('in');
    });

    var getDataFromForm = function (form) {

        var formArray = form.serializeArray();

        var data = {};

        formArray.forEach(function (field) {
            data[field.name] = field.value;
        });
        return data;
    };

    var displayWithJade = function (container, fileName, data) {

        return Q($.get(fileName)).then(function (jadeString) {
            var renderedHtml = jade.render(jadeString, data);
            container.html(renderedHtml);
        })
    };

    return {
        displayWithJade: displayWithJade,
        getDataFromForm: getDataFromForm
    }
}();