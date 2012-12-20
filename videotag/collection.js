define(['backbone'], function (Backbone) {
  return Backbone.Collection.extend({
    'urlRoot': require.appConfig.apiUrl + '/videotag'
  });
});

