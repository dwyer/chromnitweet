# js compiler
JSC=java -jar $(HOME)/bin/compiler.jar
ZIP=zip

# compiled files
BG_MIN_JS=background.min.js
OA_MIN_JS=chrome_ex_oauth.min.js
MIN_JS=$(BG_MIN_JS) $(OA_MIN_JS)
PACKAGE=chromnitweet.zip

# source files
HTML=background.html chrome_ex_oauth.html
PNG=error.png icon128.png icon16.png icon48.png
BG_JS=background.js
OA_JS=chrome_ex_oauthsimple.js chrome_ex_oauth.js

all: $(PACKAGE)

$(PACKAGE): manifest.json $(HTML) $(PNG) $(MIN_JS)
	$(ZIP) $(PACKAGE) $+

$(BG_MIN_JS): $(BG_JS)

$(OA_MIN_JS): $(OA_JS)

%.min.js:
	$(JSC) --js $+ --js_output_file $@

clean:
	$(RM) $(MIN_JS) $(PACKAGE)
