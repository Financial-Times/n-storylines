include n.Makefile

gh-pages: build
	@git stash
	@git add -f demos/public
	@git commit -m 'update gh-pages'
	@git push origin HEAD:origin/gh-pages
	@git reset --hard HEAD~
	@git stash pop

run:
	http-server

transpile:
	babel src -d dist
