"use client"

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const HomeView = () => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text: "welcome to my world !"}));

  return (
    <div>{data?.greeting}</div>
  )
}

export default HomeView