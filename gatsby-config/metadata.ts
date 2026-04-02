import pkgJson from '../package.json';

export const basePkgName = '@webkrafters/react-eagleeye';

export const NO_SIDER_URI_PATTERN = /^$/; // /^(?:\/(?:quick-start\/?)?(?:\?.*)?)?$/;

export default {
    _24Hours: 8.64e7,
    contact: pkgJson.author.email,
    copyright: 'This website is a copyright of webKrafters Inc. 2024-Present',
    darkmode: {
        defaultValue: true,
        key: 'DKM-RE'
    },
    description: pkgJson.description,
    device: {
        backgroundColor: '#22222f',
        maxWidth: {
            handheldPortait: 991
        },
        themeColor: '#23272f'
    },
    language: 'en',
    siteUrl: 'https://react-eagleeye.js.org',
    title: 'React Eagle Eye JS',
    url: {
        demo: `https://codesandbox.io/s/github/${ basePkgName.slice( 1 ) }-app`,
        npm: `https://www.npmjs.com/package/${ basePkgName }`,
        repo: `https://github.com/${ basePkgName.slice( 1 ) }.js.git`,
        site: pkgJson.homepage
    },
    versionOfInterest: {
        defaultValue: 'Latest',
        key: 'VEROI-RE'
    },
};
