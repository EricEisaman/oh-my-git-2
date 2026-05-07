export default {
    locales: ["en", "de", "pt", "fr"],
    sourceLocale: "en",
    catalogs: [
        {
            path: "src/locales/{locale}",
            include: ["src"],
        },
    ],
}
