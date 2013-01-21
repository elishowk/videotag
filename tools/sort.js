define({
    'sort': function(messages) {
        var users = _.map(_.reduce(messages, function(points, msg, index) {
            var pt = (new Date(msg.created_at)).valueOf();
            if (points[msg.created_by] === undefined) {
                points[msg.created_by] = pt;
            } else {
                points[msg.created_by] += pt;
            }
            if (typeof msg.metadata.like == 'number') {
                points[msg.created_by] += msg.metadata.like * pt;
            }
            return points;
        }, {}), function(point, index){
            return { uid: index, point: point};
        });
        return _.pluck(_.sortBy(users, function(score, uid) {
            return -score.point;
        }), 'uid');
    }
});
