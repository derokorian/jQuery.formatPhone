(function ($) {
    $.fn.Format = function (type) {
        type = type.toLowerCase();
        if (type == 'phone') {
            return this.on("blur.Format", function () {
                var val = $(this).val().replace(/[^a-zA-Z0-9]+/g,'');
                var prefix = "";
                if (val.length > 0) {
                    if (val.substring(0, 1) == "1") {
                        prefix = "1";
                        val = val.substring(1);
                    }
                    if (val.substring(0, 1) != "(") {
                        val = "(" + val;
                    }
                    if (val.length > 4 && val.substring(4, 5) != ")") {
                        val = val.substring(0, 4) + ")" + val.substring(4);
                    }
                    if (val.length > 8 && val.substring(8, 9) != "-") {
                        val = val.substring(0, 8) + "-" + val.substring(8);
                    }
                    if (val.length > 13 && val.substring(13, 14) != " ") {
                        val = val.substring(0, 13) + " " + val.substring(13);
                    }
                }
                $(this).val(prefix + val);
            });
        } else if (type == 'ssn') {
            return this.on("blur.Format", function () {
                var val = $(this).val().replace(/[^0-9]+/g,'');
                if (val.length > 0) {
                    if (val.length > 3 && val.substring(3, 1) != "-") {
                        val = val.substring(0, 3) + "-" + val.substring(3);
                    }
                    if (val.length > 6 && val.substring(6, 1) != "-") {
                        val = val.substring(0, 6) + "-" + val.substring(6);
                    }
                }
                $(this).val(val);
            });
        } else {
            return this;
        }
    };
})(jQuery);