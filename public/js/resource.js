'use strict';

function Resource(url, headers) {
    this.url = url;
    this.header = headers;
}

Resource.prototype.query = function () {
    return Q($.ajax({
        type: "GET",
        "url": this.url,
        "headers":this.header
  /*      dataType: "json"*/
    }));
};

Resource.prototype.update = function (id, data) {
    return Q($.ajax({
        type: "PUT",
        "headers": this.header,
        "url": this.url + "/" + id,
        "data": data,
        dataType: "json"
    }));
};

Resource.prototype.view = function (id) {
    return Q($.ajax({
        type: "GET",
        "url": this.url + "/" + id,
        "headers": this.header,
        dataType: "json"
    }));
};

Resource.prototype.create = function (data) {
    return Q($.ajax({
        type: "POST",
        "url": this.url + "/",
        "headers": this.header,
        "data": data,
        dataType: "json"
    }));
};

Resource.prototype.remove = function (id) {
    return Q($.ajax({
        type: "DELETE",
        "headers": this.header,
        "url": this.url + "/" + id,
        dataType: "json"
    }));
};
