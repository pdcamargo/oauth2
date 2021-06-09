const setModalState = (
	selector: string,
	state: 'open' | 'closed',
) => {
	const modalElement = document.querySelector(
		`[data-modal-${selector}]`,
	);

	if (!modalElement) {
		return;
	}

	const closeButton = modalElement.querySelector(
		'.modal__close-button',
	);

	const modalOverlay = modalElement.querySelector(
		'.modal__overlay',
	);

	const handleCloseButtonClick = (event: MouseEvent) => {
		event.preventDefault();

		setClose();
	};

	const handleOverlayClick = (event: MouseEvent) => {
		event.preventDefault();

		if (event.target === event.currentTarget) {
			setClose();
		}
	};

	const setOpen = () => {
		modalElement.classList.add('open');

		closeButton.addEventListener(
			'click',
			handleCloseButtonClick,
		);

		modalOverlay.addEventListener(
			'click',
			handleOverlayClick,
		);
	};

	const setClose = () => {
		modalElement.classList.remove('open');

		closeButton.removeEventListener(
			'click',
			handleCloseButtonClick,
		);

		modalOverlay.removeEventListener(
			'click',
			handleOverlayClick,
		);
	};

	if (state === 'open') {
		setOpen();
	} else {
		setClose();
	}
};

const openModal = (selector: string) => {
	setModalState(selector, 'open');
};
