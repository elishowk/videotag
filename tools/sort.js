define({
    'freshAndNearAndFamous': function(messages) {
        var sortedCreatedAt = _.uniq(_.sort(messages, function(msg) {
            return (new Date(msg.get('created_at'))).valueOf();
        }), true);
        var maxRef = _.max(messages, function(msg) {
            return int(msg.get('reference'));
        });
        var sortedReferences = _.uniq(_.sort(messages, function(msg) {
            return -(maxRef - int(msg.get('reference')));
        }), true);
        var users = _.map(_.reduce(messages, function(points, msg, index) {
            var timestamp = (new Date(msg.get('created_at'))).valueOf();
            var like = msg.get('like_count') || 1;
            if (typeof like !== 'number') {
                like = 0;
            }
            if (points[msg.get('created_by')] === undefined) {
                points[msg.get('created_by')] = 0;
            }
            points[msg.get('created_by')] += _.indexOf(sortedCreatedAt, timestamp) +
                _.indexOf(sortedCreatedAt, timestamp) * like +
                _.indexOf(sortedReferences, msg.get('reference'));
            return points;
        }, {}), function(point, index) {
            return { uid: index, point: point};
        });
        return _.pluck(_.sortBy(users, function(score, uid) {
            return -score.point;
        }), 'uid');
    },

    'freshAndFamous': function(messages) {
        var sortedCreatedAt = _.uniq(_.sort(messages, function(msg) {
            return (new Date(msg.get('created_at'))).valueOf();
        }), true);
        var sortedVotes = _.uniq(_.sort(messages, function(msg) {
            return msg.get('like_count') || 0;
        }), true);
        var users = _.map(_.reduce(messages, function(points, msg, index) {
            var timestamp = (new Date(msg.get('created_at'))).valueOf();
            var like = msg.get('like_count') || 1;
            if (typeof like !== 'number') {
                like = 0;
            }
            if (points[msg.get('created_by')] === undefined) {
                points[msg.get('created_by')] = _.indexOf(sortedCreatedAt, timestamp) +
                    _.indexOf(sortedVotes, like);
            } else {
                points[msg.get('created_by')] += _.indexOf(sortedCreatedAt, timestamp) +
                    _.indexOf(sortedVotes, like);
            }
            return points;
        }, {}), function(point, index) {
            return { uid: index, point: point};
        });
        return _.pluck(_.sortBy(users, function(score, uid) {
            return -score.point;
        }), 'uid');
    }
});
