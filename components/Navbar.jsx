import Link from 'next/link';
import { AddTask } from './AddTask';


const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card h-16 z-10">
      <div className="flex justify-around">
        <div className='flex flex-grow rounded-tr-2xl shadow-custom justify-center items-center'>
        <Link href="/" className=''>
          Home
        </Link>
        </div>
        <div>
         
         <AddTask/>

        </div>
       <div className='flex flex-grow rounded-tl-2xl shadow-custom justify-center items-center'>
       <Link href="/chat">
          Chat
        </Link>
       </div>
      
      </div>
    </div>
  );
}

export default BottomNav