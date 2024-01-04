const errorsIgnore = [
    // Recommendations from Sentry
    "top.GLOBALS",
    'Could not load "onion"',
    'Could not load "stats"',
    "originalCreateNotification",
    "canvas.contentDocument",
    "MyApp_RemoveAllHighlights",
    "http://tt.epicplay.com",
    "Can't find variable: ZiteReader",
    "jigsaw is not defined",
    "ComboSearch is not defined",
    "http://loading.retry.widdit.com/",
    "atomicFindClose",
    "fb_xd_fragment",
    "bmi_SafeAddOnload",
    "EBCallBackMessageReceived",
    "conduitPage",
    // LT
    "429",
    "Unexpected token",
    "Failed to fetch",
]

const browserIgnores = [
    "googlebot","bingbot","yandexbot","ahrefsbot","msnbot","linkedinbot","exabot","compspybot",
    "yesupbot","paperlibot","tweetmemebot","semrushbot","gigabot","voilabot","adsbot-google",
    "botlink","alkalinebot","araybot","undrip bot","borg-bot","boxseabot","yodaobot","admedia bot",
    "ezooms.bot","confuzzledbot","coolbot","internet cruiser robot","yolinkbot","diibot","musobot",
    "dragonbot","elfinbot","wikiobot","twitterbot","contextad bot","hambot","iajabot","news bot",
    "irobot","socialradarbot","ko_yappo_robot","skimbot","psbot","rixbot","seznambot","careerbot",
    "simbot","solbot","mail.ru_bot","spiderbot","blekkobot","bitlybot","techbot","void-bot",
    "vwbot_k","diffbot","friendfeedbot","archive.org_bot","woriobot","crystalsemanticsbot","wepbot",
    "spbot","tweetedtimes bot","mj12bot","who.is bot","psbot","robot","jbot","bbot","bot","lighthouse"
]

module.exports.setErrorHandlers = () => {
    const backupWarn = console.warn;
    console.warn = function filterWarnings(msg) {
        if (!errorsIgnore.some(entry => (entry && entry.includes(JSON.stringify(msg))) || (JSON.stringify(msg) && JSON.stringify(msg).includes(entry)))) {
            backupWarn.apply(console, arguments);
        }
    };

    const backupError = console.error;
    console.error = function filterErrors(msg) {
        if (!errorsIgnore.some(entry => (entry && entry.includes(JSON.stringify(msg))) || (JSON.stringify(msg) && JSON.stringify(msg).includes(entry)))) {
            backupError.apply(console, arguments);
        }
    };
}

module.exports.errorDenyURLs = [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
];

module.exports.beforeErrorSendHandler = (event) => {
    const userAgent = event && event.request && event.request.headers && event.request.headers['User-Agent'];
    if (userAgent && browserIgnores.some(entry => userAgent.toLowerCase().includes(entry)) ) {
        return null;
    }
    if (event && event.message && errorsIgnore.some(entry => entry.includes(event.message) || event.message.includes(entry))) {
        return null;
    }
    return event;
}
