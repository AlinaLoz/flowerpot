const packagejson = require("./package.json");

// if (process.env.VITE_APP_VERSION === undefined) {
//     const now = new Date();
//     process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${
//         now.getUTCHours() * 60 + now.getUTCMinutes()
//     }`;
// }

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
    directories: {
        output: "dist",
        buildResources: "build-resources",
    },
    files: ["host/**/dist/**", "build/**", "build-resources/**"],
    extraMetadata: {
        version: packagejson.version,
        main: "host/main/dist/index.cjs",
    },
    productName: "Lozita",
    appId: "mst.lozita",
    copyright: "Copyright © 2019 ${author}",
    linux: {
        icon: "build-resources/icons/png/flower0.png",
        category: "public.app-category.utilities",
        target: "AppImage"
    },
    publish: {
        provider: "github",
        owner: "AlinaLoz",
        repo: "flowerpot"
    },
};

module.exports = config;
