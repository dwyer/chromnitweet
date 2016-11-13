ZIP=zip

# compiled files
PACKAGE=chromnitweet.zip

# source files
MANIFEST=manifest.json
HTML=background.html chrome_ex_oauth.html
PNG=img/*
JS=background.js settings.js chrome_ex_oauth.js chrome_ex_oauthsimple.js onload.js twitter-text.js

all: $(PACKAGE)

$(PACKAGE): $(MANIFEST) $(HTML) $(JS) $(PNG)
	$(ZIP) $@ $^

clean:
	$(RM) $(PACKAGE)
