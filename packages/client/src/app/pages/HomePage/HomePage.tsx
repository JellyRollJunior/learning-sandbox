const HomePage = () => {
  return (
    <>
      <div className="min-h-screen min-w-screen">
        <h1 className="mt-5 text-center text-xl font-bold">
          Welcome to the Learning Sandbox!
        </h1>
        <main className="mx-5 mt-5 grid min-h-25 grid-cols-3 rounded-lg border-2 border-purple-500 px-2 py-3">
          <a
            className="h-fit rounded-sm border-2 border-purple-800 text-center"
            href="/drag-and-drop"
          >
            Drag and Drop
          </a>
        </main>
      </div>
    </>
  );
};

export { HomePage };
