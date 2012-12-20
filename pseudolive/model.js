define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    'urlRoot': require.appConfig.apiUrl + '/pseudolive'
  });
});

