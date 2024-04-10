import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header"
import Form from "@/components/Form"
import PostFeed from "@/components/posts/PostFeed"


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
           <>
                   <Header label="X Page" />
                   <Form placeholder="What's on your mind?" />
                   <PostFeed />
           </>
  )
}
