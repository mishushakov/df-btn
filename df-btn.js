let wrapper = document.querySelector('#df-btn')
let config = {
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
    element = `
    <div class="df-layout">
        <iframe class="df-modal df-modal-reset" src="https://${config.project}.ui.dialogflow.cloud.ushakov.co"></iframe>
        <div class="df-btn" onclick="dfToggle()">${config.openText || 'Open'}</div>
    </div>
    <style>
        .df-layout {
            position: fixed;
            bottom: 0;
            right: 0;
            margin: 24px;
        }

        @keyframes show {
            0% {
                height: 0px;
                width: 0px;
                opacity: 0;
            }

            100% {
                height: ${config.height || '500px'};
                width: ${config.width || '320px'};
                opacity: 1;
            }
        }

        @keyframes hide {
            0% {
                height: ${config.height || '500px'};
                width: ${config.width || '320px'};
                opacity: 1;
            }

            100% {
                height: 0px;
                width: 0px;
                opacity: 0;
            }
        }

        .df-modal {
            border: 0;
            padding: 8px;
            border-radius: 16px;
            background-color: white;
            height: ${config.height || '500px'};
            width: ${config.width || '320px'};
            box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12),0 5px 5px -3px rgba(0,0,0,0.2);
            display: block;
        }

        .df-modal-visible {
            animation: .25s show ease;
        }

        .df-modal-hidden {
            animation: .25s hide forwards;
        }

        .df-modal-reset {
            display: none;
        }

        .df-btn {
            margin-top: 24px;
            float: right;
            box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 1px 3px 1px rgba(60,64,67,0.149);
            font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 0;
            letter-spacing: .25px;
            align-items: center;
            background-color: #fff;
            background-image: none;
            border-radius: 28px;
            color: #3c4043;
            display: inline-flex;
            font-weight: 500;
            height: 56px;
            min-width: 56px;
            padding: 0;
            cursor: pointer;
            transition: all .08s linear
        }

        .df-btn:hover, .df-expanded {
            padding: 0 24px 0 0;
            height: 48px;
            font-size: .875rem;
            border-radius: 24px;
            box-shadow: 0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)
        }

        .df-btn:before {
            min-width: 56px;
            height: 48px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 24px;
            background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjVweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMjUgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5wYXRoLTE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMjMuNzkzMjMwOCw2LjIyMjc2OTIzIEwxMy41MTM4NDYyLDAuMjkwNDYxNTM4IEMxMi44NDkyMzA4LC0wLjA5MzUzODQ2MTUgMTIuMDIyMTUzOCwtMC4wOTM1Mzg0NjE1IDExLjM1NzUzODUsMC4yOTA0NjE1MzggTDEuMDc4MTUzODUsNi4yMjI3NjkyMyBDMC40MTM1Mzg0NjIsNi42MTE2OTIzMSAwLjAwNDkyMzA3NjkyLDcuMzIwNjE1MzggMC4wMDQ5MjMwNzY5Miw4LjA5MzUzODQ2IEwwLjAwNDkyMzA3NjkyLDE5Ljk2OCBDMC4wMDQ5MjMwNzY5MiwyMC43MzYgMC40MTM1Mzg0NjIsMjEuNDQ0OTIzMSAxLjA3ODE1Mzg1LDIxLjgzMzg0NjIgTDYuMjIyNzY5MjMsMjQuODA3Mzg0NiBMNi4yMjI3NjkyMywzMC44Njc2OTIzIEM2LjIyMjc2OTIzLDMxLjIyNzA3NjkgNi41MTMyMzA3NywzMS41MTI2MTU0IDYuODcyNjE1MzgsMzEuNTEyNjE1NCBDNi45ODU4NDYxNSwzMS41MTI2MTU0IDcuMDk0MTUzODUsMzEuNDgzMDc2OSA3LjE5MjYxNTM4LDMxLjQyNCBMMjMuODA4LDIxLjgzODc2OTIgQzI0LjQ3MjYxNTQsMjEuNDU0NzY5MiAyNC44ODYxNTM4LDIwLjc0NTg0NjIgMjQuODgxMzE2OSwxOS45NzI5MjMxIEwyNC44ODEzMTY5LDguMDkzNTM4NDYgQzI0Ljg3NjMwNzcsNy4zMTU2OTIzMSAyNC40NjI3NjkyLDYuNjA2NzY5MjMgMjMuNzkzMjMwOCw2LjIyMjc2OTIzIFoiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIj4KICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgZmlsbD0id2hpdGUiPgogICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICA8dXNlIGlkPSJwYXRoLTEiIGZpbGw9IiMwMDAwMDAiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+');
            content: ''
        }

        .df-btn:active {
            opacity: .6
        }

        .df-btn-close:before {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDBWMHoiLz48cGF0aCBkPSJNMTguMyA1LjcxYy0uMzktLjM5LTEuMDItLjM5LTEuNDEgMEwxMiAxMC41OSA3LjExIDUuN2MtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDAtLjM5LjM5LS4zOSAxLjAyIDAgMS40MUwxMC41OSAxMiA1LjcgMTYuODljLS4zOS4zOS0uMzkgMS4wMiAwIDEuNDEuMzkuMzkgMS4wMi4zOSAxLjQxIDBMMTIgMTMuNDFsNC44OSA0Ljg5Yy4zOS4zOSAxLjAyLjM5IDEuNDEgMCAuMzktLjM5LjM5LTEuMDIgMC0xLjQxTDEzLjQxIDEybDQuODktNC44OWMuMzgtLjM4LjM4LTEuMDIgMC0xLjR6Ii8+PC9zdmc+')
        }

        @media (prefers-color-scheme: dark){
            .df-modal {
                background-color: #121212
            }
        }
        </style>
        <script>
        let dfToggled = false
        let dfToggle = () => {
            document.querySelector('.df-modal').classList = dfToggled ? 'df-modal df-modal-hidden' : 'df-modal df-modal-visible'
            document.querySelector('.df-btn').classList = dfToggled ? 'df-btn' : 'df-btn df-expanded df-btn-close'
            document.querySelector('.df-btn').innerText = dfToggled ? '${config.openText}' : '${config.closeText}'
            dfToggled = !dfToggled
        }
        </script>
    `
    document.write(element)
}