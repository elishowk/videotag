/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Tastypie.Model.extend({
        'urlRoot': require.appConfig.poserApiUrl + 'page/',
        validation: {
           video: [{
                required: true,
                msg: 'Veuillez entrer une url'
            },
            {
                pattern: 'url',
                msg: 'Veuillez entrer une url valide'
            }],
            title: {
                required: true,
                msg: 'Veuillez entrer un titre'
            },
        }
    });
});
