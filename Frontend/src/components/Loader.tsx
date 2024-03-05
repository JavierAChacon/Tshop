import { TbLoader3 } from 'react-icons/tb'

const Spinner = (): JSX.Element => (
  <div className='spin flex h-[calc(100dvh-2.5rem)] items-center justify-center'>
    <TbLoader3 className='h-10 w-10 animate-spin' />
  </div>
)

export default Spinner
