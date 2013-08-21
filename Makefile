test:
	NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--timeout 7000 \
		--recursive

unit:
	NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--timeout 7000 \
		test/unit/

accept:
	NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--timeout 7000 \
		test/integration/

.PHONY: test console
