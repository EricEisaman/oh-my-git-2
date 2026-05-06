<script lang="ts">
    import {t} from "svelte-i18n-lingui"
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()

    let date = new Date().toISOString().split("T")[0]

    function print() {
        window.print()
    }
</script>

<div id="wrapper">
    <div id="diploma" class="panel panel-surface">
        <div id="ribbon">
            <span>{$t`Diploma awarded`}</span>
        </div>
        <div id="header">
            <h1>{$t`Git Diploma`}</h1>
            <h2>{$t`Awarded for completing OMG Sigma Pathway`}</h2>
        </div>

        <div id="body">
            <p>
                <span class="label-pill">{$t`Presented to`}</span>
                <input type="text" placeholder="Your name here" />
            </p>
            <p class="subtitle">{$t`For demonstrating proficiency in these Git skills:`}</p>
            <ul>
                <li>🪄 {$t`Repository creation & branching`}</li>
                <li>🪓 {$t`HEAD manipulation`}</li>
                <li>🍒 {$t`Merging, rebasing, and cherry-picking`}</li>
                <li>🧹 {$t`Index and workspace mastery`}</li>
                <li>🎩 {$t`Advanced git workflow skills`}</li>
            </ul>
        </div>

        <div id="footer">
            <p>{@html $t`Signed: ${"<strong>" + $t`Big Sig & Lil Siggy` + "</strong>"}`} • {$t`Date:`} {date}</p>
        </div>

        <div id="actions">
            <button class="secondary" on:click={print}>🖨️ {$t`Print`}</button>
            <button on:click={() => dispatch("closeDiploma")}>✕ {$t`Close`}</button>
        </div>
    </div>
</div>

<style>
    #wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100%;
        padding: 2rem;
        background: radial-gradient(circle at top center, rgba(255, 255, 255, 0.07), transparent 26%),
            linear-gradient(180deg, rgba(12, 18, 35, 0.95), rgba(8, 13, 22, 0.98));
    }

    #diploma {
        width: min(100%, 52rem);
        padding: 2rem;
        display: grid;
        gap: 1.4rem;
        position: relative;
        color: #e8edf6;
    }

    #ribbon {
        position: absolute;
        top: 1.4rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.55rem 1.1rem;
        border-radius: 999px;
        background: linear-gradient(135deg, rgba(82, 187, 255, 0.9), rgba(39, 154, 255, 0.95));
        color: white;
        font-weight: 700;
        letter-spacing: 0.05em;
        box-shadow: 0 12px 35px rgba(24, 138, 255, 0.25);
    }

    #header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.55rem;
        padding-top: 3rem;
    }

    h1 {
        margin: 0;
        font-size: 3rem;
        letter-spacing: -0.03em;
    }

    h2 {
        margin: 0;
        font-size: 1.1rem;
        color: var(--text-muted);
    }

    #body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    #body p {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin: 0;
        font-size: 1rem;
    }

    input {
        flex: 1;
        min-width: 12rem;
        padding: 0.9rem 1rem;
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.05);
        color: white;
        font: inherit;
    }

    .subtitle {
        color: var(--text-muted);
        margin: 0;
        font-size: 0.98rem;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.85rem;
    }

    li {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0.9rem 1rem;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1rem;
    }

    #footer {
        color: var(--text-muted);
        text-align: center;
    }

    #actions {
        display: flex;
        gap: 0.85rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 0.5rem;
    }

    @media print {
        @page {
            size: landscape;
        }
        #actions,
        :global(#lang-switch) {
            display: none;
        }
        #diploma {
            box-shadow: none;
            background: white;
            color: black;
        }
    }
</style>
