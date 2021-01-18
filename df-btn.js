const wrapper = document.querySelector('#df-btn')
const config = {
    src: wrapper.getAttribute('src'),
    project: wrapper.getAttribute('project'),
    width: wrapper.getAttribute('width'),
    height: wrapper.getAttribute('height'),
    openText: wrapper.getAttribute('openText'),
    closeText: wrapper.getAttribute('closeText'),
    background: wrapper.getAttribute('background'),
    backgroundDark: wrapper.getAttribute('backgroundDark'),
    logo: wrapper.getAttribute('logo'),
    logoDark: wrapper.getAttribute('logoDark')
}

const origin = config.src.substring(0, config.src.lastIndexOf('/'))

if (!config.project){
    console.warn('Please specify your project ID in attributes!')
}

else {
    const style = document.createElement('style')
    style.innerHTML = `
    .df-btn {
        padding: 0;
        border: none;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 1px 3px 1px rgba(60,64,67,0.149);
        font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: ${config.background || '#FEFFFF'};
        border-radius: 24px;
        cursor: pointer;
        transition: all .45s cubic-bezier(.4, 0, .2, 1);
        position: fixed;
        bottom: 0px;
        right: 0px;
        margin: 16px;
        display: flex;
        flex-direction: column;
        z-index: 999
    }

    .df-btn-text {
        min-width: 56px;
        color: #3c4043;
        display: inline-flex;
        align-items: center;
        font-weight: 500;
        padding: 0 24px 0 0;
        font-size: .875rem;
        height: 48px
    }

    .df-btn-text:before {
        min-width: 56px;
        height: 48px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px;
        background-image: url('${config.logo || origin + '/assets/logo.svg'}');
        content: ''
    }

    .df-btn:hover {
        box-shadow: 0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)
    }

    .df-btn:not(.df-closed){
        border-radius: 16px
    }

    .df-btn:not(.df-closed) > .df-btn-text:before {
        background-image: url('${origin}/assets/close.svg')
    }

    .df-btn-content {
        display: block;
        border: 0;
        height: ${config.height || '600px'};
        width: ${config.width || '400px'};
        transition: all .45s cubic-bezier(.4, 0, .2, 1);
        float: right;
        opacity: 1
    }

    .df-btn:not(.df-closed) > .df-btn-content {
        padding-bottom: 16px;
    }

    .df-closed > .df-btn-content {
        width: 0;
        height: 0;
        opacity: 0
    }

    @media screen and (max-width: 720px){
        .df-btn {
            border-radius: 28px;
        }

        .df-btn:not(.df-closed) {
            margin: 0px;
            border-radius: 0px
        }

        .df-btn:not(.df-closed) > .df-btn-content {
            width: 100vw;
            max-height: 100vh;
            height: calc(100vh - 56px);
            padding-bottom: 0px
        }

        .df-btn-text {
            padding: 0;
            height: 56px;
            font-size: 0;
        }
    }

    @media (prefers-color-scheme: dark){
        .df-btn {
            background-color: ${config.backgroundDark || '#171717'}
        }

        .df-btn-text {
            color: white
        }

        .df-btn-text:before {
            background-image: url('${config.logoDark || origin + '/assets/logo_dark.svg'}')
        }

        .df-btn:not(.df-closed) > .df-btn-text:before {
            background-image: url('${origin}/assets/close_dark.svg')
        }
    }`

    document.head.appendChild(style)
    document.write(`
        <button class="df-btn df-closed" onclick="dfToggle()">
            <div class="df-btn-text">${config.openText || 'Chat'}</div>
            <iframe class="df-btn-content" src="https://${config.project}.web.ushaflow.io" allow="microphone *"></iframe>
        </button>
    `)

    let dfToggled = false
    window.dfToggle = () => {
        document.querySelector('.df-btn').classList = dfToggled ? 'df-btn df-closed' : 'df-btn'
        document.querySelector('.df-btn-text').innerText = dfToggled ? (config.openText || 'Chat') : (config.closeText || 'Close')
        dfToggled = !dfToggled
    }
}
