const clearConsole = () => {
  process.stdout.cursorTo(0, 0);
  process.stdout.clearScreenDown();
};

export { clearConsole };
