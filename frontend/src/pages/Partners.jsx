import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import RatingCard from '../components/RatingCard'
import Header from '../components/Header'
import { motion } from 'framer-motion'
import ModalWindow from '../components/ModalWindow'
import { useNavigate } from 'react-router-dom'

const Partners = () => {
	const [isOpen, setIsOpen] = useState(false)

	const RatingList = [
		{
			id: 1,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/6/6e/Vkusno_I_Tochka_symbol.svg',
			name: 'Вкусно — и точка',
			bonuses: 2,
		},
		{
			id: 2,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/3/3d/Magnit_logo.svg',
			name: 'Магнит',
			bonuses: 3,
		},
		{
			id: 3,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/6/6f/Pyaterochka_2020.svg',
			name: 'Пятёрочка',
			bonuses: 1,
		},
		{
			id: 4,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/4/4e/Yandex_Go_logo_2024.svg',
			name: 'Яндекс Go',
			bonuses: 4,
		},
		{
			id: 5,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/5/5e/Sbermarket_logo.png',
			name: 'СберМаркет',
			bonuses: 2,
		},
		{
			id: 6,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/2/2d/OZON_2019.svg',
			name: 'OZON',
			bonuses: 5,
		},
		{
			id: 7,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/0/0c/Wildberries_Logo.png',
			name: 'Wildberries',
			bonuses: 4,
		},
		{
			id: 8,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/9/9e/DNS_Logo.svg',
			name: 'DNS',
			bonuses: 3,
		},
		{
			id: 9,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/3/3c/Mvideo_logo_2023.png',
			name: 'М.Видео',
			bonuses: 3,
		},
		{
			id: 10,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tinkoff_Bank_logo.svg',
			name: 'Тинькофф',
			bonuses: 5,
		},
		// Дополнительные компании
		{
			id: 11,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/4/4f/Sberbank_Logo.svg',
			name: 'Сбербанк',
			bonuses: 4,
		},
		{
			id: 12,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/5/5e/Alfa-Bank_Logo.svg',
			name: 'Альфа-Банк',
			bonuses: 3,
		},
		{
			id: 13,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/8/8e/VkusVill_logo.svg',
			name: 'ВкусВилл',
			bonuses: 2,
		},
		{
			id: 14,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/1/1a/Lenta_logo.svg',
			name: 'Лента',
			bonuses: 3,
		},
		{
			id: 15,
			logo_url:
				'https://upload.wikimedia.org/wikipedia/commons/0/0f/Metro_Cash_and_Carry_logo.svg',
			name: 'METRO',
			bonuses: 4,
		},
	]

	// Сортируем по убыванию очков
	const sortedList = [...RatingList].sort((a, b) => b.score - a.score)

	return (
		<>
			<Header />

			<div className='relative w-full'>
				{/* Нижняя карточка */}
				<div className='flex flex-col w-4/5 mx-auto mt-10 rounded-4xl z-0 gradient-bg'>
					<div className='flex h-64 p-4'>
						<p className='text-center w-full drop-shadow-xs  text-white font-bold text-4xl'>
							Партнеры
						</p>
					</div>
				</div>

				{/* Верхняя карточка */}
				<div className='absolute top-18 left-1/2 transform -translate-x-1/2 w-5/7 z-10'>
					<div className='flex flex-col overflow-hidden rounded-3xl shadow-md'>
						<div className='flex flex-col justify-center items-center h-60 px-20 bg-white'>
							<p className='text-gray-700 text-sm leading-relaxed'>
								Партнёры проекта — это компании и организации, которые
								поддерживают волонтёров, предоставляя им бонусы и привилегии.
								Они помогают мотивировать участников, делая вклад в развитие
								добровольчества и социальных инициатив.
							</p>
							<p className='text-gray-700 text-sm mt-2'>
								Каждый партнёр может добавить свои уникальные бонусы, которые
								волонтёры смогут получить в зависимости от своего уровня
								активности. Система отслеживает использование бонусов через
								QR-коды — всё просто и удобно!
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-4 w-4/5 mx-auto mb-10 mt-25'>
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
							img_path={user.logo_url}
							category={user.bonuses}
						/>
					</motion.div>
				))}
			</div>
		</>
	)
}

export default Partners
