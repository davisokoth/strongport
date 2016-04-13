module.exports = function(Stocks) {

    Stocks.getName = function(m_product_id, cb) {
        Stocks.findById( m_product_id, function (err, instance) {
	    response = instance;
	    cb(null, insance.value);
	    console.log(instance.value);
	});
    }


    Stocks.getName = function(m_product_id, cb) {
        Stocks.findById( m_product_id, function (err, instance) {
		    response = instance;
		    cb(null, insance.value);
		    console.log(instance.value);
		});
    }

    Stocks.remoteMethod(
        'getName',
        {
            description: 'Get list of users by client',
            accepts: { arg: 'm_product_id', type: 'number', description: 'Product ID', required: true, http: {source: 'body'} },
            returns: { arg: 'data', type: ['Stocks'], root: true },
            http: { verb: 'get', path: '/getName' }
        }
    );
};
