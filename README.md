# DF Button

![Dialogflow on any website](https://i.imgur.com/1Rzgibt.gif)

Add your Dialogflow Agent / Actions on Google to any website!

- No dependencies, no tracking, no vurnabilities
- Hosted on CDN
- Powered by open-source project ([Dialogflow for Web](https://github.com/mishushakov/dialogflow-web-v2))
- Free & open-source (licensed under MIT)

See a [demo](https://mishushakov.github.io/df-btn)

**New in this version**

![Dialogflow Floating Chat](https://i.imgur.com/TlYPGF5.gif)

- 🎉 Dark mode
- 🎉 Updated UI for mobile and accessibility
- 🎉 Better code and overall perfomance (60 FPS)

## Installation

1. Link your agent to [Dialogflow Gateway Hosted](http://dialogflow.cloud.ushakov.co)
2. Add the script in your HTML (also see [index.html](./index.html)):

```html
<script
    src="https://cdn.jsdelivr.net/gh/mishushakov/df-btn/df-btn.min.js"
    id="df-btn"
    project="dialogflow-web-v2"
    width="320px"
    height="500px"
    openText="Chat"
    closeText="Close">
</script>
```

3. Configure. Properties you can change:

```
project - your project id on Dialogflow Gateway Hosted
width - modal width (100% on mobile)
height - modal height (100% on mobile)
openText - button text to open chat
closeText - button text to close chat
```

4. (Optionally) grab the source code and make it truly yours!

Thank you!