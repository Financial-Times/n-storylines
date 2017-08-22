node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

gh-pages: build
	@git stash
	@git add -f demos/public
	@git commit -m 'update gh-pages'
	@git push origin HEAD:origin/gh-pages
	@git reset --hard HEAD~
	@git stash pop

test: verify

run:
	http-server

transpile:
	babel src -d dist

export IGNORE_A11Y = true
