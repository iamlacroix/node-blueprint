test:
	NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--timeout 7000 \
		--recursive \
		--growl

unit:
	NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--timeout 7000 \
		--recursive \
		--growl \
		test/unit/

request:
	NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--timeout 7000 \
		--recursive \
		--growl \
		test/request/

accept:
	NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--timeout 7000 \
		--recursive \
		--growl \
		test/integration/

console:
	./node_modules/.bin/node-inspector --web-port=12321

.PHONY: test unit accept console
