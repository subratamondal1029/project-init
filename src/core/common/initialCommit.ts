import { run } from "@/utils/run.js";

export const initialCommit = async () => {
  await run("git", ["add", "."], { stdio: "pipe" });
  await run("git", ["commit", "-m", "Initial commit", "--no-verify"], { stdio: "pipe" });
};
