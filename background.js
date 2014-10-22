/**
 * Copyright (c) The FreeKCD Project.  See LICENSE.
 */

var oauth = ChromeExOAuth.initBackgroundPage({
    'request_url': 'https://api.twitter.com/oauth/request_token',
    'authorize_url': 'https://api.twitter.com/oauth/authorize',
    'access_url': 'https://api.twitter.com/oauth/access_token',
    'consumer_key': 'pQtmomTX1QoatYhOOuHQNA',
    'consumer_secret': '91d5DacujLq6DZfe6vpIARTwrxKYAbm230N8KbnasM',
    'scope': 'https://api.twitter.com/1.1/statuses/update.json',
    'app_name': 'Chromnitweet'
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
        }, 3000);
    });
}

oauth.authorize(function() {
    chrome.omnibox.onInputChanged.addListener(function(text) {
        chrome.omnibox.setDefaultSuggestion({
            description: String(140-text.length) + ' characters remaining.'
        });
    });
    chrome.omnibox.onInputEntered.addListener(function(text) {
        var url = 'https://api.twitter.com/1.1/statuses/update.json';
        var request = {'method': 'POST', 'parameters': {'status': text}}
        function callback(response, xhr) {
            var result = JSON.parse(response);
            if (result.errors !== undefined) {
                notify('icon128.png', 'Oops! There was an error.',
                    result.errors[0].message);
            } else {
                notify(result.user.profile_image_url_https, result.user.name,
                    result.text);
            }
        }
        oauth.sendSignedRequest(url, callback, request);
    });
});
