// static/tcaptcha-loader.js
window.loadTCaptchaSDK = function(callback) {
    if (window.TencentCaptcha) {
        callback();
        return;
    }

    const script = document.createElement('script');
    script.src = "https://turing.captcha.qcloud.com/TCaptcha.js";
    script.onload = callback;
    document.body.appendChild(script);
};
