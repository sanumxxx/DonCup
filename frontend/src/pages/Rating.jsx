import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import RatingCard from '../components/RatingCard'
import Header from '../components/Header'
import { motion } from 'framer-motion'
import ModalWindow from '../components/ModalWindow'
import { useNavigate } from 'react-router-dom'

const Rating = () => {
	const [isOpen, setIsOpen] = useState(false)

	const RatingList = [
		{ name: 'Иван Иванов', category: 120 },
		{ name: 'Андрей Смирнов', category: 120 },
		{ name: 'Мария Козлова', category: 120 },
		{ name: 'Ольга Петрова', category: 120 },
		{ name: 'Егор Сидоров', category: 120 },
	]

	// Сортируем по убыванию очков
	const sortedList = [...RatingList].sort((a, b) => b.score - a.score)

	return (
		<>
			<Header />

			<div className='relative w-full'>
				{/* Нижняя карточка */}
				<div className='flex flex-col w-4/5 mx-auto mt-10 gradient-bg rounded-4xl z-0'>
					<div className='flex h-64 p-4'>
						<p className='text-center w-full text-white drop-shadow-xs font-bold text-4xl'>
							Рейтинг волонтеров
						</p>
					</div>
				</div>

				{/* Верхняя карточка */}
				<div className='absolute top-18 left-1/2 transform -translate-x-1/2 w-5/7 z-10'>
					<div className='flex flex-col overflow-hidden rounded-3xl shadow-md'>
						<div className='flex justify-between h-116 p-4 bg-white'>
							<div class='w-11/12 md:w-4/5 mx-auto mt-10 text-black'>
								<h2 class='text-2xl md:text-3xl font-bold text-center mb-6 text-black'>
									Бонусная система волонтёров
								</h2>

								<p class='text-base text-center mb-8 max-w-2xl mx-auto text-gray-700'>
									Чем выше вы в рейтинге, тем круче бонусы от наших партнёров.
									Волонтёры делятся на три категории в зависимости от позиции в
									топе.
								</p>

								<div class='grid md:grid-cols-3 gap-4'>
									<div class='bg-gray-100 border border-yellow-400 rounded-xl p-4 shadow-md text-sm'>
										<h3 class='text-lg font-bold text-yellow-600 mb-1'>
											1–50 место
										</h3>
										<p class='text-gray-700 mb-3'>
											Максимальный уровень бонусов
										</p>
										<ul class='list-disc list-inside text-gray-600 space-y-1'>
											<li>Скидки до 50% у партнёров</li>
											<li>Подарки от организаторов</li>
											<li>Приоритет на участие</li>
										</ul>
									</div>

									<div class='bg-gray-100 border border-gray-400 rounded-xl p-4 shadow-md text-sm'>
										<h3 class='text-lg font-bold text-gray-600 mb-1'>
											51–100 место
										</h3>
										<p class='text-gray-700 mb-3'>Средний уровень бонусов</p>
										<ul class='list-disc list-inside text-gray-600 space-y-1'>
											<li>Скидки до 30% у партнёров</li>
											<li>Мерч и сувениры</li>
											<li>Участие в закрытых ивентах</li>
										</ul>
									</div>

									<div class='bg-gray-100 border border-orange-400 rounded-xl p-4 shadow-md text-sm'>
										<h3 class='text-lg font-bold text-orange-600 mb-1'>
											101–150 место
										</h3>
										<p class='text-gray-700 mb-3'>
											Минимальный уровень бонусов
										</p>
										<ul class='list-disc list-inside text-gray-600 space-y-1'>
											<li>Скидки до 10%</li>
											<li>Электронные благодарности</li>
											<li>Доступ в чат сообщества</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-4 w-4/5 mx-auto mb-10 mt-75'>
				{sortedList.map((user, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: index * 0.1 }}
					>
						<RatingCard
							place={index + 1}
							username={user.name}
							category={user.category}
						/>
					</motion.div>
				))}
			</div>
		</>
	)
}

export default Rating
