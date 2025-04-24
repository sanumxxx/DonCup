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
						<div className='flex justify-between items-center h-90 p-4 bg-white'></div>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-4 w-4/5 mx-auto mb-10 mt-60'>
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
