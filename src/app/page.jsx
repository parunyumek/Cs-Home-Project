"use client";
import Banner from "@/components/Banner";
import LayoutLanding from "@/components/LayoutLanding";
import Partner from "@/components/Partner";
import Service from "@/components/Service";

export default function Home() {
  return (
    <LayoutLanding>
      <Banner />
      <Service />
      <Partner />
    </LayoutLanding>
  );
}
