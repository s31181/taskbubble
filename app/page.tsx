import Image from 'next/image'
import styles from './page.module.css'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth();
  const href = userId ? '/tasks' : '/new-user';
  return (
    <main className={styles.main}>
      <h1>TaskBubble</h1>
      <Link href={href}>Get Started</Link>
    </main>
  )
}
