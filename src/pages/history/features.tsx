import type { HeadFC } from 'gatsby';

import type { PageProps } from '../../contexts/page';

import React from 'react';

import Anchor from '../../partials/anchor';

const TRow : React.FC<{children: React.ReactNode}> = ({ children }) => ( <tr className="vertical-top">{ children }</tr> );
TRow.displayName = 'featuresHistory.TRow';

const TCol : React.FC<{children: React.ReactNode}> = ({ children }) => ( <td className="top-barred" style={{ paddingRight: '2rem' }}>{ children }</td> );

const THCol : React.FC<{children: React.ReactNode}> = ({ children }) => ( <th colSpan={ 2 } style={{ paddingRight: '2rem', textAlign: 'left' }}>{ children }</th> );

const FeaturesHistoryPage : React.FC<PageProps> = ({ className }) => (
    <article className={ `features-history-page ${ className }` }>
        <h1 id="changes">What's Changed?</h1>
        <table>
            <thead><TRow><THCol>v1.0.0</THCol></TRow></thead>
            <tbody>
                <TRow><TCol><b>1.</b></TCol><TCol>Initial release of React v19+ compatible <Anchor to="https://eagleeye.js.org/">Eagle Eye</Anchor> based state management system. See React Observable Context <Anchor to="https://react-observable-context.js.org/history/features/">history</Anchor> for related previous developments.</TCol></TRow>
                {/* <TRow><td><b>7.</b></td><td>Removed the need for <code>store.getState</code>. <code>store.data</code> now holds the state slices used at the client. Changes in any of the slices held by the <code>store.data</code> are automatically updated as they occur. The client is immediately notified of the update.</td></TRow> */}
            </tbody>
        </table>
    </article>
);

export default FeaturesHistoryPage;

export const Head : HeadFC = () => ( 
    <meta
        content="What's changed?"
        name="description"
    />
);
