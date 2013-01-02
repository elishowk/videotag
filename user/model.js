define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Tastypie.Model.extend({
        'urlRoot': require.appConfig.poserApiUrl + 'user/',
        'validation': {
            first_name: [{
                required: false,
                maxLength: 250,
                msg: 'Un maximum de 250 caractères est autorisé'
            },
            {
                pattern: /^[A-Za-z-\s]+$/,
                msg: 'Seules les caractères alphanumeriques sont autorisés'
            }],
            last_name: [{
                required: false,
                maxLength: 250,
                msg: 'Un maximum de 250 caractères est autorisé'
            },
            {
                pattern: /^[A-Za-z-\s]+$/,
                msg: 'Seules les caractères alphanumeriques sont autorisés'
            }],
            username: [{
                required: true,
                rangeLength: [8,250],
                msg: 'Veuillez entrer un pseudo compris entre 8 et 250 caractères '
            },
            {
                pattern: /^[A-Za-z0-9@.-]+$/,
                msg: 'Votre pseudo contient un caractères non autorisé'
            }],
            email: [{
                required: true,
                msg: 'Veuillez entrer une adresse électronique'
            },
            {
                pattern: 'email',
                msg: 'Veuillez entrer une adresse électronique valide'
            }],
            someAttribute: function(value) {
                if(value !== 'somevalue') {
                    return 'Error message';
                }
            }
        }
    })
});
