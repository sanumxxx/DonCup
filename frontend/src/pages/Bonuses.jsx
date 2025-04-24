import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import EventCard from '../components/EventCard'
import Header from '../components/Header'
import { motion } from 'framer-motion'
import ModalWindow from '../components/ModalWindow'
import { useNavigate } from 'react-router-dom'

const Bonuses = () => {
	const [isOpen, setIsOpen] = useState(false)
	const events = [
		{ name: 'бонус' },
		{ name: 'бонус' },
		{ name: 'бонус' },
		{ name: 'бонус' },
		{ name: 'бонус' },
		{ name: 'бонус' },
		{ name: 'бонус' },
	]

	const role = 2

	const handleClick = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<>
			<Header />

			<div className='relative w-full'>
				{/* Нижняя карточка */}
				<div className='flex flex-col w-4/5 mx-auto mt-10 bg-[#22222E] rounded-4xl z-0'>
					<div className='flex h-64 p-4'>
						<p className='text-center w-full pixelify text-white text-4xl'>
							Мероприятия
						</p>
					</div>
				</div>

				{/* Верхняя карточка */}
				<div className='absolute top-18 left-1/2 transform -translate-x-1/2 w-5/7 z-10'>
					<div className='flex flex-col overflow-hidden rounded-3xl shadow-lg'>
						<div className='flex justify-between items-center h-90 p-4 bg-white'>
							{role === 1 ? (
								<p>Волонтер</p>
							) : role === 2 ? (
								<div className='w-full flex justify-center'>
									<button
										onClick={handleClick}
										className={`relative rounded-lg h-10 px-3 transition-all overflow-hidden bg-[#7CDE84] text-white hover:shadow-lg hover:shadow-[#7CDE8475] active:bg-[#9ADEC2]`}
									>
										Создать бонус
									</button>
								</div>
							) : role === 3 ? (
								<p>Регион</p>
							) : (
								<p>ничего</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Карточки мероприятий */}
			<div className='grid grid-cols-3 auto-rows-auto gap-4 w-4/5 mx-auto mt-60'>
				{events.map((event, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: index * 0.1 }}
					>
						<EventCard
							name={event.name}
							isPurple={event?.isPurple ?? true}
							description='описание'
						/>
					</motion.div>
				))}
			</div>

			{/* Модалка */}
			<ModalWindow isOpen={isOpen} onClose={closeModal}>
				<p className='text-white'>Тут будет форма добавления мероприятия!</p>
			</ModalWindow>
		</>
	)
}

export default Bonuses
