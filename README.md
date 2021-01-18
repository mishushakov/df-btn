# DF Button

![Dialogflow on any website](https://i.imgur.com/1Rzgibt.gif)

Add your Dialogflow Agent / Actions on Google to any website!

- No dependencies, no tracking, no vurnabilities
- Hosted on CDN
- Powered by open-source project ([Dialogflow for Web](https://github.com/mishushakov/dialogflow-web-v2))
- Free & open-source (licensed under MIT)

See a [demo](https://mishushakov.github.io/df-btn)

## Installation

1. Link your agent to [Dialogflow Gateway Hosted](http://dialogflow.cloud.ushakov.co)
2. Add the script in your HTML (also see [index.html](./index.html)):

```html
<script
    src="https://cdn.jsdelivr.net/gh/mishushakov/df-btn/df-btn.min.js"
    id="df-btn"
    project="dialogflow-web-v2"
    width="400px"
    height="600px"
    openText="Chat"
    closeText="Close"
    logo="assets/logo.svg"
    background="#FEFFFF"
    backgroundDark="#171717"
    logoDark="assets/logo_dark.svg">
</script>
```

3. Configure. Properties you can change:

```
project - your project id on Dialogflow Gateway Hosted
width - modal width (100% on mobile)
height - modal height (100% on mobile)
openText - button text to open chat
closeText - button text to close chat
background - background color
backgroundDark - background color (in dark)
logo - custom logotype
logoDark - custom logotype (in dark)
```

4. (Optionally) grab the source code and make it truly yours!
