module.exports = function(AdUser) {

    AdUser.byClient = function (clientId, cb) {

        var ds = AdUser.dataSource;
        var sql = "SELECT * FROM ad_user WHERE ad_client_id = ?";

        ds.connector.query(sql, category, function (err, users) {

            if (err) console.error(err);

            cb(err, users);

        });

    };

    AdUser.remoteMethod(
        'byClient',
        {
            description: 'Get list of users by client',
            accepts: { arg: 'clientId', type: 'number', description: 'Client ID', required: true, http: {source: 'body'} },
            returns: { arg: 'data', type: ['user'], root: true },
            http: { verb: 'get', path: '/byClient' }
        }
    );

};
