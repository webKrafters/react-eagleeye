import React from 'react';
import Name from '../../partials/name';

const ConceptStoragePage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-storage-page ${ className }` }>
        <h1>Storage</h1>
        <BodyCurrent />
    </article>
);

export default ConceptStoragePage;

function BodyCurrent(){
    return (
        <>
            <h3>About the Storage</h3>
            <p>The <Name /> allows for a user-defined Storage object to be provided for maintaining the integrity of the initial context state at a location of the user's choosing.</p>
            <p>This, it accepts, either via its <code>createEagleEye{ '(...)' }</code> optional third parameter or by setting its <code>prehooks</code> property.</p>
            <Common />
        </>
    );
}

function Common() {
    return (
        <>
            <p>The <Name /> defaults to <code>window.sessionstorage</code> in supporting environments. Otherwise, it defaults to its own internal memory-based storage.</p>
            <p>
                A valid storage object is of the type: <code>IStorage{ '<' }State{ '>' }</code> implementing the following <strong>4</strong> methods:<br />
                <ol>
                    <li><code>clone: (data: State) ={ '>' } State; // expects a state clone</code></li>
                    <li><code>getItem: (key: string) ={ '>' } State;</code></li>
                    <li><code>removeItem: (key: string) ={ '>' } void;</code></li>
                    <li><code>setItem: (key: string, data: State) ={ '>' } void;</code></li>
                </ol>
            </p>
        </>
    );
}
