<script lang="ts">
    import {onDestroy} from "svelte"
    import {Terminal} from "linux-browser-shell"
    let terminalDiv: HTMLDivElement

    export let terminal: Terminal

    export function type(text: string) {
        terminal.send(text)
    }

    $: if (terminal && terminalDiv) {
        terminal.attach(terminalDiv)
        let width = Math.floor(terminalDiv.clientWidth / 20)
        let height =
            Math.floor(
                Math.max(
                    Math.min(Math.floor(terminalDiv.clientHeight / 8.3), 80),
                    10,
                ) / 2,
            ) * 2
        // TODO: hack...
        width = 21
        height = 50
        terminal.send(
            `stty rows 20 cols 20\nstty rows ${width} cols ${height}\n`,
        )
    }

    onDestroy(() => {
        terminal.dispose()
    })

    function enable() {
        terminal.focus(true)
    }

    function disable() {
        terminal.focus(false)
    }
</script>

<div id="wrapper" on:mouseenter={enable} on:mouseleave={disable} role="none">
    <div id="header">Terminal</div>
    <div id="terminal" bind:this={terminalDiv} />
</div>

<style>
    #wrapper {
        width: 100%;
        height: 100%;
        background: rgba(9, 15, 26, 0.96);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.35rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 24px 55px rgba(0, 0, 0, 0.28);
    }
    #header {
        padding: 0.95rem 1rem;
        font-weight: 700;
        color: #e7f0ff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.02);
        letter-spacing: 0.04em;
    }
    #terminal {
        flex: 1;
        min-height: 0;
    }
</style>
