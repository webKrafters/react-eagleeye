import type { GatsbyBrowser } from 'gatsby';

import type { PageProps } from './src/contexts/page';

import React, {
    useContext,
    useEffect,
    useLayoutEffect
} from 'react';

import metadata, { NO_SIDER_URI_PATTERN } from './gatsby-config/metadata';

import BasePackageProvider from './src/contexts/base-pkg';

import PageProvider, { UpdaterCtx as PageCtxUpdater } from './src/contexts/page';

import DarkmodeProvider, { ValueCtx as DarkmodeValueCtx } from './src/contexts/dark-mode';

import ModeOfInterestProvider from './src/contexts/mode-of-interest';

import VersionOfInterestProvider from './src/contexts/version-of-interest';

import Layout from './src/partials/layouts/index';

import { Version } from './src/partials/tabs/version/utils/calc-version-vmodel';

import { fromLocalStorage } from './src/partials/tabs/version/component';

import { Mode } from './src/partials/tabs/mode';

export const onRouteUpdate : GatsbyBrowser[ "onRouteUpdate" ] = ({
    location: { href }
}) => {
    setTimeout( () => {
        sanitizeScroll( href );
        sanitizePageTitle();
    }, 100 );
};

const PageManager : React.FC<{
    children: React.ReactNode,
    props: PageProps
}> = ({ children, props }) => {
    const updatePageCtx = useContext( PageCtxUpdater );
    const darkmode = useContext( DarkmodeValueCtx );
    useLayoutEffect(() => {
        document.querySelector( 'body' )?.classList[
            darkmode ? 'add' : 'remove'
        ]( 'dark' );
    }, [ darkmode ]);
    useEffect(() => updatePageCtx( s => ({ ...s, ...props }) ), [ props ]);
    useEffect(() => updatePageCtx( s => ({
        ...s,
        isNoSiderPage: NO_SIDER_URI_PATTERN.test( props.uri ?? '' )
    }) ), [ props.uri ]);
    return ( <Layout { ...props }>{ children }</Layout> );
};

export const wrapPageElement : GatsbyBrowser[ 'wrapPageElement' ] = ({ element, props }) => (
    <PageManager  props={ props }>
        { element }
    </PageManager>
);

export const wrapRootElement : GatsbyBrowser[ 'wrapRootElement' ] = ({ element, pathname  }) => (
    <BasePackageProvider>
        <PageProvider initState={{
            isNoSiderPage: NO_SIDER_URI_PATTERN.test(
                location?.pathname ?? pathname ?? ''
            )
        }}>
            <DarkmodeProvider initValue={
                window.localStorage?.getItem( metadata.darkmode.key ) !== 'false'
                    ? metadata.darkmode.defaultValue
                    : false
            }>
                <VersionOfInterestProvider initValue={( 
                    fromLocalStorage( metadata.versionOfInterest.key ) ?? metadata.versionOfInterest.defaultValue
                ) as Version }>
                    <ModeOfInterestProvider initValue={( 
                        window.localStorage?.getItem( metadata.modeOfInterest.key ) ?? metadata.modeOfInterest.defaultValue
                    ) as Mode }>
                        { element }
                    </ModeOfInterestProvider>
                </VersionOfInterestProvider>
            </DarkmodeProvider>
        </PageProvider>
    </BasePackageProvider>
);

function sanitizePageTitle() {
    const headElement = document.querySelector( 'head' );
    if( !headElement || headElement.querySelector( ':scope > title' ) ) { return }
    const titleElement = document.createElement( 'title' );
    titleElement.setAttribute( 'data-gatsby-head', 'true' );
    titleElement.appendChild(
        document.createTextNode(
            metadata.title
        )
    );
    headElement.appendChild( titleElement );
}

function sanitizeScroll( href : string ) {
    const sider = document.querySelector( '.site-body-sider' );
    if( !sider ) { return restateHistory( href ) }
    window.scroll( 0, 0 ); 
    !( new URL( href ).hash ).length
        ? sider.parentNode?.querySelector( ':scope > main' )?.scroll( 0, 0 )
        : restateHistory( href );
}

function restateHistory( href : string ) {
    setTimeout(
        () => window.history.replaceState( undefined, '', href ),
        350
    );
}
