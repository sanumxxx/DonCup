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
					<div className='flex h-90 p-4 gradient-bg rounded-4xl'>
						<p className='text-center w-full text-white drop-shadow-xs  font-bold text-4xl'>
							Личный кабинет
						</p>
					</div>
				</div>

				{/* Верхняя карточка — перекрывает нижнюю */}
				<div className='absolute top-18 left-1/2 transform -translate-x-1/2 w-5/7 z-10'>
					<div className='flex flex-col overflow-hidden rounded-3xl shadow-md'>
						<div className='flex justify-between h-90 p-4  bg-white'>
							<div className='flex flex-col'>
								<div className='flex items-center gap-5'>
									<img
										className='rounded-full h-25 w-25'
										src='https://i.pinimg.com/736x/6a/49/7f/6a497fbb881b2c87ff09819970afe111.jpg'
										alt=''
									/>
									<div className='flex flex-col'>
										<p className='text-2xl'>Иванов Иван Иванович</p>
										<p className='font-thin'>aleksandr.ivanov1985@yandex.ru</p>
									</div>
								</div>
								<p className='my-5'>Категория: 1</p>
								<p className='my-5'>
									Достижения: Помощь в организации благотворительного забега
								</p>
							</div>
							<div className='flex flex-col justify-center items-center mr-25'>
								<p>25 место</p>
								<img src='assets/Ресурс.svg' alt='' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Profile
