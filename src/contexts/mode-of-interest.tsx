import React, {
	Children,
	createContext,
	FC,
	ReactNode,
	useState
} from 'react';

import metadata from '../../gatsby-config/metadata';

import { Mode } from '../partials/tabs/mode';

export interface Props {
	children?: ReactNode;
	initValue? : Mode;
};

export const UpdateCtx = createContext<React.Dispatch<React.SetStateAction<Mode>>>(()=>{});
export const ValueCtx = createContext<Mode>( null as unknown as Mode );

const Provider : FC<Props> = ({
	children,
	initValue = metadata.modeOfInterest.defaultValue
}) => {
	const [ modeOfInteret, setModeOfInterest ] = useState( () => initValue );
	return (
		<UpdateCtx.Provider value={ setModeOfInterest }>
			<ValueCtx.Provider value={ modeOfInteret }>
				{ Children.map( children, c => c ) }
			</ValueCtx.Provider>
		</UpdateCtx.Provider>
	);
};

export default Provider;
