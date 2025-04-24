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
				'https://avatars.mds.yandex.net/get-altay/14296560/2a000001935e30682a0f2b10a87930a98e21/orig',
			name: 'Вкусно — и точка',
			bonuses: 2,
		},
		{
			id: 2,
			logo_url:
				'https://msk.1mf.ru/upload/iblock/e54/d06lmq7xwsb02syncv6vuybwqak4aaym/%D0%9E%D1%84%D0%B8%D1%81%20%D0%9C%D0%B0%D0%B3%D0%BD%D0%B8%D1%82.jpg',
			name: 'Магнит',
			bonuses: 3,
		},
		{
			id: 3,
			logo_url:
				'https://avatars.mds.yandex.net/i?id=c87f285cebd89c0bd3bcb34bdc72a1b7011dbb1c-4825378-images-thumbs&n=13',
			name: 'Пятёрочка',
			bonuses: 1,
		},
		{
			id: 4,
			logo_url:
				'https://frankfurt.apollo.olxcdn.com/v1/files/n8lm1y4od1vp-UZ/image;s=840x630',
			name: 'Яндекс Go',
			bonuses: 4,
		},
		{
			id: 5,
			logo_url:
				'https://avatars.mds.yandex.net/i?id=2146f58d5e38e50cdc927470595c303d_l-4956094-images-thumbs&n=13',
			name: 'СберМаркет',
			bonuses: 2,
		},
		{
			id: 6,
			logo_url:
				'https://avatars.mds.yandex.net/i?id=156d8cffdc174838152bf77507e36968_l-5714596-images-thumbs&n=13',
			name: 'OZON',
			bonuses: 5,
		},
		{
			id: 7,
			logo_url:
				'https://avatars.mds.yandex.net/i?id=be0f99f8c9e1b85f6f9fde57936f20905b3ceb2a-8970800-images-thumbs&n=13',
			name: 'Wildberries',
			bonuses: 4,
		},
		{
			id: 8,
			logo_url:
				'https://ichip.ru/images/cache/2022/12/5/q90_668992_99329b906b647f5a60547a5fe.png',
			name: 'DNS',
			bonuses: 3,
		},
		{
			id: 9,
			logo_url:
				'https://80.img.avito.st/image/1/1.elYBWLa41r838RS6eWFgRRD61Lm_-VS3d_zUvbHx3rW3.Jw3j0S0iB9uM9Z8J9eHaqONkbrvjhyHkOO9HXukZw0Q',
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
				'https://avatars.mds.yandex.net/i?id=b1c7c5e810a870d1ef91f44c390b4abdfc8b712b-10414794-images-thumbs&n=13',
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
