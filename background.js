/**
 * Copyright (c) The FreeKCD Project.  See LICENSE.
 */

const TWITTER_UPDATE_URL = 'https://api.twitter.com/1.1/statuses/update.json';
const NOTIFICATION_TIMEOUT = 3000;

var oauth = ChromeExOAuth.initBackgroundPage({
    request_url: 'https://api.twitter.com/oauth/request_token',
    authorize_url: 'https://api.twitter.com/oauth/authorize',
    access_url: 'https://api.twitter.com/oauth/access_token',
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    scope: TWITTER_UPDATE_URL,
    app_name: 'Chromnitweet'
});

function notify(iconUrl, title, message) {
    chrome.notifications.create('chromnitweet', {
        type: 'basic',
        iconUrl: iconUrl,
        title: title,
        message: message
    }, function(id) {
        window.setTimeout(function() {
            chrome.notifications.clear(id, function() {});
        }, NOTIFICATION_TIMEOUT);
    });
}

oauth.authorize(function() {
    chrome.omnibox.onInputChanged.addListener(function(text) {
        chrome.omnibox.setDefaultSuggestion({
            description: String(140-twttr.txt.getTweetLength(text)) + ' characters remaining.'
        });
    });
    chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
        function sendSignedRequestCallback(response, xhr) {
            var result = JSON.parse(response);
            if (result.errors !== undefined) {
                notify('img/icon128.png', 'Oops! There was an error.',
                    result.errors[0].message);
            } else {
                notify(result.user.profile_image_url_https, result.user.name,
                    result.text);
            }
        }
        oauth.sendSignedRequest(TWITTER_UPDATE_URL, sendSignedRequestCallback, {
            method: 'POST',
            parameters: {status: text}
        });
    });
});
