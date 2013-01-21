define({
    'global': function(messages) {
        var users = _.reduce(messages, function(points, msg, index) {
            if (points[msg.created_by] === undefined) {
                points[msg.created_by] = [1, msg.created_at];
            } else {
                points[msg.created_by][0] += 1;
                if (points[msg.created_by][1] < msg.created_at) {
                    points[msg.created_by][1] = msg.created_at;
                }
            }
            if (typeof msg.metadata.like == 'number') {
                points[msg.created_by][0] += msg.metadata.like;
            }
            return points;
        }, {});
        return _.sortBy(users, function(scores) {
            return scores[0] + scores[1];
        });
    }
});
