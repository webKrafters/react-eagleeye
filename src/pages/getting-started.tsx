import type { HeadFC } from 'gatsby';

import type { PageProps } from '../contexts/page';

import React from 'react';

import Anchor from '../partials/anchor';
import CodeBlock from '../partials/code-block';
import Header from '../partials/segment-header';
import ModeTabs from '../partials/tabs/mode';
import Name from '../partials/name';
import NotePad from '../partials/pad/note';
import Paragraph from '../partials/paragraph';
import SelectTab from '../partials/select-tab';

import '../partials/contents/getting-started-page/style.scss';

const GettingStartedPage : React.FC<PageProps> = ({ className }) => (
    <article className={ `getting-started-page ${ className }` }>
        <h1>Getting Started</h1>
        <BodyCurrent />
    </article>
);

export default GettingStartedPage;

export const Head : HeadFC = () => ( <title>Getting Started</title> );

const creatorCode_7_0_0 =
`import { createEagleEye } from '@webkrafters/react-eagleeye';
const MyContext = createEagleEye({
    a: { b: { c: null, x: { y: { z: [ 2022 ] } } } }
});
export const useMyStream = MyContext.useStream;
export default MyContext;`

const creatorCodeUniversal =
`import { createEagleEyeUniversal } from '@webkrafters/react-eagleeye';
const MyContext = createEagleEyeUniversal();
export const useMyStream = MyContext.useStream;
export const getDefaultState = () => ({
    a: { b: { c: null, x: { y: { z: [ 2022 ] } } } }
});
export default MyContext;`

const containerCode_7_0_0 =
`import React, { useEffect, useState } from 'react';
import MyContext from './context';
import Ui from './ui';

const Container = ({ ageInMinutes: c = 0 }) => {
    useEffect(() => MyContext.store.setState({ c: ageInMinutes }), [ ageInMinutes ]);
    return ( <Ui /> );
};
Container.displayName = 'Container';

export default Container;`

//-----------------------------------------------
//         using existing instance ID           |
//-----------------------------------------------
const containerCodeUniversal1 =
`import React, { useEffect, useState } from 'react';
import MyContext from './context';
import Ui from './ui';

const Container = ({
    ageInMinutes: c = 0,
    appStoreId
}) => {
    useEffect(() => {
        MyContext
            .getObservableAt( appStoreId )
            .store
            .setState({ c: ageInMinutes })
    }, [ ageInMinutes ]);
    return (
        <MyContext.Provider targetId={ appStoreId }>
            <Ui />
        </MyContext.Provider>
    );
};
Container.displayName = 'Container';

export default Container;`

//-----------------------------------------------
//              using local instance            |
//-----------------------------------------------
const containerCodeUniversal2 =
`import React, { useEffect, useState } from 'react';
import MyContext, { getDefaultState } from './context';
import Ui from './ui';

const Container = ({ ageInMinutes: c = 0 }) => {
    const [ observable ] = useState(() => (
        createEagleEye( getDefaultState() )
    ));
    useEffect(() => {
        observable
        .store
        .setState({ c: ageInMinutes })
    }, [ ageInMinutes ]);
    return (
        <MyContext.Provider observable={ observable }>
            <Ui />
        </MyContext.Provider>
    );
};

Container.displayName = 'Container';

export default Container;`

//-----------------------------------------------
//          using annonymous instance           |
//-----------------------------------------------
const containerCodeUniversal3 =
`import React, { useEffect, useRef } from 'react';
import MyContext, { getDefaultState } from './context';
import Ui from './ui';

const Container = ({ ageInMinutes: c = 0 }) => {
    const appStoreRef = useRef( null );
    useEffect(() => {
        MyContext.getObservableAt(
            appStoreRef.current.targetId
        ).store.setState({ c: ageInMinutes })
    }, [ ageInMinutes ]);
    return (
        <MyContext.Provider ref={ appStoreRef }>
            <Ui />
        </MyContext.Provider>
    );
};

Container.displayName = 'Container';

export default Container;`

const containerCodeUniversal = (
    <SelectTab options={[{
        label: ( <b>reusing known instance by its ID</b> ),
        value: ( <CodeBlock>{ containerCodeUniversal1 }</CodeBlock> )
    }, {
        label: ( <b>using locally created instance</b> ),
        value: ( <CodeBlock>{ containerCodeUniversal2 }</CodeBlock> )
    }, {
        label: ( <b>using annonymously generated instance</b> ),
        value: ( <CodeBlock>{ containerCodeUniversal3 }</CodeBlock> )
    }]} />
);

const connectorCode_7_0_0 =
`import React, { useCallback, useEffect } from 'react';
import MyContext from './context';

export const YearText = ({ data }) => ( <div>Year: { data.year }</div> );

export const YearInput = ({ data, resetState, setState }) => {
    const onChange = useCallback( e => setState({
        a: { b: { x: { y: { z: { 0: e.target.value } } } } }
    }), [ setState ]);

    useEffect(() => {
        data.year > 2049 && resetState([ 'a.b.c' ]);
    }, [ data.year ]);

    return ( <div>Year: <input type="number" onChange={ onChange } /></div> );
};

const withConnector = MyContext.connect({ year: 'a.b.x.y.z[0]' });
const Client1 = withConnector( YearText );
const Client2 = withConnector( YearInput );

const Ui = () => (
    <div>
        <Client1 />
        <Client2 />
    </div>
);

export default Ui;`

const connectorCodeUniversal =
`import React, { useCallback, useEffect } from 'react';
import MyContext from './context';

export const YearText = ({ data }) => ( <div>Year: { data.year }</div> );

export const YearInput = ({ data, resetState, setState }) => {
    const onChange = useCallback( e => setState({
        a: { b: { x: { y: { z: { 0: e.target.value } } } } }
    }), [ setState ]);

    useEffect(() => {
        data.year > 2049 && resetState([ 'a.b.c' ]);
    }, [ data.year ]);

    return ( <div>Year: <input type="number" onChange={ onChange } /></div> );
};

const stream = MyContext.stream({ year: 'a.b.x.y.z[0]' });
const Client1 = stream.into( YearText );
const Client2 = stream.into( YearInput );

const Ui = () => (
    <div>
        <Client1 />
        <Client2 />
    </div>
);

export default Ui;`

const useContextCode_7_0_0 =
`import React, { memo, useCallback, useEffect } from 'react';
import { useMyStream } from './context';

const selectorMap = { year: 'a.b.x.y.z[0]' };

const Client1 = memo(() => { // memoize to prevent 'no-change' renders from the parent.
    const { data } = useMyStream( selectorMap );
    return ( <div>Year: { data.year }</div> );
});

const Client2 = memo(() => { // memoize to prevent 'no-change' renders from the parent.

    const { data, setState, resetState } = useMyStream( selectorMap );

    const onChange = useCallback( e => setState({
        a: { b: { x: { y: { z: { 0: e.target.value } } } } }
    }), [ setState ]);

    useEffect(() => {
        data.year > 2049 && resetState([ 'a.b.c' ]);
    }, [ data.year ]);

    return ( <div>Year: <input type="number" onChange={ onChange } /></div> );
});

const Ui = () => (
    <div>
        <Client1 />
        <Client2 />
    </div>
);

export default Ui;`

const setupCode_7_0_0 =
`import React, { useEffect, useState } from 'react';
import Container from './container';

const MILLIS_PER_MINUTE = 6e4;

let numCreated = 0;

const App = () => {
    const [ age, updateAge ] = useState( 0 );
    const [ testNumber ] = useState( () => ++numCreated );

    useEffect(() => {
        const t = setTimeout(
            () => updateAge( age => age + 1 ),
            MILLIS_PER_MINUTE
        ); 
        return () => clearTimeout( t );
    }, [ age ]);

    return (
        <div>
            <h2>App instance #: { testNumber }</H2>
            <Container ageInMinutes={ age } />
        </div>
    );
}
export default App;`;

const setupCodeUniversal =
`import React, { useEffect, useState } from 'react';
import { createEagleEye } from '@webkrafters/react-eagleeye';
import MyContext, { getDefaultState } from './context';
import Container from './container';

const MILLIS_PER_MINUTE = 6e4;

let numCreated = 0;

const App = () => {
    const [ age, updateAge ] = useState( 0 );
    const [ testNumber ] = useState( () => ++numCreated );
    const [ appStore ] = useState(() => MyContext.provide({
        observable: createEagleEye( getDefaultState() )
    }));
    useEffect(() => {
        const t = setTimeout(
            () => updateAge( age => age + 1 ),
            MILLIS_PER_MINUTE
        ); 
        return () => clearTimeout( t );
    }, [ age ]);

    return (
        <div>
            <h2>App instance #: { testNumber }</H2>
            <Container
                ageInMinutes={ age }
                appStoreId={ appStore.targetId }
            />
        </div>
    );
}
export default App;`;

function BodyCurrent() {
    return (
        <>
            <Paragraph className="snippet-intro" id="install">
                <Name /> is an independent state manager, which once created, can be deployed at any location in all parts of the application. The <Name /> context comes in two usage modes: the <b>CSR</b> and the <b>SSR</b> modes.
            </Paragraph>
            <Paragraph className="snippet-box">
                <CodeBlock isInline>
                    npm install --save @webkrafters/react-eagleeye
                </CodeBlock>
            </Paragraph>
            <Paragraph className="snippet-intro" id="create-context-usage">
                <h3>Creating the <Name /> store</h3>
                To obtain a fresh context store, just obtain a <Name /> instance in a manner compatible with your application mode, shown as follows: 
            </Paragraph>
            <Paragraph className="snippet-box">
                <Header>context.js</Header>
                <ModeTabs
                    csrDoc={ <CodeBlock>{ creatorCode_7_0_0 }</CodeBlock> }
                    ssrDoc={ <CodeBlock>{ creatorCodeUniversal }</CodeBlock> }
                />
            </Paragraph>
            <Paragraph className="snippet-box container-code">
                <Header>container.js</Header>
                <ModeTabs
                    csrDoc={ <CodeBlock>{ containerCode_7_0_0 }</CodeBlock> }
                    ssrDoc={ containerCodeUniversal }
                />
            </Paragraph>
            <div className="snippet-intro" id="connect-usage">
                <h3>Joining the <Name /> change stream</h3>
                <Paragraph><Name /> change stream is a reactive store whose data are automatically changing to reflect most recent changes affecting them. </Paragraph>
                <Paragraph>There are two ways of joining the <Name /> change stream: The HOC method and the React Hook method.</Paragraph>
                <Paragraph>Let's tackle the HOC method first. This method uses the context's internal mechanism to bind a component automatically to the context. In a standard SPA { '(' }i.e. CSR mode{ ')' }, the <code style={{ fontWeight: 800 }}>connect(...)</code> property holding an HOC function wires up the context change stream to your consumer component. In a universal SPA { '(' }i.e. SSR mode{ ')' }, the <code style={{ fontWeight: 800 }}>stream(...)</code> property holding an <code style={{ fontWeight: 800 }}>into(...)</code> method accomplishes the same.</Paragraph>
                <Paragraph>It embodies the "set-it-and-forget-it" paradigm. Just set up a list of property paths to state slices to observe { '(' }see <Anchor to="/concepts/selector-map">Selector Map</Anchor>{ ')' }. The context takes care of the rest.</Paragraph>
                <Paragraph>The following is a sample of the HOC consumer method.</Paragraph>
            </div>
            <Paragraph className="snippet-box">
                <Header>ui.js</Header>
                <ModeTabs
                    csrDoc={ <CodeBlock>{ connectorCode_7_0_0 }</CodeBlock> }
                    ssrDoc={ <CodeBlock>{ connectorCodeUniversal }</CodeBlock> }
                />
            </Paragraph>
            <div className="snippet-intro" id="usecontext-usage">
                <h3>Joining the <Name /> change stream (React Hook method)</h3>
                <Paragraph>The following shows how to join the <Name /> stream using the hook method.</Paragraph>
                <Paragraph>This method uses the context's <code>useStream(...)</code> property holding the hook function to expose the context change stream to your consumer component.</Paragraph>
                <Paragraph><NotePad>In addition to setting up a map of property paths to state slices to observe { '(' }see <Anchor to="/concepts/selector-map">Selector Map</Anchor>{ ')' }, the consumer compoent may have to be wrapped in a <code>React.memo(...)</code> HOC to shield it from cascading rerenders from parent/anscestor components.</NotePad></Paragraph>
            </div>
            <Paragraph className="snippet-box">
                <Header>ui.js</Header>
                <CodeBlock>{ useContextCode_7_0_0 }</CodeBlock>
            </Paragraph>
            <Paragraph className="snippet-intro">
                The <Name /> runs decoupled from its embodying application, simply providing an active place for the application to accumulate, access, update and delete its various states as needed in ways that maintains immutabiliity and integrity of state data. The following is a contrived snippet to demonstrate.
            </Paragraph>
            <Paragraph className="snippet-box">
                <Header>app.js</Header>
                <ModeTabs
                    csrDoc={ <CodeBlock>{ setupCode_7_0_0 }</CodeBlock> }
                    ssrDoc={ <CodeBlock>{ setupCodeUniversal }</CodeBlock> }
                />
            </Paragraph>
        </>
    );
}
