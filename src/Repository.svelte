<script lang="ts">
    import {onMount} from "svelte"
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()

    import Graph from "./Graph.svelte"
    import Cards from "./Cards.svelte"
    import {Repository, GitBlob} from "./repository.ts"
    import {TextFile} from "./files.ts"

    export let repo: Repository

    let graph: Graph

    let index: TextFile[] = []
    let workingDirectory: TextFile[] = []

    onMount(() => {
        update()
    })

    $: if (repo) {
        update()
    }

    async function update() {
        graph?.update()
        updateFiles()
    }

    function updateFiles() {
        workingDirectory = []
        for (let entry of repo.workingDirectory.entries) {
            let content = ""
            if (entry.oid) {
                let blob = repo.objects[entry.oid]
                if (blob instanceof GitBlob) {
                    content = blob.content
                } else {
                    throw new Error("Requested OID is not a blob")
                }
            } else {
                content = repo.files[entry.name].content
            }
            workingDirectory.push(new TextFile(entry.name, content))
        }
        workingDirectory.sort((a, b) => a.name.localeCompare(b.name))

        index = []
        for (let entry of repo.index.entries) {
            let blob = repo.objects[entry.oid]
            let content = ""
            if (blob instanceof GitBlob) {
                content = blob.content
            } else {
                content = `(object ${entry.oid.substr(
                    0,
                    4,
                )} not found in current repo)`
            }
            index.push(new TextFile(entry.name, content))
        }
        index.sort((a, b) => a.name.localeCompare(b.name))
    }
</script>

<div id="wrapper">
    <div
        id="name"
        on:click={() => {
            dispatch("swapDir", repo.path)
        }}
    >
        {repo.path}
        {#if repo.bare}(bare){/if}
    </div>
    {#if repo.empty}
        <div id="message">(not initialized)</div>
    {:else}
        <div id="graph">
            <Graph {repo} bind:this={graph} on:clickNode />
        </div>
    {/if}
    <div id="cards">
        <Cards {index} {workingDirectory} on:edited />
    </div>
    <div id="delete">
        <button on:click={() => dispatch("deleteRepo", repo)}>❌</button>
    </div>
</div>

<style>
    #wrapper {
        flex: 1;
        display: flex;
        position: relative;
        min-width: 0;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(10, 18, 33, 0.96), rgba(8, 14, 26, 0.9));
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        box-shadow: 0 24px 55px rgba(0, 0, 0, 0.24);
    }
    #graph {
        flex: 1;
        overflow: hidden;
        display: flex;
    }
    :global(#graph svg) {
        height: 100%;
        width: 100%;
    }
    #message {
        flex: 1;
        justify-self: center;
        align-self: center;
        text-align: center;
        font-style: italic;
        color: #c4d1e2;
        padding: 1.5rem;
    }
    #cards {
        display: flex;
        width: 100%;
    }
    #name {
        position: absolute;
        top: 1rem;
        left: 1rem;
        z-index: 10;
        cursor: pointer;
        font-weight: 700;
        color: #e7f1ff;
        background: rgba(255, 255, 255, 0.06);
        padding: 0.65rem 0.95rem;
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: transform 0.15s ease;
    }
    #name:hover {
        transform: translateY(-1px);
    }
    #delete {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    #delete button {
        padding: 0.55rem 0.85rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.06);
        color: #f0f7ff;
        transition: background 0.15s ease, transform 0.15s ease;
    }
    #delete button:hover {
        background: rgba(255, 255, 255, 0.14);
        transform: translateY(-1px);
    }
</style>
