import React from 'react';

import { Button, Box, CloseButton } from '@chakra-ui/react';

const Modal = ({
	children,
	selector,
}: {
	children?: React.ReactNode;
	selector?: string;
}) => {
	const selectorObj = {
		['data-modal-' + selector]: selector,
	};

	return (
		<Box className="modal" {...selectorObj}>
			<div className="modal__overlay">
				<div className="modal__content">
					<Box
						backgroundColor="white"
						borderRadius="md"
						padding="2"
						position="relative"
					>
						{children}

						<div className="modal__close-button">
							<CloseButton />
						</div>
					</Box>
				</div>
			</div>
		</Box>
	);
};

export default Modal;
