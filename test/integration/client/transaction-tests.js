var helper = require(__dirname + '/test-helper');

test('a single connection transaction', function() {
  var connectionString = helper.connectionString();
  var sink = new helper.Sink(1, function() {
    helper.pg.end();
  });

  helper.pg.connect(connectionString, assert.calls(function(err, client) {
    assert.isNull(err);

    client.query('begin');

    var getZed = {
      text: 'SELECT * FROM person WHERE name = $1',
      values: ['Zed']
    };

    test('Zed should not exist in the database', function() {
      client.query(getZed, assert.calls(function(err, result) {
        assert.isNull(err);
        assert.empty(result.rows);
      }))
    })

    client.query("INSERT INTO person(name, age) VALUES($1, $2)", ['Zed', 270], assert.calls(function(err, result) {
      assert.isNull(err)
    }));

    test('Zed should exist in the database', function() {
      client.query(getZed, assert.calls(function(err, result) {
        assert.isNull(err);
        assert.equal(result.rows[0].name, 'Zed');
      }))
    })

    client.query('rollback');

    test('Zed should not exist in the database', function() {
      client.query(getZed, assert.calls(function(err, result) {
        assert.isNull(err);
        assert.empty(result.rows);
        sink.add();
      }))
    })

  }))
})
