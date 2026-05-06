<script lang="ts">
    import {onMount} from "svelte"
    import {t} from "svelte-i18n-lingui"

    import {Repository} from "./repository.ts"
    import {Graph} from "./graph.ts"
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()

    export let repo: Repository = null

    let graphDiv: HTMLDivElement

    let graph: Graph

    let showTreesAndBlobs = false
    let showIndexAndWD = false
    let isFullscreen = false

    function createGraphIfPossible() {
        if (!graph && repo) {
            graph = new Graph(repo, graphDiv)
            graph.update()
            graph.onClickNode = function (id) {
                dispatch("clickNode", id)
            }
        }
    }

    $: if (repo && graphDiv) {
        createGraphIfPossible()
    }

    $: if (graph) {
        if (showIndexAndWD) {
            showTreesAndBlobs = true
        }

        graph.options.showTreesAndBlobs = showTreesAndBlobs
        graph.options.showIndexAndWD = showIndexAndWD
        update()
    }

    export const setRepo = (newRepo: Repository) => {
        repo = newRepo
        graph = new Graph(repo, graphDiv)
        update()
    }

    export const update = () => {
        if (graph) {
            graph.update()
        }
    }

    async function toggleFullscreen() {
        if (!document.fullscreenElement) {
            try {
                await graphDiv.requestFullscreen()
                isFullscreen = true
            } catch (err) {
                console.error("Error entering fullscreen:", err)
            }
        } else {
            try {
                await document.exitFullscreen()
                isFullscreen = false
            } catch (err) {
                console.error("Error exiting fullscreen:", err)
            }
        }
    }

    function handleFullscreenChange() {
        isFullscreen = !!document.fullscreenElement
    }

    onMount(() => {
        createGraphIfPossible()
        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    })
</script>

<div id="graph" bind:this={graphDiv}>
    <div id="options">
        <div class="option-group">
            <label>
                <input type="checkbox" bind:checked={showTreesAndBlobs} />
                {$t`Trees & blobs`}
            </label>
            {#if !repo.bare}
                <label>
                    <input type="checkbox" bind:checked={showIndexAndWD} />
                    {$t`Index & working directory`}
                </label>
            {/if}
        </div>
        <button class="fullscreen-btn" on:click={toggleFullscreen} title={isFullscreen ? $t`Exit fullscreen` : $t`Enter fullscreen`}>
            {#if isFullscreen}
                ⛶
            {:else}
                ⛶
            {/if}
        </button>
    </div>
</div>

<style>
    #graph {
        position: relative;
        overflow: hidden;
        display: flex;
        flex: 1;
    }
    :global(#graph svg) {
        flex: 1;
        height: 100%;
        width: 100%;
        font-family: Iosevka;
    }
    #options {
        position: absolute;
        right: 1em;
        top: 1em;
        padding: 1em;
        border-radius: 1em;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        display: flex;
        gap: 1em;
        align-items: flex-start;
    }

    .option-group {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    #options label {
        display: block;
    }

    .fullscreen-btn {
        padding: 0.5em 0.7em;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        border-radius: 0.5em;
        cursor: pointer;
        font-size: 1.2em;
        transition: background 0.15s ease, transform 0.15s ease;
    }

    .fullscreen-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }

    :global(#graph:fullscreen) {
        width: 100%;
        height: 100%;
    }
</style>
