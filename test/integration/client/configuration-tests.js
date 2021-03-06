require(__dirname + '/test-helper');
var pg = require("index");

test('default values', function() {
  assert.same(pg.defaults,{
    user: '',
    database: '',
    password: '',
    port: 5432,
    rows: 0,
    poolSize: 10
  })
  test('are used in new clients', function() {
    var client = new pg.Client();
    assert.same(client,{
      user: '',
      database: '',
      password: '',
      port: 5432
    })
  })
})

test('modified values', function() {
  pg.defaults.user = 'boom'
  pg.defaults.password = 'zap'
  pg.defaults.database = 'pow'
  pg.defaults.port = 1234
  pg.defaults.host = 'blam'
  pg.defaults.rows = 10
  pg.defaults.poolSize = 0

  test('are passed into created clients', function() {
    var client = new Client();
    assert.same(client,{
      user: 'boom',
      password: 'zap',
      database: 'pow',
      port: 1234,
      host: 'blam'
    })
  })
})
