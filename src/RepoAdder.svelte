<script lang="ts">
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()

    let path = ""
    let bare = false
    let init = true

    function add() {
        let goodPath = path.trim()
        if (goodPath === "") {
            goodPath = Math.random().toString(36).substring(2, 6)
        }
        dispatch("addRepo", {path: `/tmp/${goodPath}`, bare, init})
        path = ""
    }

    function keydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            add()
        }
    }
</script>

<div id="wrapper" class="panel panel-surface">
    <div class="input-row">
        <label>
            <span class="label-pill">Path</span>
            <div class="input-group">
                <span class="prefix">/tmp/</span>
                <input
                    type="text"
                    bind:value={path}
                    placeholder="folder name"
                    on:keydown={keydown}
                />
            </div>
        </label>
        <label class="checkbox-label">
            <input type="checkbox" bind:checked={bare} />
            bare
        </label>
        <label class="checkbox-label">
            <input type="checkbox" bind:checked={init} />
            initialize
        </label>
        <button on:click={add}>Add</button>
    </div>
</div>

<style>
    #wrapper {
        width: 100%;
        padding: 0.9rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.9rem;
        border-radius: 1.35rem;
    }

    .input-row {
        display: flex;
        align-items: center;
        gap: 0.9rem;
        width: 100%;
        flex-wrap: wrap;
    }

    label {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        color: #e9eff8;
        font-size: 0.95rem;
    }

    .input-group {
        display: flex;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.04);
    }

    .prefix {
        padding: 0.85rem 1rem;
        color: var(--text-muted);
        background: rgba(255, 255, 255, 0.06);
        white-space: nowrap;
    }

    input[type="text"] {
        min-width: 12rem;
        border: none;
        outline: none;
        padding: 0.85rem 1rem;
        background: transparent;
        color: white;
        font: inherit;
    }

    .checkbox-label {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.65rem 0.9rem;
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }

    button {
        min-width: 7rem;
        padding: 0.85rem 1.15rem;
    }
</style>
