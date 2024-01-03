check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	node --test test/*.js

.PHONY: check lint test
