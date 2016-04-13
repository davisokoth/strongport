module.exports = function(ReportHeader) {

    ReportHeader.byHeaderId = function(nodeReportId, cb) {
        ReportHeader.findBy({
            where: {node_report_id: nodeReportId},
            order: 'sequence'
        }, function (err, instance) {
            response = instance;
            cb(null, instance.name);
            console.log(instance.name);
        });
    }

    ReportHeader.remoteMethod (
        'byHeaderId',
        {
          http: {path: '/byHeaderId', verb: 'get'},
          accepts: {arg: 'nodeReportId', type: 'number', http: { source: 'query' } },
          returns: {arg: 'data', type: 'string'}
        }
    );

    ReportHeader.getNames = function (reportHeaderId, cb) {

        var ds = ReportHeader.dataSource;
        var sql = "SELECT name FROM node_reportheader WHERE ad_client_id = 1000000 AND node_report_id = " + reportHeaderId + " ORDER BY Sequence";

        ds.connector.query(sql, function (err, names) {
            if (err) console.error(err);
            cb(err, names);
        });

    };

    ReportHeader.remoteMethod(
        'getNames',
        {
            accepts: [{ arg: 'reportHeaderId', type: 'string', http: { source: 'query' } }],
            returns: { arg: 'data', type: ['ReportHeader'], root: true },
            http: { verb: 'get', path: '/getNames' }
        }
    );
};
