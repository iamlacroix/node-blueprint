# Node.js Blueprint

## Dependencies

- [Node.js](http://nodejs.org/)

## Installation

Clone Git repo, `cd` into directory, and run `npm install`.

## Usage

### Development

```shell
npm run dev
```
Then visit `http://localhost:7171`

### Testing

#### Unit tests:
```shell
make unit
```

#### Integration tests:
Fire up PhantomJS with WebDriver: `phantomjs --webdriver=4444` then run:
```shell
make unit
```

#### All tests:
Fire up PhantomJS with WebDriver: `phantomjs --webdriver=4444` then run:
```shell
make test
```

## License
Copyright © 2013-2014 [Michael LaCroix](http://www.lacroixdesign.net/)  
MIT License
