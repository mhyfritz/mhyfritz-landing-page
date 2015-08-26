all: build dist

.PHONY: build dist outdirs clean

DISTDIR = dist

build: css/style.css

css/style.css: css/style.scss
	sass $<:$@

dist: outdirs build
	cp index.html $(DISTDIR)
	cp css/style.css $(DISTDIR)/static/
	cp img/*.* $(DISTDIR)/static/

outdirs:
	mkdir -p $(DISTDIR)
	mkdir -p $(DISTDIR)/static

clean:
	rm -rf $(DISTDIR)
	rm -f css/style.css css/style.css.map
