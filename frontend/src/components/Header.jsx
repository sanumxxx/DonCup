import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const navigate = useNavigate()

	return (
		<div className='flex flex-col w-[95%] mx-auto mt-3'>
			<div className='flex justify-between items-center h-22 p-4 rounded-2xl bg-white shadow-md'>
				<p className='text-4xl font-bold text-black'>Дари добро</p>
				<div className='flex items-center gap-5 md:gap-10 text-black '>
					<p
						className='hover:underline cursor-pointer'
						onClick={() => navigate('/partners')}
					>
						Партнеры
					</p>
					<p
						className='hover:underline cursor-pointer'
						onClick={() => navigate('/bonuses')}
					>
						Бонусы
					</p>
					<p
						className='hover:underline cursor-pointer'
						onClick={() => navigate('/rating')}
					>
						Рейтинг
					</p>
					<img
						className='h-12 w-12 rounded-full hover:scale-102 cursor-pointer transition-all'
						src='https://i.pinimg.com/736x/6a/49/7f/6a497fbb881b2c87ff09819970afe111.jpg'
						alt=''
						onClick={() => navigate('/profile')}
					/>
				</div>
			</div>
		</div>
	)
}

export default Header
