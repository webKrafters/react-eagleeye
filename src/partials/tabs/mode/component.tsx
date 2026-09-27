import React, {
	FC,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';

import {
	graphql,
	useStaticQuery
} from 'gatsby';

import { Button } from 'antd';

import { CheckCircleOutlined } from '@ant-design/icons';

import { UpdateCtx, ValueCtx } from '../../../contexts/mode-of-interest';

export const enum Mode {
	CSR = 'csr-only',
	SSR = 'universal'
};

export type Props = Omit<JSX.IntrinsicElements[ "div" ], "children"> & {
	csrDoc? : ReactNode;
	label? : ReactNode;
	ssrDoc? : ReactNode;
}

const textStyle = {
    fontSize: '0.7rem',
    fontWeight: 800
};

const defaultLabel = (
	<span style={{ ...textStyle, marginRight: '0.5rem' }}>
		MODE:
	</span>
);

const ModeTabs : FC<Props> = ({
	className: prefixCls,
	csrDoc = null,
	label = defaultLabel,
	ssrDoc = null,
	style = {},
	...props
}) => {
	const { site: { siteMetadata: { modeOfInterest: {
		defaultValue,
		key: M_INTEREST_LOCALSTORAGE_KEY
	} } } } = useStaticQuery(
		graphql`
			query modeOfInterestInfo {
				site {
					siteMetadata {
						modeOfInterest {
							defaultValue,
							key
						}
					}
				}
			}
		`
	);
	
	const updateModeOfInterest = useContext( UpdateCtx );
	const modeOfInterest = useContext( ValueCtx );

	const [ mode, setMode ] = useState(() => {
		let mode = modeOfInterest;
		if( !mode ) {
			mode = window?.localStorage 
				? ( localStorage.getItem( M_INTEREST_LOCALSTORAGE_KEY ) ?? defaultValue )
				: defaultValue;
			updateModeOfInterest( mode );
		}
		return mode;
	});

	useEffect(() => {
		if( modeOfInterest === mode ) { return }
		localStorage.setItem( M_INTEREST_LOCALSTORAGE_KEY, modeOfInterest );
		setMode( modeOfInterest );
	}, [ modeOfInterest ]);

	const mProps = {
		...props,
		className: `mode-tabs${ prefixCls ? ' ' + prefixCls : '' }`,
		style: { ...style, marginTop: '-1.5rem' }
	};

	return (
		<div { ...mProps }>
			<div style={{
				alignItems: 'center',
				display: 'flex',
				justifyContent: 'flex-end',
				marginBottom: '-3px'
			}}>
				{ label }
				<Button.Group { ...{ prefixCls, size: 'small' } }>
					<Selector mode={ Mode.CSR } />
					<Selector mode={ Mode.SSR } />
				</Button.Group>
			</div>
			<div className={ `content${ prefixCls ? ' ' + prefixCls : '' }` }>
				{ mode === Mode.CSR ? csrDoc : ssrDoc }
			</div>
		</div>
	);

};

export default ModeTabs;

const btnStyle = {
	alignItems: 'center',
	borderRadius: 0,
	display: 'flex',
	width: '3.75rem',
	zIndex: 0
};

function Selector({ mode } : { mode : Mode }) {
	const modeOfInterest = useContext( ValueCtx );
	const updateModeOfInterest = useContext( UpdateCtx );
	const onClick = useCallback(() => updateModeOfInterest( mode ), []);
	const [ isCurrent, modeLabel ] = useMemo(() => {
		const isCurrent = mode === modeOfInterest;
		return [ isCurrent, (
			<span style={ isCurrent ? textStyle : {
				...textStyle,
				color: '#1899ff',
				fontStyle: 'italic'
			}}>
				{ mode === Mode.CSR ? 'CSR' : 'SSR' }
			</span>
		) ];
	}, [ mode, modeOfInterest ]);
	return !isCurrent ? (
		<Button { ...{ onClick, style: {
			...btnStyle,
			borderColor: '#1899ff #1899ff #fff',
			justifyContent: 'center'
		} } }>
			{ modeLabel }
		</Button>
	) : (
		<Button { ...{ style: {
			...btnStyle,
			cursor: 'default'
		}, type: 'primary' } }>
			{ modeLabel }
			<CheckCircleOutlined />
		</Button>
	);
}
