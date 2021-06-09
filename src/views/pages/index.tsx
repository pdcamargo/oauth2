import React from 'react';
import Html from '../layouts/html';
import Modal from '../components/Modal';

import { Button, Box } from '@chakra-ui/react';

const Index = () => {
	return (
		<Html
			title="Index Page Canter"
			scriptFiles={['sign-in.ts']}
		>
			<Button colorScheme="red" size="sm" className="btn">
				Olá meu botão default
			</Button>

			<Modal selector="canter">
				AQUI É O CONTEÚDO DO MEU MODAL
			</Modal>
		</Html>
	);
};

export default Index;
