# stathat-dumper

[![NPM](https://nodei.co/npm/stathat-dumper.png)](https://nodei.co/npm/stathat-dumper/)

This API consumer is a complete handler for the [StatHat Export API](http://www.stathat.com/manual/export). The data that comes back from the API is the data that this library gives you. For full documentaion on their API return values, see [their documentation](http://www.stathat.com/manual/export).

## Example
```javascript
var api = require('stathat-dumper')('ACCESSTOKEN');
api.get('123ABc', '1w3h', function (err, data) {
  console.log(data);
});
```

```javascript
[ { name: 'Goa\'uld killed',
    timeframe: '1 week @ 1 day',
    points: [
      { time: 1415152860, value: 82.5333333332 },
      { time: 1415239260, value: 4.8 },
      { time: 1415325660, value: 214 },
      { time: 1415412060, value: 1618.1333333333 },
      { time: 1415498460, value: 5.8 },
      { time: 1415584860, value: 56971 },
      { time: 1415671260, value: 6 },
      { time: 1415757660, value: 0 }
  ] } ]
```

## API
### `stathat-dumper(accessToken)`
* `accessToken` - StatHat.com access token. Obtained at <https://www.stathat.com/access>

### `.list(offset, callback)`
Returns a list of all your statistics.

* `offset` - Offset to start pulling statistics at. If you want to pull everything (up to the StatHat limit of 3,000), omit this argument.
* `callback(error, data)` - The callback to handle the list of statistics.

```javascript
var api = require('stathat-dumper')('ACCESSTOKEN');
api.list(function (err, data) {
  console.log(data);
});
```

```javascript
[ { id: '123ABc',
    name: 'Goa\'uld killed',
    public: false,
    counter: true,
    classic_key: '3da5dac093efa65422cbb22af4588c65' },
  { id: '456DEf',
    name: 'ZPM Levels',
    public: false,
    counter: true,
    classic_key: '867916146f7d337ce01f396c0b679f87' } ]
```


### `.info(name, callback)`
Get info about a single statistic.

* `name` - Name of the statistic you want to pull info on. Example: 'Aliens vaporized'
* `callback(error, data)` - The callback to handle the resulting data, and any errors (if present).

```javascript
var api = require('stathat-dumper')('ACCESSTOKEN');
stats.info('Goa\'uld killed', function (err, data) {
  console.log(data);
});
```

```javascript
{ id: '123ABc',
  name: 'Goa\'uld killed',
  public: false,
  counter: true,
  classic_key: '3da5dac093efa65422cbb22af4588c65' }
```

### `.get(ids, timeframe, start, callback)`
* `ids` - StatHat statistic IDs to pull data for (obtained via `.list()`). You can either pass in a single ID, as a lone string, or an array of IDs.
* `timeframe` - Timeframe to pull a daily summary for (eg. 7d for 7 days, 2M for 2 months).
* `start` - Unix timestamp of a date to start pulling statistics at.
* `callback(error, data)` - The callback to handle the resulting data, and any errors (if present).

```javascript
var api = require('stathat-dumper')('ACCESSTOKEN');
api.get('123ABc', '1w3h', function (err, data) {
  console.log(data);
});
```

```javascript
[ { name: 'Goa\'uld killed',
    timeframe: '1 week @ 1 day',
    points: [
      { time: 1415152860, value: 82.5333333332 },
      { time: 1415239260, value: 4.8 },
      { time: 1415325660, value: 214 },
      { time: 1415412060, value: 1618.1333333333 },
      { time: 1415498460, value: 5.8 },
      { time: 1415584860, value: 56971 },
      { time: 1415671260, value: 6 },
      { time: 1415757660, value: 0 }
  ] } ]
```

### `.getSummary(ids, timeframe, callback)`
* `ids` - StatHat statistic IDs to pull summaries for. You can either pass in a single ID, as a lone string, or an array of IDs.
* `timeframe` - Timeframe to pull a daily summary for (eg. 7d for 7 days, 2M for 2 months).
* `callback(error, data)` - The callback to handle the resulting data, and any errors (if present).

```javascript
var api = require('stathat-dumper')('ACCESSTOKEN');
api.getSummary('456DEf', '7d', function (err, data) {
  console.log(data);
});
```

```javascript
[ { name: 'ZPM Levels',
    timeframe: '1 week @ 1 day',
    points:
     [ { time: 1415232000, value: 0 },
       { time: 1415318400, value: 0 },
       { time: 1415404800, value: 0 },
       { time: 1415491200, value: 0 },
       { time: 1415577600, value: 0 },
       { time: 1415664000, value: 0 },
       { time: 1415750400, value: 0 } ] }
```


## License

MIT
