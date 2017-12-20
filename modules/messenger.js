"use strict";

let request = require('request'),
    FB_PAGE_TOKEN = "EAAZA7xdaA0dYBAPbinDQdx5Pe2yjXd4CDTx0vLjXFFFLoKfKsWcwj3whFFEWzLclykjN96KlcNe0yGRj0yy4NuueCQIXw2O5nkKg6ITPgbYutzf230QWDUJECWyMCRIzINamg4GJv0FxtmXLtXXTh5mBNzGimuTdIby5bHwZDZD";

exports.send = (message, recipient) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: FB_PAGE_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipient},
            message: message
        }
    }, (error, response) => {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

exports.getUserInfo = (userId) => {

    return new Promise((resolve, reject) => {

        request({
            url: `https://graph.facebook.com/v2.6/${userId}`,
            qs: {fields:"first_name,last_name,profile_pic", access_token: FB_PAGE_TOKEN},
            method: 'GET',
        }, (error, response) => {
            if (error) {
                console.log('Error sending message: ', error);
                reject(error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            } else {
                resolve(JSON.parse(response.body));
            }
        });

    });
};