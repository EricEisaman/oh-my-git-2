<script lang="ts">
    import CardSvelte from "./Card.svelte"
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()
    import {Card} from "./cards"
    import {t} from "svelte-i18n-lingui"

    export let message: string
    export let choices: Card[][]
    export let deck: Card[]

    function skip() {
        dispatch("choice", [])
    }
</script>

<div id="decision-container" class="panel">
    <div class="panel-header">
        <div>
            <h2>{message}</h2>
            <p class="small-text">{$t`Choose how you want to shape your next git encounter.`}</p>
        </div>
        <button class="secondary" on:click={skip}>↪️ {$t`Skip`}</button>
    </div>

    <div class="choices-grid">
        {#each choices as cards}
            <div
                class="choice"
                on:click={() => dispatch("choice", cards)}
                on:keydown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        e.stopPropagation()
                        e.target?.dispatchEvent(new MouseEvent("click"))
                    }
                }}
                tabindex="0"
                role="button"
            >
                <div class="choice-cards">
                    {#each cards as card}
                        <CardSvelte {card} clickable={true} showCost={true} />
                    {/each}
                </div>
                {#if cards.length > 1}
                    <div class="bundle">{$t`Bundle`}</div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="deck-panel panel-surface">
        <div class="panel-header">
            <div>
                <h3>{$t`Current deck`}</h3>
                <p class="small-text">{$t`These cards are currently available in your queue.`}</p>
            </div>
            <div class="label-pill">{deck.length} {$t`cards`}</div>
        </div>
        <div class="cards can-overflow">
            {#each deck as card}
                <CardSvelte {card} clickable={false} showCost={true} />
            {/each}
        </div>
    </div>
</div>

<style>
    #decision-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        min-height: 100%;
        padding: 1rem;
        box-shadow: none;
    }

    h2,
    h3 {
        margin: 0;
        color: white;
    }

    .panel-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .choices-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
        gap: 1rem;
        width: 100%;
    }

    .choice {
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.04);
        border-radius: 1.35rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        cursor: pointer;
        transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        min-height: 12rem;
    }

    .choice:hover,
    .choice:focus-visible {
        transform: translateY(-2px);
        background: rgba(82, 187, 255, 0.12);
        border-color: rgba(82, 187, 255, 0.35);
        outline: none;
    }

    .choice-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
        gap: 0.9rem;
    }

    .bundle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        background: rgba(255, 128, 203, 0.18);
        color: #ffd5f4;
        width: fit-content;
    }

    .deck-panel {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border-radius: 1.35rem;
    }

    .cards.can-overflow {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
        gap: 1rem;
        overflow-y: auto;
        width: 100%;
        min-height: 10rem;
        max-height: 22rem;
        padding-right: 0.25rem;
    }

    .small-text {
        color: var(--text-muted);
        margin: 0.35rem 0 0;
        line-height: 1.45;
    }
</style>
