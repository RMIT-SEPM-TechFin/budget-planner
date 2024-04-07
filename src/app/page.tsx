import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center space-y-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="space-y-2 w-[60%] text-center">
          <h1 className="h1 text-transparent bg-clip-text bg-gradient-to-b from-primary to-foreground">Budget Planner</h1>
          <h3 className="h3 text-muted-foreground">Transform the way you plan your budget, one scenario at a time</h3>
        </div>
        <p className="p text-muted-foreground">
          Welcome to the Budget Planner app! This app is designed to help you
          manage your finances by keeping track of your income and expenses.
        </p>
      </div>
      <div className="relative w-full aspect-[14/9]">
        <Image src={"/banner.jpg"} alt="Banner" fill style={{
            objectFit: 'cover',
          }} />
      </div>

      <div className="flex md:flex-row flex-col justify-between items-center gap-16">
      <div className="relative md:w-1/2 w-full aspect-square">
        <Image src={"/banner.jpg"} alt="Banner" fill style={{
            objectFit: 'cover',
          }} />
      </div>
        <div className="md:w-1/2 w-full text-left">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa exercitationem ab odit accusamus libero esse perferendis velit facilis sint? Fugiat commodi eius temporibus enim itaque vel maxime doloribus, deserunt reprehenderit!
        </div>

      </div>
    </div>
  );
}
