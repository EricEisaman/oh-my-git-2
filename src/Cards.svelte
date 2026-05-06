<script lang="ts">
    import {t} from "svelte-i18n-lingui"
    import {createEventDispatcher} from "svelte"
    import {TextFile} from "./files.ts"
    import FileSvelte from "./File.svelte"
    const dispatch = createEventDispatcher()

    export let index: TextFile[] = []
    export let workingDirectory: TextFile[] = []

    function drop(e: DragEvent, slotIndex: number) {
        e.preventDefault()
    }

    function clickFile(_: MouseEvent, file: TextFile) {
        dispatch("clickFile", {file})
    }
</script>

<div id="wrapper" class="panel panel-surface">
    {#if workingDirectory.length > 0}
        <div class="group">
            <div class="column-title">{$t`Working directory`}</div>
            <div class="cards">
                {#each workingDirectory as file}
                    <FileSvelte
                        name={file.name}
                        content={file.content}
                        editable={true}
                        on:dragover={(e) => e.preventDefault()}
                        on:drop={(e) => drop(e, file)}
                        on:click={(e) => clickFile(e, file)}
                        on:edited
                    />
                {/each}
            </div>
        </div>
    {/if}

    {#if index.length > 0}
        <div class="group index">
            <div class="column-title">{$t`Index`}</div>
            <div class="cards">
                {#each index as file}
                    <FileSvelte
                        name={file.name}
                        content={file.content}
                        on:dragover={(e) => e.preventDefault()}
                        on:drop={(e) => drop(e, file)}
                        on:click={(e) => clickFile(e, file)}
                    />
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    #wrapper {
        padding: 1rem;
        display: grid;
        grid-template-columns: 1.2fr 0.9fr;
        gap: 1rem;
        overflow: hidden;
        min-height: 100%;
        align-items: stretch;
    }

    .group {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.25rem;
        padding: 1.1rem;
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
    }

    .cards {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        min-height: 0;
    }

    .column-title {
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.92rem;
        color: #d8e5ff;
    }

    .index {
        background: rgba(27, 38, 57, 0.95);
        color: #eaf0ff;
    }
</style>
