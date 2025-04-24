import { Button } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ModalWindow from '../components/ModalWindow'

const Profile = () => {
	const [isOpen, setIsOpen] = useState(false)
	const role = 2
	return (
		<>
			<Header />
			<div className='relative w-full'>
				{/* Нижняя карточка */}
				<div className='flex flex-col w-4/5 mx-auto mt-10 z-0'>
					<div className='flex h-90 p-4 bg-[#22222E] rounded-4xl'>
						<p className='text-center w-full text-white text-4xl'>
							Личный кабинет
						</p>
					</div>
				</div>

				{/* Верхняя карточка — перекрывает нижнюю */}
				<div className='absolute top-18 left-1/2 transform -translate-x-1/2 w-5/7 z-10'>
					<div className='flex flex-col overflow-hidden rounded-3xl shadow-xl'>
						<div className='flex justify-between items-center h-90 p-4  bg-white'>
							{/* тут контент */}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Profile
