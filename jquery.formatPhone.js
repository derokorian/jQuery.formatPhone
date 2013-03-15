/*
 *  Project: Phone Format
 *  Description: jQuery plugin for formatting phone numbers
 *  Author: Ryan Pallas
 *  License: MIT
 */

;(function ( $, window, document ) {
    // Create the defaults once
    var pluginName = "FormatPhone",
        defaults = {
            region: "US"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            switch (this.options.region) {
                case 'US':
                    this.fUS(this.element,this.options);
                    break;
            }
        },
        fUS: function(el, options) {
            return el.on("blur.Format", function () {
                var val = $(el).val().replace(/[^a-zA-Z0-9]+/g,'');
                var prefix = "";
                if (val.length > 0) {
                    if (val.substring(0, 1) == "1") {
                        prefix = "1";
                        val = val.substring(1);
                    }
                    if (val.length > 0)
                        val = "(" + val;
                    if (val.length > 4)
                        val = val.substring(0, 4) + ")" + val.substring(4);
                    if (val.length > 8) 
                        val = val.substring(0, 8) + "-" + val.substring(8);
                    if (val.length > 13)
                        val = val.substring(0, 13) + " " + val.substring(13);
                }
                $(el).val(prefix + val);
            });
        }
    };

    // prevent against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );