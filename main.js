/*
 * Videotag main
 * @license GNU AGPL3
 * Copyright SAS CommOnEcoute
 * @author Elias Showk elias.showk@commonecoute.fr
 * @version 0.1
 */
define('Videotag', [],
    function() {
        var Poser = window.Poser;
        var VideotagAPIDiscovery = Backbone.Tastypie.Model.extend({
            urlRoot: Poser.options.host + '/videotag/videotag_api/'
        });
        var keys = Object.keys || function(obj) {
            var keys = [];
            for (var key in obj) {
                if (has.call(obj, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
        return {
            /*
             * Call this first
             * otherwise you won't know where the API endpoints are
             */
            initialize: function(callback) {
                this.readyCallback = callback;
                this.apiDiscovery = new VideotagAPIDiscovery();
                that.options.apiurlRoots = {};
                var that = this;
                this.apiDiscovery.on('change', function() {
                    /*
                     * writes urlRoot() functions to be used in models
                     */
                    keys(this.apiDiscovery.attributes, function(key) {
                        this.options.apiurlRoots[key] = function() {
                            return Poser.options.host +
                                this.apidiscovery.attributes[key]['list_endpoint'];
                        };
                    });
                    Poser.isAppReady = true;
                    this.readyCallback();
                }, this);
                Poser.pushModel(this.apidiscovery);
                this.apidiscovery.fetch();
            }
        };
});
