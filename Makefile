ZIP=zip

# compiled files
PACKAGE=chromnitweet.zip

# source files
MANIFEST=manifest.json
HTML=background.html chrome_ex_oauth.html
PNG=img/*
JS=background.js chrome_ex_oauthsimple.js chrome_ex_oauth.js

all: $(PACKAGE)

$(PACKAGE): $(MANIFEST) $(HTML) $(JS) $(PNG)
	$(ZIP) $@ $^

clean:
	$(RM) $(PACKAGE)
