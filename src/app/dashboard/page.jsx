import { checkUser } from '@/lib/checkUser'
import React from 'react'

const Dashboard = async() => {

  const user=await checkUser();

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard