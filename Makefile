include n.Makefile

gh-pages: build
	@git add -f demos/public
	@git commit -m 'update gh-pages'
	@git push origin origin/gh-pages
