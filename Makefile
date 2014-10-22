# js compiler
COMPILER=$(HOME)/bin/compiler.jar
JSC=java -jar $(COMPILER) --js
ZIP=zip

# compiled files
PACKAGE=chromnitweet.zip
BG_MIN_JS=background.min.js
OA_MIN_JS=chrome_ex_oauth.min.js
MIN_JS=$(BG_MIN_JS) $(OA_MIN_JS)

# source files
MANIFEST=manifest.json
HTML=background.html chrome_ex_oauth.html
PNG=icon128.png icon16.png icon48.png
BG_JS=background.js
OA_JS=chrome_ex_oauthsimple.js chrome_ex_oauth.js

all: $(MIN_JS)

$(BG_MIN_JS): $(BG_JS)

$(OA_MIN_JS): $(OA_JS)

%.min.js:
	$(JSC) $^ >$@

debug: JSC=cat
debug: all

zip: $(PACKAGE)

$(PACKAGE): $(MANIFEST) $(HTML) $(MIN_JS) $(PNG)
	$(ZIP) $@ $^

clean:
	$(RM) $(MIN_JS) $(PACKAGE)
