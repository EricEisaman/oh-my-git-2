<script lang="ts">
    import {t} from "svelte-i18n-lingui"
    import {
        Adventure,
        AdventureEvent,
        BattleEvent,
        NewCardEvent,
        CardRemovalEvent,
        WinEvent,
    } from "./cards.ts"
    import CardSvelte from "./Card.svelte"

    export let adventure: Adventure

    function isPickable(event: AdventureEvent) {
        let indexOfCurrentEvent = adventure.path.indexOf(adventure.currentEvent)
        let indexOfEvent = adventure.path.indexOf(event)
        return indexOfEvent == indexOfCurrentEvent + 1
    }

    function click(event) {
        if (isPickable(event)) {
            adventure.enterEvent(event)
        }
    }

    function eventLabel(event: AdventureEvent) {
        if (event instanceof BattleEvent) return "Battle"
        if (event instanceof NewCardEvent) return "New card"
        if (event instanceof CardRemovalEvent) return "Discard"
        if (event instanceof WinEvent) return "Diploma"
        return "Unknown"
    }
</script>

<div id="wrapper" class="panel">
    <div class="panel-header">
        <div>
            <h2>{$t`Journey to your Git diploma`}</h2>
            <p class="small-text">{$t`Select the next stop to continue your adventure through git concepts and challenges.`}</p>
        </div>
        <div class="label-pill">{adventure.path.length} {$t`stops`}</div>
    </div>

    <div id="path">
        {#each adventure.path as event, index}
            <div
                class="event-card {adventure.currentEvent == event ? 'current' : ''} {isPickable(event) ? 'pickable' : ''}"
                on:click={() => click(event)}
                on:keydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        click(event)
                    }
                }}
                role="button"
                tabindex="0"
            >
                <div class="event-icon">
                    {#if event instanceof BattleEvent}
                        ⚔️
                    {:else if event instanceof NewCardEvent}
                        🃏
                    {:else if event instanceof CardRemovalEvent}
                        🗑️
                    {:else if event instanceof WinEvent}
                        🏆
                    {:else}
                        ❓
                    {/if}
                </div>
                <div class="event-content">
                    <div class="event-name">{eventLabel(event)}</div>
                    <div class="event-index">{index + 1}</div>
                </div>
                {#if adventure.currentEvent == event}
                    <div class="player-marker">♟️</div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="panel-body deck-panel panel-surface">
        <div class="panel-header">
            <div>
                <h3>{$t`Your current deck`}</h3>
                <p class="small-text">{$t`These cards shape the git actions available in your next battles.`}</p>
            </div>
            <div class="label-pill">{adventure.deck.length} {$t`cards`}</div>
        </div>
        <div class="cards deck-cards">
            {#each adventure.deck as card}
                <CardSvelte {card} showCost={true} />
            {/each}
        </div>
    </div>
</div>

<style>
    #wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        gap: 1rem;
        padding: 1rem;
    }

    h2,
    h3 {
        margin: 0;
        color: white;
    }

    #path {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
        gap: 1rem;
        align-items: stretch;
        width: 100%;
    }

    .event-card {
        position: relative;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 1.4rem;
        padding: 1.15rem;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.9rem;
        align-items: center;
        cursor: default;
        transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        min-height: 7rem;
    }

    .event-card.pickable {
        cursor: pointer;
        border-color: rgba(82, 187, 255, 0.45);
        background: rgba(82, 187, 255, 0.08);
        transform: translateY(-1px);
    }

    .event-card.current {
        border-color: rgba(34, 255, 178, 0.55);
        box-shadow: 0 14px 35px rgba(34, 255, 178, 0.12);
    }

    .event-card:hover {
        transform: translateY(-2px);
    }

    .event-icon {
        width: 3.4rem;
        height: 3.4rem;
        display: grid;
        place-items: center;
        font-size: 1.75rem;
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.08);
    }

    .event-content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .event-name {
        color: white;
        font-size: 1rem;
        font-weight: 700;
    }

    .event-index {
        color: var(--text-muted);
        font-size: 0.95rem;
    }

    .player-marker {
        position: absolute;
        right: 1rem;
        top: 1rem;
        font-size: 1.5rem;
    }

    .deck-panel {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .deck-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        gap: 1rem;
    }

    .small-text {
        color: var(--text-muted);
        margin: 0.35rem 0 0;
        line-height: 1.5;
    }
</style>
