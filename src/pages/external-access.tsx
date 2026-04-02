import React, { ReactNode } from 'react';

import CodeBlock from '../partials/code-block';

import Alert from '../partials/alert';
import Anchor from '../partials/anchor';
import Header from '../partials/segment-header';
import ListItem from '../partials/list-item';
import Name from '../partials/name';
import Paragraph from '../partials/paragraph';

const setupCode_7_0_0 =
`import React, { useCallback, useEffect, useRef, useState } from 'react';
import ObservableContext from './context'; // using example from the "Getting Started Page"
import Ui from './ui'; // using example from the "Getting Started Page"
import StoreMonitor from './debug-monitor';
const App = () => {
    const [ monitor ] = useState(() => new StoreMonitor(
        d => console.log( d ),
        ObservableContext.store
    ));
    useEffect(() => {})
    useEffect(() => () => monitor.cleanup(), []);
    return ( <Ui /> );
}
export default App;`

const externalAccessCode =
`class Monitor {
    private _onEvent;
    private _store;
    private _unsub;
    constructor( onEvent, store ) {
        this._onEvent = onEvent;
        this._source = store;
    }
    set onEvent( handler ) { this._onEvent = handler }
    get source() { return this._store }
    set source( store ) {
        if( store === this._store ) { return }
        this.cleanup();
        if( !store ) { return }
        this._store = store;
        this._onEvent( this._store.getState() );
        this._unsub = store.subscribe(
            () => this._onEvent( this._store.getState() )
        );
    }
    cleanup() {
        this._unsub?.();
        this._store = null;
    }
}
export default Monitor;`

const RESET_STATE_SAMPLE_v7_0_0 =
`store.subscribe(
    'data-updated', (
        changes : Changes<State>,
        changedPaths : Array<Array<string>>,
        netChanges : Partial<State>,
        mayHaveChangesAt : (tokenizedPath : string[]) => boolean
    ) => void
); // => VoidFunction`

const ExternalAccessPage : React.FC<{className : string}> = ({ className }) => (
    <article className={ `external-access-page ${ className }` }>
        <h1>External Access</h1>
        <BodyCurrent />
    </article>
);

export default ExternalAccessPage;

function BodyCurrent() {
    return (
        <>  
            <Paragraph>The <Name /> instance, once created, has a store property which is accessible from any where whether within the react component tree or in a native runtime environment.</Paragraph>
            <h3>How do I access the store externally?</h3>
            <Paragraph>This is done by simply utilizing the context <code>store</code> property.</Paragraph>
            <Paragraph>For external access to the context, <strong>4</strong> store methods have been exposed. Namely:</Paragraph>
            <ol id="external-apis">
                <li><strong><code>store.getState()</code>:</strong> Provides a static snapshot of the current state. Since v6.0.0, may accept a list of property paths to target properties within the state to fetch and return</li>
                <li><strong><code>store.resetState()</code>:</strong> Please see descriptions in the <Anchor to="/concepts/store/resetstate">store</Anchor> page. Since v6.0.0, may accept a parameterless invocation resulting in a noop.</li>
                <li><strong><code>store.setState()</code>:</strong> Please see descriptions in the <Anchor to="/concepts/store/setstate">store</Anchor> page.</li>
                <li>
                    <strong><code>store.subscribe(...)</code></strong><br />
                    <table>
                        <tr>
                            <td style={{ paddingRight: '0.5rem', verticalAlign: 'top' }}>-</td>
                            <td>Provides the API for manual subscription to the context's change and close events.</td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: '0.5rem', verticalAlign: 'top' }}>-</td>
                            <td>Returns a parameterless void function - the <b><u>unsubcriber</u></b>.</td>
                        </tr>
                        <tr id="subscribing-to-context-disposal">
                            <td style={{ paddingRight: '0.5rem', verticalAlign: 'top' }}>-</td>
                            <td>Accepts a <b>"closing"</b> event type and an observer function to be called before context deactivation.</td>
                        </tr>
                        <tr id="subscribing-to-context-state-update">
                            <td style={{ paddingRight: '0.5rem', verticalAlign: 'top' }}>-</td>
                            <td>Accepts a <b>"data-updated"</b> event type and an observer function for state changes.</td>
                        </tr>
                    </table>
                    <pre>{ RESET_STATE_SAMPLE_v7_0_0 }</pre>
                    <b><u>"data-updated"</u>  event listener params</b><br />
                    <ol>
                        <li><u>changes:</u> an object or array holding the original change request payload(s).</li>
                        <li><u>changedPaths:</u> an array of tokenized property paths belonging to state properties changed during this request.</li>
                        <li><u>netChanges:</u> an object of the final state of all properties in state changed.</li>
                        <li><u>mayHaveChangesAt:</u> a function to confirm that a given property path is among the new changes. This path is to be supplied as a tokenized string (i.e. supply <code>['a', 'b', 'c', '0', 'r']</code> for <code>'a.b.c[0].r'</code>).</li>
                    </ol>
                </li>
            </ol>
            <h4>Let's see some code!</h4>
            <div className="snippet-box">
                <Header>app.js</Header>
                <div>Sharing the store with a class.</div>
                <CodeBlock>{ setupCode_7_0_0 }</CodeBlock>
            </div>
            <div className="snippet-box">
                <Header>debug-monitor.js</Header>
                <div>Using a simple class instance to montor and report changes in the store in realtime.</div>
                <CodeBlock>{ externalAccessCode }</CodeBlock>
            </div>
            <Alert title="Pro Tips">
                <Paragraph>State references are always snapshots of the state at the time of access. In essence, the state returned by <code>context.store.getState(...)</code> are not affected by subsequent updates to the store's state. Any updates to this acquired state never affects the context's state. So therefore, the <strong>4</strong> considerations:</Paragraph>
                <ListItem><div>use only the <code>context.store.setState(...)</code> to update the context internal store.</div></ListItem>
                <ListItem><div><code>context.store.getState(...)</code> must be used to obtain the current state value.</div></ListItem>
                <ListItem><div>use your <code>context.store.subscribe(...)</code> to manually subscribe to state changes and refresh your current state value in realtime.</div></ListItem>
                <ListItem><div>use the <code>unsubscriber</code> returned by your context store's <code>subscribe(...)</code> to unsubscribe from the store when needed.</div></ListItem>
            </Alert>
        </>

    );
}
