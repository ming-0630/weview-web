import HomePage from "@/components/templates/home/HomePage";
import NavBar from "@/components/layout/nav/NavBar";
import DefaultPageLayout from "@/components/layout/DefaultPagesLayout";

export default function Home() {
  return (
    <DefaultPageLayout>
      <HomePage></HomePage>
    </DefaultPageLayout>
  )
}
