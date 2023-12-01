import Image from 'next/image'
import { Block } from './components/Block'
import Hero from '@/components/Hero'
import DailyProgress from '@/components/DailyProgress'
import Categories from '@/components/Categories'
import AddTask from '@/components/AddTask'

export default function Home() {
  return (
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
       <Hero />
       <DailyProgress />
       <Categories />
       
      </div>
  )
}
