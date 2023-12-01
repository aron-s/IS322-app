import { CategoryCard } from "./CategoryCard"

const Categories = () => {
  return (
    <div className="mt-6 mb-10">
      <h2 className="text-2xl tracking-tight font-semibold">Categories</h2>
      <div className="gap-4 grid grid-cols-2">
        <CategoryCard />

        <CategoryCard />

        <CategoryCard />
        <CategoryCard />

      </div>
    </div>
  )
}

export default Categories