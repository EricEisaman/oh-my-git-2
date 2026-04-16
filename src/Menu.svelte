<script lang="ts">
    import LanguageSwitcher from "./LanguageSwitcher.svelte"
</script>

<div id="menu">
    <img src="/images/logo.png" alt="OMG Sigma Pathway logo" width="64" height="64" class="logo" />
    <div>
        <h1>OMG Sigma Pathway</h1>
        <h2>by Big Sig and Lil Siggy</h2>
    </div>
    <span class="filler"></span>
    <a href="https://github.com/git-learning-game/oh-my-git-2" _target="blank"
        >GitHub</a
    >
    <LanguageSwitcher />
</div>

<style>
    #menu {
        background: grey;
        display: flex;
        align-items: center;
        gap: 1em;
    }
    #menu * {
        font-size: 1.3rem;
        color: black;
    }
    #menu h1 {
        margin-left: 0.5em;
    }
    .filler {
        flex: 1;
    }
    a {
        text-decoration: none;
        color: #244a87 !important;
    }
    a:hover {
        text-decoration: underline;
    }

    .logo {
        width: 64px;
        height: 64px;
        object-fit: contain;
        margin-left: 0.5em;
    }
</style>
