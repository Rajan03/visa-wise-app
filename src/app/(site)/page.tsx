import { Alert, AlertDescription, AlertTitle, Button } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello World
      <Button>Click me</Button>
      <Alert variant={"destructive"}>
        <AlertTitle>Title</AlertTitle>

        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    </main>
  );
}
