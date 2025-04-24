import { Children } from 'react'

const ModalWindow = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#00000050] backdrop-blur-xs'>
			<div className='flex flex-col w-[95%] max-w-md mx-auto overflow-hidden bg-white rounded-3xl'>
				<div className='flex justify-end items-center w-full text-white px-3 py-2 font-thin'>
					<img
						src='assets/icons/plus.svg'
						alt='Закрыть'
						className='rotate-45 h-5 cursor-pointer'
						onClick={onClose}
					/>
				</div>
				<div className='flex justify-between items-center h-50 p-4 text-white'>
					{children}
				</div>
			</div>
		</div>
	)
}

export default ModalWindow
