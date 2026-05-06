<script lang="ts">
    import LanguageSwitcher from "./LanguageSwitcher.svelte"
</script>

<div id="menu" class="panel">
    <div class="brand">
        <img src="/images/logo.png" alt="OMG Sigma Pathway logo" width="64" height="64" class="logo" />
        <div class="title-group">
            <h1>OMG Sigma Pathway</h1>
            <p>Master Git through gameplay with a clean, visual experience.</p>
        </div>
    </div>

    <div class="actions">
        <a class="button secondary" href="https://github.com/git-learning-game/oh-my-git-2" target="_blank" rel="noopener noreferrer">GitHub</a>
        <LanguageSwitcher />
    </div>
</div>

<style>
    #menu {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 1.25rem;
        min-height: 5.5rem;
        background: rgba(10, 18, 31, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .title-group h1 {
        margin: 0;
        font-size: 1.6rem;
        letter-spacing: -0.03em;
    }

    .title-group p {
        margin: 0.35rem 0 0;
        color: #b8c7dd;
        font-size: 0.98rem;
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 0.9rem;
    }

    .logo {
        width: 64px;
        height: 64px;
        object-fit: cover;
        border-radius: 1.1rem;
        background: rgba(255, 255, 255, 0.08);
        padding: 0.3rem;
    }

    a,
    button,
    .button {
        font-family: var(--title-font);
    }
</style>
