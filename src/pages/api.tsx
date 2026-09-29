import React, { ReactNode } from 'react';

import Anchor from '../partials/anchor';
import ListItem from '../partials/list-item';
import Name from '../partials/name';
import NotePad from '../partials/pad/note';
import Paragraph from '../partials/paragraph';

const ApiPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `api-page ${ className }` }>
        <h1>API</h1>
        <BodyCurrent />
    </article>
);

export default ApiPage;

function BodyCurrent(){
    return (
        <>
            <div id="cache">
                <h3>cache</h3>
                <ListItem><div>is a property providing access to the underlying immutable cache managed by this <Name /> instance.</div></ListItem>
                <NotePad>
                    <InlineH4>On <Name /> Universal Instance.</InlineH4>
                    <div>The <b><code>getObservableAt(...)</code></b> method of this instance may be used to obtain a <Name /> instance whose <code>cache</code> property is sought.</div>
                </NotePad>
            </div>
            <div id="closed">
                <h3>closed</h3>
                <ListItem><div>is a boolean property confirming that the context is still active.</div></ListItem>
                <ListItem><div>Use the <Anchor to="/external-access#subscribing-to-context-disposal">"closing"</Anchor> event to be notified right before context deactivation.</div></ListItem>
                <ListItem><div>Please see the <Anchor to="/api#dispose">dispose</Anchor> method below.</div></ListItem>
                <NotePad>
                    <InlineH4>On <Name /> Universal Instance.</InlineH4>
                    <div>The <b><code>getObservableAt(...)</code></b> method of this instance may be used to obtain a <Name /> instance whose <code>closed</code> flag is under examinaton.</div>
                </NotePad>
            </div>
            <div id="connect">
                <h3>connect</h3>
                <ListItem><div>is a function property of the <Name /> instance, accepting an optional <Anchor to="/concepts/selector-map">selector map</Anchor> parameter; and returning a reusable connector function.</div></ListItem>
                <ListItem><div>The connector function takes a client as a parameter and returns an HOC.</div></ListItem>
                <ListItem><div>Any client intending to observe similar selector map from within the <Name /> instance may be passed to this connector.</div></ListItem>
                <ListItem><div>The HOC injects the context's change stream <Anchor to="/concepts/store">store</Anchor> to the client and handles all of the context usage requirements.</div></ListItem>
                <ListItem><div>The injected <Anchor to="/concepts/store">store</Anchor> monitors changes in the underlying state slices referenced by the selector map.</div></ListItem>
                <ListItem><div>A change in any of the referenced state slices automatically triggers an update of the related <code>store.data</code> property and a subsequent render of the client.</div></ListItem>
                <ListItem><div>Any prop name conflicts between the injected <Anchor to="/concepts/store">store properties</Anchor> and the client's own props are resolved in favor of the client's own props. Such a scenario may be remedied by renaming the conflicting key within the <Anchor to="/concepts/selector-map">selector map</Anchor>.</div></ListItem>
                <NotePad>
                    <InlineH4><Name /> Universal Equivalent.</InlineH4>
                    <div>The <b><code>stream(...)</code></b> function property is the <Name /> Universal instance <code>{ 'connect(...)' }</code> equivalent. This function returns an object whose <b><code>into(...)</code></b> method serves as the connector.</div>
                </NotePad>
            </div>
            <div id="create-context">
                <h3>createEagleEye (SSR mode: createEagleEyeUniversal)</h3>
                <ListItem><div>is a function accepting three optional parameters { '(' }to wit: the initial state object or an <Anchor to="https://auto-immutable.js.org/getting-started/">AutoImmutable</Anchor> instance bearing this initial state object, the <Anchor to="/concepts/prehooks">prehooks</Anchor> and the <Anchor to="/concepts/storage">storage</Anchor>{ ')' } and returning a <Name /> instance.</div></ListItem>
                <ListItem><div>The returned instance is the store-bearing context.</div></ListItem>
                <ListItem><div>The context's <Anchor to="/external-access">store</Anchor> is directly accessible through its <code>store</code> property.</div></ListItem>
                <ListItem><div>A change stream <Anchor to="/concepts/store">store</Anchor> for this <code>context</code> can be obtained either by utilizing its <Anchor to="/api#connect">connect (or <code>stream</code> in SSR mode)</Anchor> function property or by expressing its <Anchor to="/api#usecontext">useStream</Anchor> property as a react component hook.</div></ListItem>
                <NotePad>
                    <InlineH4>On <Name /> Universal Instance.</InlineH4>
                    <div>This instance produced by the <b><code>createEagleEyeUniversal(...)</code></b> serves to manage <Name /> instance availability and dispensaton in shared environments.</div>
                </NotePad>
            </div>
            <div id="dispose">
                <h3>dispose</h3>
                <ListItem><div>is a context method to deactivate this context.</div></ListItem>
                <ListItem><div>Context deactivation is permanent.</div></ListItem>
                <ListItem><div>The context's <Anchor to="/api#closed"><code>closed</code></Anchor> property confirms this status.</div></ListItem>
                <NotePad>
                    <InlineH4>On <Name /> Universal Instance.</InlineH4>
                    <div>The <b><code>getObservableAt(...)</code></b> method of this instance may be used to obtain a <Name /> instance to dispose.</div>
                </NotePad>
            </div>
            <div id="provide">
                <h3>Provisioning</h3>
                <ListItem><div>is a feature of the <Name /> Universal class dispensed through the two following properties:</div></ListItem>
                <Paragraph style={{ marginLeft: '2.5rem' }}>
                    <h4>provide(...)</h4>
                    <ListItem><div>a method for making a <Name /> instance available to the application environment.</div></ListItem>
                    <ListItem><div>when an existing instance is supplied, makes it available; returns an identifier for it.</div></ListItem>
                    <ListItem><div>when no instance is supplied, makes a new one available; returns an identifier for it.</div></ListItem>
                </Paragraph>
                <Paragraph style={{ marginLeft: '2.5rem' }}>
                    <h4>{ '<' }Provider{ ' />' }</h4>
                    <ListItem><div>a declarative component property equivalent of the aforementioned <code>provide(...)</code> method.</div></ListItem>
                    <ListItem><div>makes <Name/> instance available to the React component tree.</div></ListItem>
                    <ListItem><div>when an identifier to an existing instance is supplied, makes the identified instance available to the component tree; holds the identifier in the <code>targetId</code> property of its <code>ref</code> prop.</div></ListItem>
                    <ListItem><div>when an existing instance is supplied, makes it available to the component tree; holds the identifier in the <code>targetId</code> property of its <code>ref</code> prop.</div></ListItem>
                    <ListItem><div>when no instance is supplied, makes a new one available to the component tree; holds the identifier in the <code>targetId</code> property of its <code>ref</code> prop.</div></ListItem>
                </Paragraph>
            </div>
            <div id="usage-error">
                <h3>UsageError</h3>
                <ListItem><div style={{ fontWeight: 700 }}>deprecated.</div></ListItem>
            </div>
            <div id="usecontext">
                <h3>useStream</h3>
                <ListItem><div>is a property of the <Name /> instance which can be expressed as a react hook.</div></ListItem>
                <ListItem><div>It accepts an optional <Anchor to="/concepts/selector-map">selector map</Anchor> parameter; and returns a change stream context <Anchor to="/concepts/store">store</Anchor>.</div></ListItem>
                <ListItem><div>The injected <Anchor to="/concepts/store">store</Anchor> monitors changes in the underlying state slices referenced by the selector map.</div></ListItem>
                <ListItem><div>A change in any of the referenced state slices automatically triggers an update of the related <code>store.data</code> property and a subsequent render of the client.</div></ListItem>
                <ListItem><div>The context's <Anchor to="/api#connect">connect</Anchor> property function is axiomatically the more conducive method for consuming this conetxt.</div></ListItem>
                <ListItem><div>In certain user-specific cases, direct access to this method may be preferrable.</div></ListItem>
                <ListItem><div>In such cases, it is advisable to wrap the client in a <code>React.memo() if needed</code>.</div></ListItem>
            </div>
        </>
    );
}

function InlineH4 ({ children } : { children : ReactNode }) {
    return (
        <h4 style={{
            display: 'inline-block',
            margin: '0 0 0 0.5rem',
            textDecoration: 'underline'
        }}>{ children }</h4>
    )
}
