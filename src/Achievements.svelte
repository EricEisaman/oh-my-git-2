<script lang="ts">
    import {t} from "svelte-i18n-lingui"
    import {AchievementTracker} from "./achievements.ts"
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()

    export let tracker: AchievementTracker

    $: points = tracker.getPoints()
    $: totalPoints = tracker.getTotalPoints()
</script>

<div id="wrapper" class="panel">
    <div class="heading">
        <div>
            <h2>{$t`Achievements`}</h2>
            <p class="small-text">{$t`Track progress on git milestones and unlock the diploma.`} 🎓</p>
        </div>
        <div class="score label-pill">{$t`Points`}: {points}/{totalPoints}</div>
    </div>

    <ul>
        {#each tracker.achievementProgresses as progress}
            <li
                class:fullfilled={progress.progress >= progress.target}
                class:hidden={!progress.visible}
            >
                <span>{$t(progress.achievement.description)}</span>
                {#if progress.progress >= progress.target}
                    <span class="label-pill">{$t`Done`}</span>
                {/if}
            </li>
        {/each}
    </ul>

    <div class="actions">
        {#if tracker.isComplete()}
            <button on:click={() => dispatch("showDiploma")}>{$t`Show Diploma`}</button>
        {:else}
            <p class="small-text">{$t`Complete all achievements to earn your Git diploma.`} 🎓</p>
        {/if}
    </div>
</div>

<style>
    #wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.25rem;
        background: rgba(12, 21, 36, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        overflow: hidden;
    }

    .heading {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
    }

    h2 {
        margin: 0;
        font-size: 1.35rem;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.75rem;
        flex: 1 1 0;
        min-height: 0;
        overflow-y: auto;
        align-content: start;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 1.15rem;
        border-radius: 1.1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        transition: background 0.2s ease, transform 0.15s ease;
    }

    li:hover {
        background: rgba(255, 255, 255, 0.06);
        transform: translateY(-1px);
    }

    li.fullfilled {
        border-color: rgba(36, 196, 138, 0.35);
        background: rgba(36, 196, 138, 0.12);
    }

    .hidden {
        opacity: 0.34;
    }

    .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .score {
        font-weight: 700;
        color: #dff9ff;
        background: rgba(35, 79, 136, 0.22);
    }

    .small-text {
        color: var(--text-muted);
        margin: 0;
        line-height: 1.45;
    }
</style>
