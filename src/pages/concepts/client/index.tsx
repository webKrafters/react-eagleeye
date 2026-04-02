import React from 'react';

import Anchor from '../../../partials/anchor';
import Name from '../../../partials/name';
import Paragraph from '../../../partials/paragraph';

const ConceptClientPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-client-page ${ className }` }>
        <h1>Client</h1>
        <BodyCurrent />
    </article>
);

export default ConceptClientPage;

function BodyCurrent() {
    return (
        <div>
            <h3>What is a client?</h3>
            <div>
                <Paragraph>
                    A client is any component consuming the <Name />. A client consumes this context by:
                    <ul>
                        <li>either joining the <Name />'s change stream by invoking the context's <Anchor to="/api#usecontext">useStream</Anchor> hook property</li>
                        <li>or connecting itself to the change stream via the connector returned by the context's <Name /> <Anchor to="/api#connect">connect</Anchor> function property</li>
                    </ul>
                </Paragraph>
                <Paragraph>
                    Please see examples respectively in:
                    <ol>
                        <li><Anchor to="/getting-started#usecontext-usage">Joining the <Name /> change stream { '(' }hook with memo method{ ')' }</Anchor></li>
                        <li><Anchor to="/getting-started#connect-usage">Joining the <Name /> change stream { '(' }hoc method{ ')' }</Anchor></li>
                    </ol>
                </Paragraph>
            </div>
        </div>
    );
}
