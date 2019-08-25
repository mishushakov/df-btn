const wrapper = document.querySelector('#df-btn')
const config = {
    project: wrapper.getAttribute('project'),
    width: wrapper.getAttribute('width'),
    height: wrapper.getAttribute('height'),
    openText: wrapper.getAttribute('openText'),
    closeText: wrapper.getAttribute('closeText')
}

if (!config.project){
    console.warn('Please specify your project ID in attributes!')
}

else {
    const style = document.createElement('style')
    style.innerHTML = `
    .df-btn {
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 1px 3px 1px rgba(60,64,67,0.149);
        font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
        border-radius: 24px;
        cursor: pointer;
        transition: all .08s linear;
        position: fixed;
        bottom: 0px;
        right: 0px;
        margin: 16px;
        display: flex;
        flex-direction: column
    }

    .df-btn-text {
        min-width: 56px;
        color: #3c4043;
        display: inline-flex;
        align-items: center;
        font-weight: 500;
        letter-spacing: .25px;
        transition: all .08s linear;
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
        background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjVweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMjUgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5wYXRoLTE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMjMuNzkzMjMwOCw2LjIyMjc2OTIzIEwxMy41MTM4NDYyLDAuMjkwNDYxNTM4IEMxMi44NDkyMzA4LC0wLjA5MzUzODQ2MTUgMTIuMDIyMTUzOCwtMC4wOTM1Mzg0NjE1IDExLjM1NzUzODUsMC4yOTA0NjE1MzggTDEuMDc4MTUzODUsNi4yMjI3NjkyMyBDMC40MTM1Mzg0NjIsNi42MTE2OTIzMSAwLjAwNDkyMzA3NjkyLDcuMzIwNjE1MzggMC4wMDQ5MjMwNzY5Miw4LjA5MzUzODQ2IEwwLjAwNDkyMzA3NjkyLDE5Ljk2OCBDMC4wMDQ5MjMwNzY5MiwyMC43MzYgMC40MTM1Mzg0NjIsMjEuNDQ0OTIzMSAxLjA3ODE1Mzg1LDIxLjgzMzg0NjIgTDYuMjIyNzY5MjMsMjQuODA3Mzg0NiBMNi4yMjI3NjkyMywzMC44Njc2OTIzIEM2LjIyMjc2OTIzLDMxLjIyNzA3NjkgNi41MTMyMzA3NywzMS41MTI2MTU0IDYuODcyNjE1MzgsMzEuNTEyNjE1NCBDNi45ODU4NDYxNSwzMS41MTI2MTU0IDcuMDk0MTUzODUsMzEuNDgzMDc2OSA3LjE5MjYxNTM4LDMxLjQyNCBMMjMuODA4LDIxLjgzODc2OTIgQzI0LjQ3MjYxNTQsMjEuNDU0NzY5MiAyNC44ODYxNTM4LDIwLjc0NTg0NjIgMjQuODgxMzE2OSwxOS45NzI5MjMxIEwyNC44ODEzMTY5LDguMDkzNTM4NDYgQzI0Ljg3NjMwNzcsNy4zMTU2OTIzMSAyNC40NjI3NjkyLDYuNjA2NzY5MjMgMjMuNzkzMjMwOCw2LjIyMjc2OTIzIFoiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIj4KICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgZmlsbD0id2hpdGUiPgogICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICA8dXNlIGlkPSJwYXRoLTEiIGZpbGw9IiMwMDAwMDAiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+');
        content: ''
    }

    .df-btn:hover {
        box-shadow: 0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)
    }

    .df-btn:not(.df-closed){
        border-radius: 16px
    }

    .df-btn:not(.df-closed) > .df-btn-text:before {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDBWMHoiLz48cGF0aCBkPSJNMTguMyA1LjcxYy0uMzktLjM5LTEuMDItLjM5LTEuNDEgMEwxMiAxMC41OSA3LjExIDUuN2MtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDAtLjM5LjM5LS4zOSAxLjAyIDAgMS40MUwxMC41OSAxMiA1LjcgMTYuODljLS4zOS4zOS0uMzkgMS4wMiAwIDEuNDEuMzkuMzkgMS4wMi4zOSAxLjQxIDBMMTIgMTMuNDFsNC44OSA0Ljg5Yy4zOS4zOSAxLjAyLjM5IDEuNDEgMCAuMzktLjM5LjM5LTEuMDIgMC0xLjQxTDEzLjQxIDEybDQuODktNC44OWMuMzgtLjM4LjM4LTEuMDIgMC0xLjR6Ii8+PC9zdmc+')
    }

    .df-btn-content {
        display: block;
        border: 0;
        height: ${config.height || '500px'};
        width: ${config.width || '320px'};
        transition: all .25s ease;
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
            height: calc(100vh - 48px);
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
            background-color: #121212
        }

        .df-btn-text {
            color: white
        }

        .df-btn-text:before {
            background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjVweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMjUgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5wYXRoLTE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMjMuNzkzMjMwOCw2LjIyMjc2OTIzIEwxMy41MTM4NDYyLDAuMjkwNDYxNTM4IEMxMi44NDkyMzA4LC0wLjA5MzUzODQ2MTUgMTIuMDIyMTUzOCwtMC4wOTM1Mzg0NjE1IDExLjM1NzUzODUsMC4yOTA0NjE1MzggTDEuMDc4MTUzODUsNi4yMjI3NjkyMyBDMC40MTM1Mzg0NjIsNi42MTE2OTIzMSAwLjAwNDkyMzA3NjkyLDcuMzIwNjE1MzggMC4wMDQ5MjMwNzY5Miw4LjA5MzUzODQ2IEwwLjAwNDkyMzA3NjkyLDE5Ljk2OCBDMC4wMDQ5MjMwNzY5MiwyMC43MzYgMC40MTM1Mzg0NjIsMjEuNDQ0OTIzMSAxLjA3ODE1Mzg1LDIxLjgzMzg0NjIgTDYuMjIyNzY5MjMsMjQuODA3Mzg0NiBMNi4yMjI3NjkyMywzMC44Njc2OTIzIEM2LjIyMjc2OTIzLDMxLjIyNzA3NjkgNi41MTMyMzA3NywzMS41MTI2MTU0IDYuODcyNjE1MzgsMzEuNTEyNjE1NCBDNi45ODU4NDYxNSwzMS41MTI2MTU0IDcuMDk0MTUzODUsMzEuNDgzMDc2OSA3LjE5MjYxNTM4LDMxLjQyNCBMMjMuODA4LDIxLjgzODc2OTIgQzI0LjQ3MjYxNTQsMjEuNDU0NzY5MiAyNC44ODYxNTM4LDIwLjc0NTg0NjIgMjQuODgxMzE2OSwxOS45NzI5MjMxIEwyNC44ODEzMTY5LDguMDkzNTM4NDYgQzI0Ljg3NjMwNzcsNy4zMTU2OTIzMSAyNC40NjI3NjkyLDYuNjA2NzY5MjMgMjMuNzkzMjMwOCw2LjIyMjc2OTIzIFoiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIj4KICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgZmlsbD0id2hpdGUiPgogICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICA8dXNlIGlkPSJwYXRoLTEiIGZpbGw9IiNGRkZGRkYiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+')
        }

        .df-btn:not(.df-closed) > .df-btn-text:before {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDBWMHoiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTguMyA1LjcxYy0uMzktLjM5LTEuMDItLjM5LTEuNDEgMEwxMiAxMC41OSA3LjExIDUuN2MtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDAtLjM5LjM5LS4zOSAxLjAyIDAgMS40MUwxMC41OSAxMiA1LjcgMTYuODljLS4zOS4zOS0uMzkgMS4wMiAwIDEuNDEuMzkuMzkgMS4wMi4zOSAxLjQxIDBMMTIgMTMuNDFsNC44OSA0Ljg5Yy4zOS4zOSAxLjAyLjM5IDEuNDEgMCAuMzktLjM5LjM5LTEuMDIgMC0xLjQxTDEzLjQxIDEybDQuODktNC44OWMuMzgtLjM4LjM4LTEuMDIgMC0xLjR6Ii8+PC9zdmc+')
        }
    }`

    document.head.appendChild(style)
    document.write(`
        <div class="df-btn df-closed" onclick="dfToggle()">
            <div class="df-btn-text">${config.openText || 'Chat'}</div>
            <iframe class="df-btn-content" src="https://${config.project}.ui.dialogflow.cloud.ushakov.co"></iframe>
        </div>
    `)

    let dfToggled = false
    window.dfToggle = () => {
        document.querySelector('.df-btn').classList = dfToggled ? 'df-btn df-closed' : 'df-btn'
        document.querySelector('.df-btn-text').innerText = dfToggled ? (config.openText || 'Chat') : (config.closeText || 'Close')
        dfToggled = !dfToggled
    }
}