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
		{
			name: 'бонус',
			img_path: '',
		},
		{
			name: 'бонус',
			img_path: '',
		},
		{
			name: 'бонус',
			img_path: '',
		},
		{
			name: 'бонус',
			img_path: '',
		},
		{
			name: 'бонус',
			img_path: '',
		},
		{
			name: 'бонус',
			img_path: '',
		},
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
				<div className='flex flex-col w-4/5 mx-auto mt-10 gradient-bg rounded-4xl z-0'>
					<div className='flex h-64 p-4'>
						<p className='text-center w-full drop-shadow-xs text-white font-bold text-4xl'>
							Бонусы
						</p>
					</div>
				</div>

				{/* Верхняя карточка */}
				<div className='absolute top-18 left-1/2 transform -translate-x-1/2 w-5/7 z-10'>
					<div className='flex flex-col overflow-hidden rounded-3xl shadow-md'>
						<div className='flex flex-col gap-4 justify-between p-6 bg-white rounded-3xl'>
							{/* Роль пользователя */}
							{role === 1 ? (
								<div className=' rounded-xl p-4 text-sm text-black'>
									<h2 className='text-lg font-semibold text-[#22222E] mb-2'>
										Как работают бонусы?
									</h2>
									<p className='text-gray-700 mb-2'>
										Ты можешь получать бонусы от партнёров за свою активность. У
										тебя есть определённое количество бонусов, и ты сам
										выбираешь, как их потратить.
									</p>
									<p className='text-gray-700 mb-2'>
										Чем выше ты в рейтинге, тем больше бонусов тебе доступно. Ты
										можешь выбрать абсолютно любой бонус из списка, но будь
										внимателен — у тебя есть ограничение по количеству.
									</p>
									<p className='text-gray-700'>
										После выбора бонуса покажи свой QR-код партнёру — и забирай
										приз! Всё просто и по кайфу.
									</p>
								</div>
							) : role === 2 ? (
								<>
									<div className=' rounded-xl p-4 text-sm text-black'>
										<h2 className='text-lg font-semibold text-[#22222E] mb-2'>
											Для кого создаются бонусы?
										</h2>
										<p className='text-gray-700 mb-2'>
											Вы создаёте бонусы для волонтёров, которые участвуют в
											мероприятиях и помогают в организации. Это ваша
											возможность поблагодарить их за труд.
										</p>
										<p className='text-gray-700 mb-2'>
											Волонтёр может выбрать ваш бонус, если у него достаточно
											накопленных очков. Вы просто сканируете его QR-код и
											подтверждаете выдачу.
										</p>
										<p className='text-gray-700'>
											Бонусы можно создавать в любой момент, а система
											автоматически отслеживает их использование.
										</p>
									</div>
									<div className='w-full flex justify-center'>
										<button
											onClick={handleClick}
											className='relative rounded-lg h-10 px-3 transition-all overflow-hidden bg-[#7CDE84] text-white hover:shadow-lg hover:shadow-[#7CDE8475] active:bg-[#9ADEC2]'
										>
											Создать бонус
										</button>
									</div>
								</>
							) : (
								<p className='text-gray-500'>ничего</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Карточки мероприятий */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-4/5 mx-auto mt-35 mb-10'>
				{events.map((event, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: index * 0.1 }}
					>
						<EventCard name={event.name} img_path={event.img_path} />
					</motion.div>
				))}
			</div>

			{/* Модалка */}
			<ModalWindow isOpen={isOpen} onClose={closeModal}>
				<p className='text-white'>Тут будет форма добавления бонуса!</p>
			</ModalWindow>
		</>
	)
}

export default Bonuses
