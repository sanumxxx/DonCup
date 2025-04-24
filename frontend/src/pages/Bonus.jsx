import Header from '../components/Header'

const Bonus = () => {
	return (
		<>
			<Header />
			<div className='relative w-full'>
				{/* Нижняя карточка */}
				<div className='flex flex-col w-4/5 mx-auto mt-10 gradient-bg rounded-4xl z-0'>
					<div className='flex h-64 p-4'>
						<p className='text-center w-full drop-shadow-xs  text-white font-bold text-4xl'>
							Название бонуса
						</p>
					</div>
				</div>

				{/* Верхняя карточка */}
				<div className='absolute top-18 left-1/2 transform -translate-x-1/2 w-5/7 z-10'>
					<div className='flex flex-col overflow-hidden rounded-3xl shadow-md'>
						<div className='flex justify-between items-center h-90 p-4 bg-white'>
							<p className='text-center w-full pixelify text-black text-4xl'>
								описание бонуса
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Bonus
