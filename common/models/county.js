module.exports = function(County) {
  County.getName = function(countyId, cb) {
    County.findById( countyId, function (err, instance) {
        response = instance;
        cb(null, insance.name);
        console.log(instance.name);
    });
  }

  County.remoteMethod (
        'getCounty',
        {
          http: {path: '/getcounty', verb: 'get'},
          accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
          returns: {arg: 'name', type: 'string'}
        }
  );
};
