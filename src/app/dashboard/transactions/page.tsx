import { redirect } from 'next/navigation'

const Page = () => {
  return (
   redirect(`/dashboard/transactions/size`)
  )
}

export default Page